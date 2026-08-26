# Webring Microsites - Safe Stopping Point

Last updated: 2026-08-26

## Repository state

- Repository: `publish-night-city-net`
- Working branch: `agent/webring-microsites`
- Branch started from: `642d6f4 Merge pull request #26 from InventorofSoup/agent/trauma-team-audio`
- Nothing from this microsite pass has been committed or pushed.
- The current edits are intentionally left together for review.

## Completed in this pass

### Granny Ed's Garden & Gaming Corner

Location: `granny-ed/`

- Reframed entirely around gardening inside Elflines Online. It does not suggest that Ed grows real crops in Night City.
- Expanded the virtual garden from three plants to six.
- Added the weekly plot diary, virtual seed-request response, kill-cam cupboard, raid recipe, guestbook, and pinned guestbook notes.
- Restyled it as an aging handmade personal homepage/scrapbook.
- Fixed the desktop grid so the guestbook remains in the main content column after adding the garden diary.
- Fixed the scrolling welcome message so it repeats instead of leaving a long blank area.
- Confirmed every required ID and anchor exists, all three tape controls are wired, JavaScript parses, local links resolve, and the page returns HTTP 200.

Preview: `http://127.0.0.1:4317/granny-ed/`

### Bur's Razorfire Survival Log

Location: `burs-razorfire-log/`

- Clarified that this is an abandoned Elflines Online community Ironman challenge, not a real-world survival journal.
- Added challenge rules, recovered player replies, an interactive cached route, inventory state, field-unit ping, and failed Day 2 recovery.
- Restyled it as a damaged Razorfire field-client cache with ember-colored cavern telemetry.
- Confirmed JavaScript parses, local links resolve, and the page returns HTTP 200.

Preview: `http://127.0.0.1:4317/burs-razorfire-log/`

### Southside Fixer Switchboard

Location: `southside-fixer-directory/`

- Replaced the clean directory/newspaper appearance with a stolen underground rolodex and public relay switchboard.
- Expanded the directory from six to ten fixer records.
- Retained search, district, and service filtering.
- Added random referral selection, risk indicators, contact reveal, and dead-end relay messaging.
- Confirmed JavaScript parses, local links resolve, and the page returns HTTP 200.

Preview: `http://127.0.0.1:4317/southside-fixer-directory/`

### The Last Stop Grill

Location: `last-stop-grill/`

- Replaced Wormwood's guild-recruitment microsite in the webring.
- Built a rundown classic-diner homepage under the old Watson rail line.
- Menu uses a lore-appropriate mix of Kibble and Generic Prepak rather than fresh food.
- Includes eight original pictured meals, four sides/drinks, food-tier labels, ordering cart, removal controls, pickup name, delivery surcharge, and a deliberately unsuccessful payment/order handoff.
- Restyled from a polished editorial design into a poorly maintained diner website with checkerboard trim, mismatched sign typography, aging menu cards, repair notices, and old-web details.
- Confirmed JavaScript parses, all local image/link references resolve, and the page returns HTTP 200.

Preview: `http://127.0.0.1:4317/last-stop-grill/`

## Shared webring changes

- `shared/site-directory.js` now lists all four microsites as live.
- Granny Ed's directory description now explicitly says virtual/Elflands gardening.
- Wormwood's recruitment entry was replaced by The Last Stop Grill.
- `webring.html` fallback totals were updated to 18 members and 13 live members.
- The old untracked `wormwood-recruitment/` directory was removed.
- Daeric Sylar's ELO Fansite and Watson Nightlife Guide now link to purpose-built custom 404 experiences while remaining counted as offline members.

## Custom 404 pages completed

### Daeric Sylar's ELO Fansite

Location: `daeric-sylar-fansite/`

- Opens on an expired-domain resolver notice.
- A working recovery control reveals Daeric's cached, deliberately terrible old ELO fan page.
- Includes broken screenshot records, an obsolete Bowmaster build rating, a dead guestbook, and a route back to the webring.

Preview: `http://127.0.0.1:4317/daeric-sylar-fansite/`

### Watson Nightlife Guide

Location: `watson-nightlife-guide/`

- Reduced to a sparse dead-end 404 rather than a second story-heavy microsite.
- Shows only a faint remnant of the old branding, a brief unavailable notice, the last successful sync date, and one route back to the webring.

Preview: `http://127.0.0.1:4317/watson-nightlife-guide/`

## Validation completed

- All four microsites return HTTP 200 from the local preview server.
- All JavaScript files pass syntax checks.
- All referenced local files and navigation targets resolve.
- Generated diner images were inspected individually before use.
- CSS brace counts match in each newly added theme stylesheet.

## Important limitation

The in-app browser-control connection was unavailable during the final Granny Ed review. The code, responsive rules, links, and control wiring were audited, but a full screenshot-based desktop/mobile visual pass still needs to be done when browser control is available or by manual review in the preview.

## Work remaining when this resumes

1. Perform a visual QA pass at approximately 1440px, 1024px, 768px, and a narrow phone width for all four microsites.
2. Click-test every control on Bur's log and the Fixer Switchboard in an actual browser. Granny Ed and Last Stop have been exhaustively code-audited, but should still receive the same browser pass.
3. Review the three redesigned sites with the user and make any requested visual adjustments.
4. Review both custom 404 experiences with the user and make any requested visual adjustments.
5. The sitemap is intentionally limited to live sites; the two custom 404s remain accessible only through their offline webring entries. README instructions remain accurate and require no change.
6. Only after approval: stage the intended files, commit on `agent/webring-microsites`, push the branch, and use the existing GitHub merge workflow.

## Files that must not be staged

These are older local screenshots and are unrelated to this microsite pass:

- `preview-n54-100-percent.png`
- `preview-n54-cached-fix-footer.png`
- `preview-n54-cached-fix-top.png`

## Expected files for the eventual commit

- `shared/site-directory.js`
- `webring.html`
- `granny-ed/`
- `burs-razorfire-log/`
- `southside-fixer-directory/`
- `last-stop-grill/`
- `daeric-sylar-fansite/`
- `watson-nightlife-guide/`
- `WEBRING-MICROSITES-HANDOFF.md`

Before committing, inspect the working tree again and stage only this explicit set.
