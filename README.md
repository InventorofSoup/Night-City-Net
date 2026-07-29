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

Serve the repository root with any static web server. Do not open the HTML files directly from the filesystem because some sites use root-relative paths.

The deployed GitHub Pages base path is `/Night-City-Net/`.
