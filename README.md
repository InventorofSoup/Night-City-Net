# Night City Net

Night City Net is a static, in-world web directory for a Cyberpunk RED campaign. Each major folder is a separate fictional website, while the root pages connect them through the directory, sitemap, and webring.

## Add a website to the network

1. Create the site's folder and add its `index.html`, styles, scripts, and media.
2. Open `shared/site-directory.js`.
3. Add one record to the `sites` list with:
   - a unique `id`
   - the displayed `name`
   - the folder address in `href`
   - `status: "live"` or `status: "coming-soon"`
   - a short directory `description`
   - optional webring text
   - the site's important pages
4. Open the root homepage, sitemap, and webring to confirm the new entry appears.

The homepage, sitemap, webring membership list, live-site counts, and random/previous/next webring navigation all read from this one list.

## Local preview

Do not open the HTML files directly from the filesystem. Several sites use the deployed GitHub Pages base path `/Night-City-Net/`, so a local preview must expose this repository at that same path. Serving the repository only at `/` will leave some Militech and Network 54 assets unresolved.

The production address is `https://inventorofsoup.github.io/Night-City-Net/`.

## Shared terminal controls

Every published page loads `shared/network-tools.js`. It adds a non-overlay utility strip after the page content with a route back to the Night City Net directory and a two-step local reset. The reset clears browser-only campaign state and locally stored pages across the entire Night City Net domain; it never changes repository or public-site data. The regional cache begins rebuilding as pages are revisited.

The same script registers `service-worker.js`. The service worker stores the directory shell and caches other same-origin pages and assets as they are visited. Previously stored assets are shown immediately while a fresh copy is retrieved in the background. Audio byte-range requests bypass the cache so media playback remains reliable. The service worker does not force the entire media library to download during a first visit.

When the service worker or its core file list changes, update the cache name near the top of `service-worker.js` so returning browsers discard the previous cache. The pre-publish audit verifies the core file list and required cache safeguards.

## Pre-publish audit

Run `node tools/update-site-metadata.mjs` after adding or renaming pages, then run `python tools/audit-site.py` before publishing. The metadata tool maintains canonical addresses, social-sharing fields, `sitemap.xml`, and `robots.txt`. The audit checks every HTML route and local asset, metadata, image accessibility and dimensions, duplicate IDs, WebP headers, shared terminal controls, offline-cache safeguards, discovery files, tracked PNG files, and JavaScript syntax.

The same audit runs automatically on pull requests and changes to `main` through `.github/workflows/site-audit.yml`.

## Game Master campaign desk

`gm-control/` is an unlisted, search-excluded local control desk. It publishes campaign date, time, conditions, a regional event, district statuses, outlet-specific headlines, one Rent-A-Samurai contract, and one sanitized Danger Gal matter through browser storage. It does not disable routes, create real authentication, or transmit information.

The six expanded player sites load `shared/campaign-state.js` and `shared/site-expansions.js`. Network 54 loads the smaller regional headline insert. Campaign state can be exported and imported as JSON for use on another browser. Run `node tools/audit-campaign-state.mjs` to verify default state, nested updates, browser events, import/export, and reset behavior.

## Lore notes

`.github/LORE-SOURCE-REGISTER.md` is the internal production record for canon anchors, source-informed adaptations, and original campaign material. It is kept outside the player-facing site.
