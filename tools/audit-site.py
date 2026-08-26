from __future__ import annotations

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import shutil
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
BASE = "/Night-City-Net/"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[str] = []
        self.images: list[dict[str, str]] = []
        self.metadata: list[dict[str, str]] = []
        self.links: list[dict[str, str]] = []
        self.ids: list[str] = []
        self.form_depth = 0
        self.buttons_without_type_outside_forms = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        for attribute in ("href", "src", "poster"):
            if values.get(attribute):
                self.references.append(values[attribute])
        if tag == "img":
            self.images.append(values)
        elif tag == "meta":
            self.metadata.append(values)
        elif tag == "link":
            self.links.append(values)
        elif tag == "form":
            self.form_depth += 1
        elif tag == "button" and self.form_depth == 0 and "type" not in values:
            self.buttons_without_type_outside_forms += 1
        if values.get("id"):
            self.ids.append(values["id"])

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag: str) -> None:
        if tag == "form":
            self.form_depth = max(0, self.form_depth - 1)


def local_target(page: Path, reference: str) -> Path | None:
    reference = reference.strip()
    if not reference or reference.startswith(("#", "data:", "mailto:", "tel:", "javascript:")):
        return None
    parsed = urlsplit(reference)
    if parsed.scheme or reference.startswith("//"):
        return None
    path = unquote(parsed.path)
    if not path:
        return None
    if path.startswith(BASE):
        return ROOT / path[len(BASE):]
    if path == BASE.rstrip("/"):
        return ROOT
    if path.startswith("/"):
        return ROOT / path.lstrip("/")
    return (page.parent / path).resolve()


def check_pages(errors: list[str]) -> tuple[int, int]:
    pages = list(ROOT.rglob("*.html"))
    references = 0
    for page in pages:
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8", errors="ignore"))
        relative = page.relative_to(ROOT)
        names = {item.get("name", "").lower() for item in parser.metadata}
        properties = {item.get("property", "").lower() for item in parser.metadata}
        if "description" not in names:
            errors.append(f"{relative}: missing meta description")
        for required in ("twitter:card", "twitter:title", "twitter:description"):
            if required not in names:
                errors.append(f"{relative}: missing {required} metadata")
        for required in ("og:type", "og:title", "og:description"):
            if required not in properties:
                errors.append(f"{relative}: missing {required} metadata")
        canonical = [item.get("href", "") for item in parser.links if item.get("rel", "").lower() == "canonical"]
        if len(canonical) != 1:
            errors.append(f"{relative}: expected one canonical link, found {len(canonical)}")
        elif not canonical[0].startswith("https://inventorofsoup.github.io/Night-City-Net/"):
            errors.append(f"{relative}: canonical link is outside the published site: {canonical[0]}")
        social_images = [
            item.get("content", "")
            for item in parser.metadata
            if item.get("property", "").lower() == "og:image" or item.get("name", "").lower() == "twitter:image"
        ]
        for image_url in social_images:
            if image_url.startswith("https://inventorofsoup.github.io/Night-City-Net/"):
                image_path = ROOT / unquote(image_url.removeprefix("https://inventorofsoup.github.io/Night-City-Net/"))
                if not image_path.exists():
                    errors.append(f"{relative}: social image does not exist locally: {image_url}")
        duplicates = [name for name, count in Counter(parser.ids).items() if count > 1]
        if duplicates:
            errors.append(f"{relative}: duplicate ids: {', '.join(duplicates)}")
        if parser.buttons_without_type_outside_forms:
            errors.append(f"{relative}: {parser.buttons_without_type_outside_forms} buttons outside forms lack a type")
        if "shared/network-tools.js" not in page.read_text(encoding="utf-8", errors="ignore"):
            errors.append(f"{relative}: shared terminal tools are not loaded")
        for image in parser.images:
            if not image.get("alt", "").strip():
                errors.append(f"{relative}: image lacks alternative text: {image.get('src', '[unknown]')}")
            if not image.get("width") or not image.get("height"):
                errors.append(f"{relative}: image lacks dimensions: {image.get('src', '[unknown]')}")
        for reference in parser.references:
            target = local_target(page, reference)
            if target is None:
                continue
            references += 1
            if not target.exists():
                errors.append(f"{relative}: missing local reference: {reference}")
    return len(pages), references


