(function () {
  "use strict";

  const loader = document.currentScript;
  const root = loader && loader.src ? new URL("../", loader.src) : new URL("../", location.href);
  const knownSites = [
    "trauma-team",
    "elflines-online",
    "nc-civicnet",
    "militech-security",
    "network-54",
    "feedfrenzy",
    "danger-gal",
    "rent-a-samurai",
  ];

  function rootUrl(path) {
    return new URL(path, root).href;
  }

  function currentSite() {
    const site = knownSites.find(function (candidate) {
      return location.pathname.toLowerCase().includes("/" + candidate + "/");
    });
    if (!site) {
      return null;
    }
    const suffix = location.pathname.toLowerCase().split("/" + site + "/")[1] || "";
    if (site === "militech-security" && (suffix === "information/public-intelligence/" || suffix === "information/public-intelligence/index.html")) {
      return site;
    }
    return suffix === "" || suffix === "index.html" ? site : null;
  }

  const coverage = {
    "network-54": {
      eyebrow: "Network 54 City Desk // New this cycle",
      title: "The city after the guest list closes.",
      intro: "The unofficial market everyone wants to enter, the reclaimed style suddenly appearing uptown, and the people already claiming they discovered both.",
      status: "Editorial status: verified where indicated. Sponsor placements separated from reporting.",
      media: {
        src: "shared-media/night-market.jpg",
        alt: "A lively rotating market inside a concrete parking structure",
        caption: "Tonight's location // invitation expired",
        credit: "54 Nightlife approved image",
      },
      stories: [
        {
          meta: "Nightlife // City culture",
          title: "The parking-deck market that refuses a permanent address",
          summary: "A rotating group of repair stalls, food carts, and independent designers has turned an unfinished parking level into this week's most discussed late-night stop.",
          paragraphs: [
            "Organizers publish the location only a few hours before opening and ask visitors to arrive by transit. Vendors say the shifting venue keeps costs low and prevents any one neighborhood from carrying the traffic every weekend.",
            "The best tables combine practical repair with presentation: rebuilt music players, tailored jackets made from retired workwear, and tabletop accessories cut from harmless industrial scrap. Several uptown boutiques have already requested private appointments.",
          ],
          files: [{ label: "View temporary market card", href: "downloads/night-market-vendor-card.pdf" }],
        },
        {
          meta: "Style // Reclaimed",
          title: "Repair marks are this season's most expensive detail",
          summary: "Visible stitching, replaced panels, and polished tool scoring have moved from neighborhood necessity to limited-run luxury.",
          paragraphs: [
            "Designers are purchasing repaired originals, cataloging each modification, and reproducing the visual language with materials that have never seen actual use. Buyers receive a provenance card explaining which marks are authentic and which were added in studio.",
            "Market vendors have responded by raising prices, refusing bulk buyers, and labeling fresh damage as not yet collectible. One repair collective says the attention is welcome as long as customers remember that functional work comes before fashionable distress.",
          ],
          files: [],
        },
      ],
      related: [
        ["Nightlife", "network-54/nightlife/"],
        ["Style", "network-54/style/"],
        ["Business", "network-54/business/"],
      ],
    },
    feedfrenzy: {
      eyebrow: "Fresh receipts // We actually left the office",
      title: "The mist stayed. The explanation changed.",
      intro: "A city crew finally opened the sidewalk after four vanished service reports, while a night market escaped inspection by completing basic cleanup.",
      status: "Evidence quality: one staff clip, nineteen reader submissions, two useful documents, many opinions.",
      media: {
        src: "shared-media/utility-corridor-loop.webp",
        alt: "Looping field footage of workers repairing a steaming utility corridor",
        caption: "Original field loop // 23:14",
        credit: "Audio removed: mostly shouting",
      },
      stories: [
        {
          meta: "Street panic // Useful for once",
          title: "Yellow-mist sidewalk opened; mystery becomes maintenance",
          summary: "Crews found an aging pressure assembly under the exact block CivicNet briefly insisted was two streets away. The vapor was irritating, photogenic, and apparently not a conspiracy.",
          paragraphs: [
            "Our contributor counted three contractor vehicles, one municipal observer, and a person in an expensive coat who spent twenty minutes asking not to be filmed. Nobody would explain why earlier reports disappeared, although a technician blamed a district-code migration and then asked us not to quote the phrase district-code migration.",
            "Air readings returned to the published baseline after the line was isolated. This does not answer why nearby Agents lost signal during the first leak, but it does mean the loudest explanation is currently a corroded machine under a bad sidewalk.",
          ],
          files: [
            { label: "Download our source notes", href: "downloads/feedfrenzy-utility-source-notes.txt" },
            { label: "Read the boring official PDF", href: "downloads/nc-civicnet-utility-advisory.pdf" },
          ],
        },
        {
          meta: "Community // Permit pending forever",
          title: "Night market vanishes, leaves garage cleaner than management",
          summary: "The unlicensed parking-deck market packed forty-two stalls into a dead level, served dinner, repaired six household appliances, and disappeared before an inspector arrived.",
          paragraphs: [
            "A volunteer handed us a bag for our trash and refused to identify the organizer. Vendors rotated between food, clothing, reclaimed electronics, tabletop games, and services described only as ask quietly. Prices ranged from reasonable to insulting.",
            "Property management denied authorizing the event but confirmed the level suffered no damage. A new inspection notice appeared after sunrise on a column that had been missing its fire extinguisher since 2042.",
          ],
          files: [{ label: "Vendor safety card", href: "downloads/night-market-vendor-card.pdf" }],
        },
      ],
      related: [
        ["What CivicNet admits", "nc-civicnet/#city-pulse"],
        ["54's polite version", "network-54/#city-pulse"],
        ["Check fake inspectors", "danger-gal/#city-pulse"],
      ],
    },
    "danger-gal": {
      eyebrow: "Disclosure register // Public safety release",
      title: "Credential impersonation: verification guidance.",
      intro: "Danger Gal has received consistent reports of individuals using authentic-looking maintenance notices and building inspections to request residential access.",
      status: "Public release DG-45-0730. Identifying witness and client information withheld.",
      media: {
        src: "shared-media/credential-impersonation.jpg",
        alt: "Security-camera view of a supposed auditor presenting a scanner at a partly open apartment door",
        caption: "Recreated recognition image",
        credit: "Faces obscured // No allegation attached",
      },
      stories: [
        {
          meta: "Safety bulletin // Watson + Little Europe",
          title: "A badge is not independent verification",
          summary: "Impersonators are presenting plausible contractor credentials, naming real infrastructure problems, and requesting access to inspect interior meters or network panels.",
          paragraphs: [
            "The most reliable indicator is pressure to verify through a channel supplied by the visitor. Close the door, locate the provider's public contact independently, and ask the dispatcher to confirm both the worker and the service order.",
            "Do not surrender an Agent, credential token, access fob, or building directory. Legitimate workers may leave when denied entry; departure alone does not establish criminal intent. Preserve camera footage and record the claimed organization and work-order number.",
          ],
          files: [{ label: "Download verification checklist", href: "downloads/danger-gal-credential-checklist.pdf" }],
        },
        {
          meta: "Information request // Limited",
          title: "Seeking records of duplicated service orders",
          summary: "Residents and property managers may submit copies of inspection notices bearing work-order prefixes VR-7, MT-22, or unscannable square credential marks.",
          paragraphs: [
            "Danger Gal is comparing document format, timing, and claimed provider information. Submission does not establish representation, create a client relationship, or guarantee individual follow-up.",
            "Remove access codes, signatures, financial information, and private resident lists before using the public evidence drop. Retain an unmodified original offline in case an investigator requests it through a verified channel.",
          ],
          files: [{ label: "Open evidence drop", href: "danger-gal/#submit" }],
        },
      ],
      related: [
        ["Start a matter", "danger-gal/#services"],
        ["Released files", "danger-gal/#releases"],
        ["Evidence drop", "danger-gal/#submit"],
      ],
    },
    "rent-a-samurai": {
      eyebrow: "Rook's board // Street file 09",
      title: "Good work starts with a client who can answer questions.",
      intro: "Two ordinary listings, one safety update, and no promise that ordinary work stays ordinary.",
      status: "Board note: these are public briefs. Exact addresses and access details belong in sealed contact.",
      media: {
        src: "shared-media/night-market.jpg",
        alt: "Improvised community night market operating inside a concrete parking structure",
        caption: "Rotating market // location expired",
        credit: "Organizer-approved wide shot",
      },
      stories: [
        {
          meta: "Contract watch // Technical + protection",
          title: "Independent vendors need an opening-night safety crew",
          summary: "A rotating market cooperative wants two operators to inspect exits, identify counterfeit utility credentials, and keep a repair corridor clear without intimidating customers.",
          paragraphs: [
            "The client provides a site plan only after verification and refuses applicants representing property management, collection services, or neighborhood political groups. The work is defensive and public-facing; visible long arms are prohibited unless an active threat is confirmed.",
            "Base offer is 1,200eb for a six-hour window, split by the crew. A Tech or Scout is preferred. The cooperative will provide meal tokens, parking validation of questionable value, and a cleanup share.",
          ],
          files: [{ label: "Open contracting safety card", href: "downloads/rook-contract-safety-card.pdf" }],
        },
        {
          meta: "After-action note // Courier recovery",
          title: "Missing handoff resolved at the wrong noodle stand",
          summary: "A courier, client, and receiving crew each used a different landmark for the same crowded block. The package never left the courier's possession.",
          paragraphs: [
            "A Scout traced the courier's last confirmed route while a Face kept the client from turning a late delivery into an accusation. The courier had been waiting under a red sign; the client meant the red awning one block east.",
            "Rook's note: establish a unique contact phrase and a location that exists in daylight. The crew accepted the four-hour minimum, returned the sealed case, and declined the client's request to describe the outcome as a tactical recovery.",
          ],
          files: [{ label: "Open contracting safety card", href: "downloads/rook-contract-safety-card.pdf" }],
        },
      ],
      related: [
        ["Browse open contracts", "rent-a-samurai/#jobs"],
        ["Find a runner", "rent-a-samurai/#runners"],
        ["Build a crew", "rent-a-samurai/#crew"],
      ],
    },
    "nc-civicnet": {
      eyebrow: "Municipal archive // Recently published",
      title: "Service notices and public records.",
      intro: "The following records are provided for informational use. Publication does not guarantee continuing accuracy, contractor availability, or district enforcement.",
      status: "Archive sync: partial. Three departmental systems did not respond before publication.",
      media: {
        src: "shared-media/utility-corridor.jpg",
        alt: "Municipal contractors working behind barriers at a steaming utility vault",
        caption: "South Loop temporary work area",
        credit: "Contractor documentation image",
      },
      stories: [
        {
          meta: "Infrastructure // Advisory 45-0730-UC",
          title: "Temporary pedestrian diversion at South Loop service corridor",
          summary: "A pressure-control component was isolated after visible vapor and intermittent local signal disruption were reported. No evacuation order is active.",
          paragraphs: [
            "The east sidewalk remains closed between the marked crossings. Residents should not enter the barrier area, interfere with monitoring equipment, or request individual readings from repair personnel.",
            "Initial notices displaying a neighboring district code were produced during an archive migration. Those notices have been superseded. Retention of outdated copies is not prohibited, but they should not be used for current routing decisions.",
          ],
          files: [{ label: "Download complete advisory", href: "downloads/nc-civicnet-utility-advisory.pdf" }],
        },
        {
          meta: "Commerce // Temporary-use reminder",
          title: "Unscheduled market activity in structured parking facilities",
          summary: "Property operators are reminded that temporary sales activity may require fire-lane access, sanitation service, and written authorization even when no admission is charged.",
          paragraphs: [
            "The city has received reports of rotating markets leaving host facilities before scheduled inspection. Vendors may request the temporary-use checklist without identifying a future event location.",
            "Submitting a checklist does not create a permit, reserve an inspection time, or prevent a property owner from imposing separate conditions. Enforcement priority varies by district and immediate life-safety risk.",
          ],
          files: [{ label: "Download vendor safety card", href: "downloads/night-market-vendor-card.pdf" }],
        },
      ],
      related: [
        ["Public health", "nc-civicnet/health.html"],
        ["Transit status", "nc-civicnet/transit.html"],
        ["Report a problem", "nc-civicnet/report.html"],
      ],
    },
    "trauma-team": {
      eyebrow: "Member operations // Readiness cycle",
      title: "Five minutes now can protect a future response.",
      intro: "Trauma Team is asking regional members to review identity, medical, access, and emergency-contact information before the next quarterly readiness cycle.",
      status: "Member review window: open. Updating information does not change the terms or tier of an active agreement.",
      media: {
        src: "trauma-team/media/trauma-flight.png",
        alt: "Trauma Team response aircraft crossing the Night City skyline",
        caption: "Night City regional flight operations",
        credit: "Member education archive",
      },
      stories: [
        {
          meta: "Member readiness // Quarterly review",
          title: "Confirm what dispatch will see before an emergency",
          summary: "Outdated residence access, medical limitations, emergency contacts, and employer sponsorship records can complicate verification when time matters.",
          paragraphs: [
            "Review the primary address, frequent work locations, access notes, implanted medical devices, significant allergies, and preferred receiving facility shown in the member profile. Remove instructions that no longer describe the property.",
            "Do not place door codes or live credentials in general notes. Use the protected access field or a verified building liaison where the current agreement supports one.",
          ],
          files: [{ label: "Download member response notice", href: "downloads/trauma-team-response-notice.pdf" }],
        },
        {
          meta: "Household coverage // Eligibility",
          title: "A shared address does not automatically share a response plan",
          summary: "Roommates, partners, dependents, employees, and guests are covered only when they appear in the applicable active agreement.",
          paragraphs: [
            "Gold and Platinum arrangements may support approved dependents or sponsored personnel after eligibility review. Adding a person can change billing, treatment credit, verification requirements, and available receiving facilities.",
            "Member Services can explain available options but cannot confirm another person's medical information or account status without authorization.",
          ],
          files: [{ label: "Download member readiness notice", href: "downloads/trauma-team-response-notice.pdf" }],
        },
      ],
      related: [
        ["Coverage plans", "trauma-team/#plans"],
        ["Response zones", "trauma-team/#response"],
        ["Member services", "trauma-team/#contact"],
      ],
    },
    "militech-security": {
      eyebrow: "Public intelligence note // Regional",
      title: "Low-complexity incidents still reward preparation.",
      intro: "Common access-control and temporary-venue failures share one weakness: authority exists on paper but is not assigned to a person at the point of decision.",
      status: "Distribution: public. This summary does not disclose client operations or active deployments.",
      media: {
        src: "militech-security/militech-controlled-arrival.png",
        alt: "Executive security vehicle arriving at a controlled private entrance",
        caption: "Controlled arrival procedure",
        credit: "Militech regional operations",
      },
      stories: [
        {
          meta: "Protective operations // Access control",
          title: "Verify the work order, not the uniform",
          summary: "Commercially available clothing, badges, scanners, and service language can reproduce the appearance of legitimate authority at low cost.",
          paragraphs: [
            "Managed facilities should require a work order generated inside the property system, confirmation through a known vendor contact, and escort from the controlled entry point. A credential presented by the visitor is supporting information, not the source of trust.",
            "Residents and staff should have a clear method to refuse access without prolonged confrontation. Procedures that depend on individual confidence fail when a visitor creates urgency or invokes a real local disruption.",
          ],
          files: [{ label: "Download access-control brief", href: "downloads/militech-access-control-brief.pdf" }],
        },
        {
          meta: "Event protection // Temporary venues",
          title: "Pop-up commerce creates fixed security problems",
          summary: "Moving events still require exit management, medical access, vendor accountability, and a single person authorized to stop operations.",
          paragraphs: [
            "A rotating location may reduce advance targeting, but it also increases the chance of unfamiliar electrical loads, blocked lanes, and contractors who have not been verified by the host property.",
            "The strongest low-cost control is a documented opening inspection shared by organizers and property representatives. If no property representative exists, organizers should treat that uncertainty as a condition rather than permission.",
          ],
          files: [{ label: "Temporary market safety card", href: "downloads/night-market-vendor-card.pdf" }],
        },
      ],
      related: [
        ["Event protection", "militech-security/information/event-protection/"],
        ["Incident response", "militech-security/information/incident-response/"],
        ["Privacy and records", "militech-security/information/privacy/"],
      ],
    },
    "elflines-online": {
      eyebrow: "Community scroll // Offline-world interruption",
      title: "Maintenance night became a guild social.",
      intro: "South Loop players turned a neighborhood signal interruption into an unofficial market meetup, then argued about whether the meetup counted as an event.",
      status: "Community report: not affiliated with Segotari, municipal services, or the parking structure's extremely confused owner.",
      media: {
        src: "shared-media/night-market.jpg",
        alt: "A lively improvised night market inside a concrete parking structure",
        caption: "South Loop player meetup",
        credit: "Posted by MossyBoots // faces cleared",
      },
      stories: [
        {
          meta: "Guild life // Community",
          title: "Thirty-seven players trade physical loot during local outage",
          summary: "When a neighborhood connection became unstable, members of four guilds moved their scheduled crafting exchange to a temporary market and discovered that inventory weighs more outside the game.",
          paragraphs: [
            "The gathering included hand-painted class tokens, printed route maps, repaired controllers, dice, embroidered guild patches, and a cake modeled after a Miasma Core. The cake was defeated without a balanced party.",
            "Organizers have posted a standing rule against exchanging account credentials, live access shards, or unverified third-party mods. Future offline meetups will use rotating public venues and publish accessibility details before the event.",
          ],
          files: [{ label: "Download meetup safety card", href: "downloads/elflines-community-meetup-card.pdf" }],
        },
        {
          meta: "Service watch // Player support",
          title: "What a disconnect does to raids, rankings, and market listings",
          summary: "Local signal loss can remove a player from an active group without immediately updating the rest of the party. Do not assume a silent player abandoned the run.",
          paragraphs: [
            "Raid leads should establish a five-minute reconnect window and a backup role before entering limited-attempt content. Marketplace sellers should confirm that a completed listing appears in history before reposting it.",
            "The unofficial hub cannot restore characters, items, currency, or ranking changes. Preserve the local timestamp, party list, location, and any transaction identifier before contacting official support.",
          ],
          files: [{ label: "Open community resources", href: "elflines-online/resources.html" }],
        },
      ],
      related: [
        ["Newbie guide", "elflines-online/newbie-guide.html"],
        ["Community forums", "elflines-online/forums.html"],
        ["Marketplace", "elflines-online/marketplace.html"],
      ],
    },
  };

  function renderFile(file) {
    return '<a class="city-pulse__file" href="' + rootUrl(file.href) + '">' + file.label + " -></a>";
  }

  function renderDetails(story, label) {
    const paragraphs = story.paragraphs.map(function (paragraph) {
      return "<p>" + paragraph + "</p>";
    }).join("");
    const files = story.files && story.files.length
      ? '<div class="city-pulse__downloads">' + story.files.map(renderFile).join("") + "</div>"
      : "";
    return "<details><summary>" + label + "</summary>" + paragraphs + files + "</details>";
  }

  function renderMedia(data) {
    return '<figure class="city-pulse__media"><img src="' + rootUrl(data.media.src) + '" alt="' + data.media.alt + '" loading="lazy">' +
      "<figcaption><span>" + data.media.caption + "</span><span>" + data.media.credit + "</span></figcaption></figure>";
  }

  function renderRelated(data, label) {
    return '<nav class="city-pulse__related-links" aria-label="' + label + '">' +
      data.related.map(function (link) {
        return '<a href="' + rootUrl(link[1]) + '">' + link[0] + "</a>";
      }).join("") + "</nav>";
  }

  function renderNetwork54(data) {
    const lead = data.stories[0];
    const second = data.stories[1];
    return '<div class="pulse54"><header class="pulse54__bar"><b>54 CITY DESK</b><span>LOCAL INSERT // 07.30.45</span><em>VERIFIED WHERE INDICATED</em></header>' +
      '<div class="pulse54__headline"><span>' + data.eyebrow + '</span><h2 id="city-pulse-title">' + data.title + "</h2><p>" + data.intro + "</p></div>" +
      '<div class="pulse54__lead">' + renderMedia(data) + '<article><span>' + lead.meta + "</span><h3>" + lead.title + "</h3><p>" + lead.summary + "</p>" + renderDetails(lead, "Continue reading") + "</article></div>" +
      '<aside class="pulse54__tonight"><div><small>ALSO TONIGHT</small><b>02</b></div><article><span>' + second.meta + "</span><h3>" + second.title + "</h3><p>" + second.summary + "</p>" + renderDetails(second, "Open feature") + "</article></aside>" +
      '<footer><span>54 NETWORK COVERAGE</span>' + renderRelated(data, "Related Network 54 coverage") + "</footer></div>";
  }

  function renderFeedFrenzy(data) {
    return '<div class="pulsefeed"><header><span>' + data.eyebrow + '</span><h2 id="city-pulse-title">' + data.title + '</h2><p class="pulsefeed__dek">' + data.intro + '</p><b class="pulsefeed__stamp">ACTUAL REPORTING<br>PLEASE REMAIN CALM</b></header>' +
      renderMedia(data) +
      '<div class="pulsefeed__receipts">' + data.stories.map(function (story, index) {
        return '<article class="pulsefeed__receipt"><div class="pulsefeed__number">0' + (index + 1) + '</div><div><span>' + story.meta + "</span><h3>" + story.title + "</h3><p>" + story.summary + "</p>" + renderDetails(story, index ? "Read what we know" : "Open the receipts") + "</div></article>";
      }).join("") + '</div><footer><b>KEEP FALLING DOWN THE RABBIT HOLE</b>' + renderRelated(data, "Related FeedFrenzy coverage") + "</footer></div>";
  }

  function renderDangerGal(data) {
    return '<div class="pulsedg"><header><div><span>DISCLOSURE REGISTER // DG-45-0730</span><h2 id="city-pulse-title">' + data.title + '</h2></div><dl><dt>ACCESS</dt><dd>PUBLIC</dd><dt>STATUS</dt><dd>SANITIZED</dd><dt>REGION</dt><dd>NC-1</dd></dl></header>' +
      '<div class="pulsedg__evidence">' + renderMedia(data) + '<aside><b>EVIDENCE NOTE</b><p>' + data.intro + '</p><small>' + data.status + "</small></aside></div>" +
      '<div class="pulsedg__register">' + data.stories.map(function (story, index) {
        return '<article><header><code>DG-45-0730-' + (index + 1) + "</code><span>" + story.meta + "</span></header><div><h3>" + story.title + "</h3><p>" + story.summary + "</p>" + renderDetails(story, "Open sanitized release") + "</div></article>";
      }).join("") + '</div><footer><span>ASSOCIATED PUBLIC RECORDS</span>' + renderRelated(data, "Associated Danger Gal records") + "</footer></div>";
  }

  function renderRentASamurai(data) {
    return '<div class="pulseras"><header><div><span>ROOK DROP // BOARD FILE 09</span><h2 id="city-pulse-title">' + data.title + '</h2><p>' + data.intro + '</p></div><aside><small>BOARD TRUST</small><b>UNVERIFIED</b><span>TERMS BEFORE MEETUP</span></aside></header>' +
      '<div class="pulseras__select"><div class="pulseras__visual">' + renderMedia(data) + '<b>STAGE // ROTATING MARKET</b></div><div class="pulseras__missions">' + data.stories.map(function (story, index) {
        return '<article><div class="pulseras__rank">' + (index ? "CLEAR" : "OPEN") + '</div><span>' + story.meta + "</span><h3>" + story.title + "</h3><p>" + story.summary + "</p>" + renderDetails(story, index ? "Read after-action" : "Inspect contract") + "</article>";
      }).join("") + '</div></div><footer><b>ROOK SAYS: VERIFY FIRST. BRAG LATER.</b>' + renderRelated(data, "Related Rent-A-Samurai board pages") + "</footer></div>";
  }

  function renderCivicNet(data) {
    return '<div class="pulsecivic"><header><div class="pulsecivic__seal">NC</div><div><span>NIGHT CITY MUNICIPAL ARCHIVE</span><h2 id="city-pulse-title">' + data.title + '</h2><p>' + data.intro + '</p></div><aside>RECORD GROUP<br><b>45-07 / PUBLIC</b></aside></header>' +
      '<div class="pulsecivic__status"><b>SYSTEM NOTE</b><span>' + data.status + '</span></div><div class="pulsecivic__body"><div class="pulsecivic__records">' + data.stories.map(function (story, index) {
        return '<article><div><span>RECORD</span><b>0' + (index + 1) + '</b></div><section><small>' + story.meta + "</small><h3>" + story.title + "</h3><p>" + story.summary + "</p>" + renderDetails(story, "View record and attachments") + "</section></article>";
      }).join("") + '</div><aside class="pulsecivic__image"><span>ATTACHED FIELD IMAGE</span>' + renderMedia(data) + "</aside></div><footer><span>COMMON DESTINATIONS</span>" + renderRelated(data, "Related CivicNet records") + "</footer></div>";
  }

  function renderTraumaTeam(data) {
    return '<div class="pulsetti"><header><div class="pulsetti__mark"><i>|||</i><b>TRAUMA <em>TEAM</em></b></div><div><span>MEMBER OPERATIONS UPDATE</span><h2 id="city-pulse-title">' + data.title + "</h2></div><aside><i></i><b>MONITORED</b><small>STANDARD DISPATCH ACTIVE</small></aside></header>" +
      '<div class="pulsetti__response"><div>' + renderMedia(data) + '</div><article><span>REGIONAL RESPONSE STATUS</span><strong>ACCESS<br>CONDITIONAL</strong><p>' + data.intro + '</p><small>' + data.status + "</small></article></div>" +
      '<div class="pulsetti__advisories">' + data.stories.map(function (story, index) {
        return '<article><b>0' + (index + 1) + '</b><div><span>' + story.meta + "</span><h3>" + story.title + "</h3><p>" + story.summary + "</p>" + renderDetails(story, "Member guidance") + "</div></article>";
      }).join("") + '</div><footer><span>MEMBER RESOURCES</span>' + renderRelated(data, "Trauma Team member resources") + "</footer></div>";
  }

  function renderMilitech(data) {
    return '<div class="pulsems"><header><div><span>MSR // PUBLIC INTELLIGENCE NOTE 07</span><h2 id="city-pulse-title">' + data.title + '</h2></div><dl><dt>DISTRIBUTION</dt><dd>PUBLIC</dd><dt>REGION</dt><dd>NIGHT CITY</dd><dt>REVISION</dt><dd>2045.07</dd></dl></header>' +
      '<div class="pulsems__summary"><article><b>EXECUTIVE SUMMARY</b><p>' + data.intro + '</p><small>' + data.status + '</small></article>' + renderMedia(data) + '</div><ol class="pulsems__findings">' + data.stories.map(function (story, index) {
        return '<li><b>0' + (index + 1) + '</b><article><span>' + story.meta + "</span><h3>" + story.title + "</h3><p>" + story.summary + "</p>" + renderDetails(story, "Review controls") + "</article></li>";
      }).join("") + '</ol><footer><span>RELATED CAPABILITIES</span>' + renderRelated(data, "Related Militech Security capabilities") + "</footer></div>";
  }

  function renderElflines(data) {
    const posts = data.stories.map(function (story, index) {
      const users = ["MossyBoots", "Mod_Windkin"];
      const levels = ["LVL 42 WAYFARER", "COMMUNITY MOD"];
      return '<article class="pulseelo__post"><aside><b>' + users[index] + '</b><i>' + (index ? "MW" : "MB") + '</i><small>' + levels[index] + '</small><span>' + (index ? "1,804" : "642") + ' POSTS</span></aside><div><header><span>' + story.meta + '</span><time>POSTED TODAY</time></header><h3>' + story.title + "</h3><p>" + story.summary + "</p>" + (index ? "" : renderMedia(data)) + renderDetails(story, index ? "Show mod guidance" : "Read the full thread starter") + '<footer><button type="button">+1 HELPFUL</button><span>SIGN IN TO REPLY</span></footer></div></article>';
    }).join("");
    return '<div class="pulseelo"><header><span>FORUMS / COMMUNITY / OFFLINE MEETUPS</span><h2 id="city-pulse-title">' + data.title + '</h2><p>' + data.intro + '</p><b>PINNED THREAD</b></header>' + posts + '<footer><span>JUMP TO</span>' + renderRelated(data, "Related Elflines Online community pages") + "</footer></div>";
  }

  const renderers = {
    "network-54": renderNetwork54,
    feedfrenzy: renderFeedFrenzy,
    "danger-gal": renderDangerGal,
    "rent-a-samurai": renderRentASamurai,
    "nc-civicnet": renderCivicNet,
    "trauma-team": renderTraumaTeam,
    "militech-security": renderMilitech,
    "elflines-online": renderElflines,
  };

  function mountPulse() {
    const site = currentSite();
    const data = coverage[site];
    if (!data || document.querySelector("#city-pulse")) {
      return;
    }

    const section = document.createElement("section");
    section.id = "city-pulse";
    section.className = "city-pulse city-pulse--" + site;
    section.setAttribute("aria-labelledby", "city-pulse-title");
    section.innerHTML = renderers[site](data);

    const main = document.querySelector("main");
    if (main) {
      main.appendChild(section);
    } else {
      document.body.appendChild(section);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountPulse, { once: true });
  } else {
    mountPulse();
  }
})();
