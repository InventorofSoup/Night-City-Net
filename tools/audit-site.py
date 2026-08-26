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
        if "description" not in names:
            errors.append(f"{relative}: missing meta description")
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


def main() -> int:
    errors: list[str] = []
    pages, references = check_pages(errors)
    references += check_css_references(errors)
    webp = check_webp(errors)
    check_dynamic_image_names(errors)
    javascript = check_javascript(errors)
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