def check_css_references(errors: list[str]) -> int:
    references = 0
    pattern = re.compile(r"url\(\s*(['\"]?)([^)'\"]+)\1\s*\)", re.IGNORECASE)
    for stylesheet in ROOT.rglob("*.css"):
        text = stylesheet.read_text(encoding="utf-8", errors="ignore")
        for _, reference in pattern.findall(text):
            target = local_target(stylesheet, reference)
            if target is None:
                continue
            references += 1
            if not target.exists():
                errors.append(f"{stylesheet.relative_to(ROOT)}: missing local CSS reference: {reference}")
    return references


def check_webp(errors: list[str]) -> int:
    images = list(ROOT.rglob("*.webp"))
    for image in images:
        header = image.read_bytes()[:12]
        if len(header) < 12 or header[:4] != b"RIFF" or header[8:12] != b"WEBP":
            errors.append(f"{image.relative_to(ROOT)}: invalid WebP header")
    return len(images)


def check_dynamic_image_names(errors: list[str]) -> None:
    available = {path.name for path in ROOT.rglob("*.webp")}
    pattern = re.compile(r"([A-Za-z0-9_.-]+\.webp)")
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in {".html", ".css", ".js", ".md"}:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for name in pattern.findall(text):
            if name not in available:
                errors.append(f"{path.relative_to(ROOT)}: referenced WebP filename does not exist: {name}")


def check_javascript(errors: list[str]) -> int:
    files = list(ROOT.rglob("*.js"))
    node = shutil.which("node")
    if not node:
        errors.append("Node.js is unavailable; JavaScript syntax could not be checked")
        return len(files)
    for path in files:
        result = subprocess.run([node, "--check", str(path)], capture_output=True, text=True)
        if result.returncode:
            errors.append(f"{path.relative_to(ROOT)}: JavaScript syntax failure: {result.stderr.strip()}")
    return len(files)


def check_offline_cache(errors: list[str]) -> None:
    worker = ROOT / "service-worker.js"
    if not worker.exists():
        errors.append("service-worker.js is missing")
        return
    text = worker.read_text(encoding="utf-8", errors="ignore")
    core_match = re.search(r"const\s+CORE\s*=\s*\[([\s\S]*?)\];", text)
    if not core_match:
        errors.append("service-worker.js: CORE file list could not be read")
    else:
        for entry in re.findall(r'ROOT\s*\+\s*["\']([^"\']+)["\']', core_match.group(1)):
            if not (ROOT / entry).exists():
                errors.append(f"service-worker.js: missing CORE file: {entry}")
    if 'request.headers.has("range")' not in text:
        errors.append("service-worker.js: byte-range requests are not bypassed")
    if "cache.addAll(" in text:
        errors.append("service-worker.js: CORE install is still all-or-nothing")
    if "caches.match(request)" not in text:
        errors.append("service-worker.js: static assets do not use exact-request cache matching")

    controls = ROOT / "shared" / "network-tools.js"
    controls_text = controls.read_text(encoding="utf-8", errors="ignore") if controls.exists() else ""
    for fragment, message in (
        ('status.setAttribute("role", "status")', "cache status is not exposed to assistive technology"),
        ('dialog.setAttribute("aria-labelledby"', "reset dialog has no accessible name"),
        ('dialog.addEventListener("close"', "reset dialog does not restore focus"),
        ('Regional cache: unavailable', "cache registration failure has no visible state"),
    ):
        if fragment not in controls_text:
            errors.append(f"shared/network-tools.js: {message}")


