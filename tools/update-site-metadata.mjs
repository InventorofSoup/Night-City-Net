import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_ROOT = "https://inventorofsoup.github.io/Night-City-Net/";
const SKIP_DIRECTORIES = new Set([".git"]);
const TITLE_OVERRIDES = new Map([
  ["nc-civicnet/district.html", "District Information | NC CivicNet"],
  ["nc-civicnet/emergency.html", "Emergency Notices | NC CivicNet"]
]);
const SITE_IMAGES = new Map([
  ["danger-gal", "danger-gal/media/danger-gal-logo.webp"],
  ["elflines-online", "elflines-online/media/locations/01_Elfhold.webp"],
  ["feedfrenzy", "feedfrenzy/media/delivery-van-panic.webp"],
  ["last-stop-grill", "last-stop-grill/assets/prepak-smash-melt.webp"],
  ["militech-security", "militech-security/militech-campus-hero.jpg"],
  ["trauma-team", "trauma-team/media/trauma-flight.webp"]
]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && SKIP_DIRECTORIES.has(entry.name)) return [];
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(target);
    return entry.name.toLowerCase().endsWith(".html") ? [target] : [];
  });
}

function attributeEscape(value) {
  return value.replace(/&(?!(?:[a-z]+|#\d+|#x[\da-f]+);)/gi, "&amp;").replace(/"/g, "&quot;");
}

function relativeName(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

function canonicalFor(relative) {
  if (relative === "index.html") return PUBLIC_ROOT;
  if (relative.endsWith("/index.html")) return PUBLIC_ROOT + relative.slice(0, -"index.html".length);
  return PUBLIC_ROOT + relative;
}

function extract(content, expression) {
  return expression.exec(content)?.[1]?.trim() || "";
}

function metaContent(content, name) {
  for (const match of content.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const named = /\bname\s*=\s*(["'])(.*?)\1/i.exec(tag);
    if (!named || named[2].toLowerCase() !== name.toLowerCase()) continue;
    const value = /\bcontent\s*=\s*(["'])([\s\S]*?)\1/i.exec(tag);
    if (value) return value[2].trim();
  }
  return "";
}

function removeManagedMetadata(content) {
  return content
    .replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<meta\b[^>]*\bproperty=["']og:(?:type|title|description|image)["'][^>]*>\s*/gi, "")
    .replace(/<meta\b[^>]*\bname=["']twitter:(?:card|title|description|image)["'][^>]*>\s*/gi, "");
}

function ensureTitle(content, relative) {
  const current = extract(content, /<title>([\s\S]*?)<\/title>/i);
  if (current) return { content, title: current };
  const title = TITLE_OVERRIDES.get(relative) || "Night City Net";
  if (/<title>[\s\S]*?<\/title>/i.test(content)) {
    return { content: content.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`), title };
  }
  return { content: content.replace(/<\/head>/i, `<title>${title}</title>\n</head>`), title };
}

function metadataBlock(relative, title, description, content) {
  const canonical = canonicalFor(relative);
  const lines = [];
  if (!/<link\b[^>]*\brel=["']canonical["']/i.test(content)) {
    lines.push(`<link rel="canonical" href="${canonical}">`);
  }
  if (!/<meta\b[^>]*\bproperty=["']og:type["']/i.test(content)) {
    lines.push('<meta property="og:type" content="website">');
  }
  if (!/<meta\b[^>]*\bproperty=["']og:title["']/i.test(content)) {
    lines.push(`<meta property="og:title" content="${attributeEscape(title)}">`);
  }
  if (!/<meta\b[^>]*\bproperty=["']og:description["']/i.test(content)) {
    lines.push(`<meta property="og:description" content="${attributeEscape(description)}">`);
  }

  const site = relative.split("/")[0];
  const image = SITE_IMAGES.get(site);
  if (image && !/<meta\b[^>]*\bproperty=["']og:image["']/i.test(content)) {
    lines.push(`<meta property="og:image" content="${PUBLIC_ROOT + image}">`);
  }
  if (!/<meta\b[^>]*\bname=["']twitter:card["']/i.test(content)) {
    lines.push(`<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">`);
  }
  if (!/<meta\b[^>]*\bname=["']twitter:title["']/i.test(content)) {
    lines.push(`<meta name="twitter:title" content="${attributeEscape(title)}">`);
  }
  if (!/<meta\b[^>]*\bname=["']twitter:description["']/i.test(content)) {
    lines.push(`<meta name="twitter:description" content="${attributeEscape(description)}">`);
  }
  if (image && !/<meta\b[^>]*\bname=["']twitter:image["']/i.test(content)) {
    lines.push(`<meta name="twitter:image" content="${PUBLIC_ROOT + image}">`);
  }
  return lines.join("\n");
}

const pages = walk(ROOT).sort();
const sitemapEntries = [];

for (const file of pages) {
  const relative = relativeName(file);
  let content = fs.readFileSync(file, "utf8");
  const titled = ensureTitle(content, relative);
  content = titled.content;
  const title = titled.title;
  const description = metaContent(content, "description") || "An indexed destination on the Night City Net regional network.";
  if (!relative.startsWith("network-54/")) content = removeManagedMetadata(content);
  const block = metadataBlock(relative, title, description, content);
  if (block) content = content.replace(/<\/head>/i, `${block}\n</head>`);
  fs.writeFileSync(file, content, "utf8");

  const hiddenFromSearch = /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(content);
  if (relative !== "404.html" && !/^404\s*\|/i.test(title) && !hiddenFromSearch) {
    sitemapEntries.push(canonicalFor(relative));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((url) => `  <url><loc>${url.replace(/&/g, "&amp;")}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml, "utf8");
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${PUBLIC_ROOT}sitemap.xml\n`, "utf8");

console.log(`Updated metadata for ${pages.length} pages and wrote ${sitemapEntries.length} sitemap entries.`);