def check_discovery_files(errors: list[str]) -> None:
    sitemap = ROOT / "sitemap.xml"
    robots = ROOT / "robots.txt"
    if not sitemap.exists():
        errors.append("sitemap.xml is missing")
    else:
        sitemap_text = sitemap.read_text(encoding="utf-8", errors="ignore")
        if "<urlset" not in sitemap_text:
            errors.append("sitemap.xml does not contain a URL set")
        listed = set(re.findall(r"<loc>(.*?)</loc>", sitemap_text))
        expected: set[str] = set()
        for page in ROOT.rglob("*.html"):
            relative = page.relative_to(ROOT)
            content = page.read_text(encoding="utf-8", errors="ignore")
            title = re.search(r"<title>([\s\S]*?)</title>", content, re.IGNORECASE)
            hidden = re.search(r'<meta\b[^>]*\bname=["\']robots["\'][^>]*\bcontent=["\'][^"\']*noindex', content, re.IGNORECASE)
            if relative.as_posix() == "404.html" or hidden or (title and re.match(r"\s*404\s*\|", title.group(1), re.IGNORECASE)):
                continue
            canonical = re.search(r'<link\b[^>]*\brel=["\']canonical["\'][^>]*\bhref=["\']([^"\']+)', content, re.IGNORECASE)
            if canonical:
                expected.add(canonical.group(1))
        if listed != expected:
            missing = sorted(expected - listed)
            stale = sorted(listed - expected)
            if missing:
                errors.append("sitemap.xml is missing published pages: " + ", ".join(missing))
            if stale:
                errors.append("sitemap.xml contains stale pages: " + ", ".join(stale))
    if not robots.exists():
        errors.append("robots.txt is missing")
    elif "Sitemap: https://inventorofsoup.github.io/Night-City-Net/sitemap.xml" not in robots.read_text(encoding="utf-8", errors="ignore"):
        errors.append("robots.txt does not identify the published sitemap")


def check_campaign_tools(errors: list[str]) -> None:
    control = ROOT / "gm-control" / "index.html"
    if not control.exists():
        errors.append("gm-control/index.html is missing")
    else:
        text = control.read_text(encoding="utf-8", errors="ignore")
        if "noindex,nofollow" not in text:
            errors.append("gm-control/index.html must remain excluded from search indexing")
        if "shared/campaign-state.js" not in text:
            errors.append("gm-control/index.html does not load the campaign-state layer")
    for folder in ("rent-a-samurai", "danger-gal", "feedfrenzy", "nc-civicnet", "trauma-team", "militech-security"):
        page = ROOT / folder / "index.html"
        text = page.read_text(encoding="utf-8", errors="ignore")
        if "shared/campaign-state.js" not in text or "shared/site-expansions.js" not in text:
            errors.append(f"{folder}/index.html: site-specific campaign tools are not loaded")
    expansion = ROOT / "shared" / "site-expansions.js"
    if expansion.exists():
        text = expansion.read_text(encoding="utf-8", errors="ignore")
        if 'new URL(".", document.currentScript.src)' not in text:
            errors.append("shared/site-expansions.js: dynamic assets are not resolved from the shared directory")
        for asset in ("site-expansions.css", "site-expansions-compat.css"):
            if not (ROOT / "shared" / asset).exists() or f'new URL("{asset}' not in text:
                errors.append(f"shared/site-expansions.js: dynamic stylesheet is missing or not loaded: {asset}")
        for expected in ("nc-burner-form", "nc-case-form", "nc-vote-status", "nc-property-form", "nc-member-form", "Threat Briefings"):
            if expected not in text:
                errors.append(f"shared/site-expansions.js: expected feature is missing: {expected}")
    else:
        errors.append("shared/site-expansions.js is missing")


def main() -> int:
    errors: list[str] = []
    pages, references = check_pages(errors)
    references += check_css_references(errors)
    webp = check_webp(errors)
    check_dynamic_image_names(errors)
    javascript = check_javascript(errors)
    check_offline_cache(errors)
    check_discovery_files(errors)
    check_campaign_tools(errors)
    tracked_png = subprocess.run(
        ["git", "ls-files", "*.png"], cwd=ROOT, capture_output=True, text=True, check=False
    ).stdout.splitlines()
    if tracked_png:
        errors.append("Tracked PNG assets remain: " + ", ".join(tracked_png))

    print(f"Audited {pages} pages, {references} local references, {webp} WebP files, and {javascript} JavaScript files.")
    if errors:
        print(f"FAILED with {len(errors)} issue(s):")
        for error in errors:
            print(" - " + error)
        return 1
    print("PASS: no structural, media, metadata, or JavaScript errors found.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
