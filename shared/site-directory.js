(function () {
  "use strict";

  const sites = [
    {
      id: "trauma-team",
      name: "Trauma Team International",
      shortName: "Trauma Team",
      href: "trauma-team/",
      status: "live",
      description: "Premium emergency response. Response subject to area risk.",
      ringStatus: "online",
      ringDescription: "official coverage portal, somehow still in the ring from before they got big",
      pages: [
        ["Home", "trauma-team/"],
        ["Coverage Plans", "trauma-team/#plans"],
        ["Response Zones", "trauma-team/#response"],
        ["Network Clinics", "trauma-team/#clinics"],
        ["Common Questions", "trauma-team/#faq"],
        ["Membership Disclosures", "trauma-team/#disclosures"],
        ["Contact / Member Services", "trauma-team/#contact"],
      ],
    },
    {
      id: "elflines-online",
      name: "Elflines Online",
      ringName: "Elflines Online (Unofficial Hub)",
      href: "elflines-online/",
      status: "live",
      description: "Unofficial MMO player hub. Leaderboards, trading post, forums.",
      ringStatus: "online",
      ringDescription: "player-run, not Segotari-affiliated, argues about loot rolls",
      pages: [
        ["Home", "elflines-online/"],
        ["Leaderboard", "elflines-online/leaderboard.html"],
        ["Marketplace", "elflines-online/marketplace.html"],
        ["Forums", "elflines-online/forums.html"],
        ["Newbie Guide", "elflines-online/newbie-guide.html"],
        ["Resources", "elflines-online/resources.html"],
        ["Member Login", "elflines-online/login.html"],
      ],
    },
    {
      id: "nc-civicnet",
      name: "NC CivicNet",
      href: "nc-civicnet/",
      status: "live",
      description: "Official municipal portal. Chronically underfunded.",
      ringStatus: "online, municipal bandwidth permitting",
      ringDescription: "official city services, forms, warnings, and several departments that insist their terminal is working",
      pages: [
        ["Home", "nc-civicnet/"],
        ["Alerts", "nc-civicnet/alerts.html"],
        ["Emergency", "nc-civicnet/emergency.html"],
        ["Transit", "nc-civicnet/transit.html"],
        ["Municipal Services", "nc-civicnet/services.html"],
        ["Permits & Licenses", "nc-civicnet/permits.html"],
        ["Public Health", "nc-civicnet/health.html"],
        ["Districts", "nc-civicnet/districts.html"],
        ["Public Records", "nc-civicnet/records.html"],
        ["Laws & Ordinances", "nc-civicnet/laws.html"],
        ["City Government", "nc-civicnet/government.html"],
        ["Report a Problem", "nc-civicnet/report.html"],
        ["Public Comments", "nc-civicnet/comments.html"],
      ],
    },
    {
      id: "militech-security",
      name: "Militech Security",
      href: "militech-security/",
      status: "live",
      description: "Premium private security, protected movement, and contracted incident response.",
      ringStatus: "online, client access restricted",
      ringDescription: "premium private protection and regional security contracting for clients who can afford certainty",
      pages: [
        ["Regional Security Portal", "militech-security/"],
        ["Protective Services", "militech-security/#solutions"],
        ["Coverage Difference", "militech-security/#coverage"],
        ["Regional Operations", "militech-security/#command"],
        ["Client Resources", "militech-security/#resources"],
        ["Private Consultation", "militech-security/#consultation"],
        ["Incident Response", "militech-security/information/incident-response/"],
        ["Client Portal Information", "militech-security/information/client-portal/"],
        ["Privacy", "militech-security/information/privacy/"],
        ["Terms of Service", "militech-security/information/terms-of-service/"],
      ],
    },
    {
      id: "network-54",
      name: "Network 54",
      href: "network-54/",
      status: "live",
      description: "Glossy entertainment, celebrity coverage, trending clips, and sponsor-approved news.",
      ringStatus: "always on",
      ringDescription: "celebrity stories, trending clips, personalized recommendations, and the news sponsors consider worth seeing",
      pages: [
        ["Top Stories", "network-54/"],
        ["Celebs", "network-54/celebs/"],
        ["Clips", "network-54/clips/"],
        ["Style", "network-54/style/"],
        ["Nightlife", "network-54/nightlife/"],
        ["Business", "network-54/business/"],
        ["Sports", "network-54/sports/"],
      ],
    },
    {
      id: "feedfrenzy",
      name: "FeedFrenzy",
      href: "feedfrenzy/",
      status: "live",
      description: "Rumors, outrage, street clips, and whatever everyone is yelling about right now.",
      ringStatus: "online, facts pending",
      ringDescription: "viral clips, anonymous claims, celebrity meltdowns, and corrections nobody reads",
      pages: [
        ["Trending Feed", "feedfrenzy/"],
      ],
    },
    {
      id: "danger-gal",
      name: "Danger Gal",
      href: "danger-gal/",
      status: "live",
      description: "Private investigations, security services, public information releases, and confidential intake.",
      ringStatus: "online, disclosure filtered",
      ringDescription: "Night City's premier private detective and security agency; public records are selected, sanitized, and incomplete",
      pages: [
        ["Public Portal", "danger-gal/"],
        ["Services", "danger-gal/#services"],
        ["Confidential Intake", "danger-gal/#request"],
        ["Public Releases", "danger-gal/#releases"],
        ["Puma Squad", "danger-gal/#puma"],
        ["Submit Information", "danger-gal/#submit"],
      ],
    },
    {
      id: "rent-a-samurai",
      name: "Rent-A-Samurai",
      href: "rent-a-samurai/",
      status: "coming-soon",
      description: "Not yet indexed.",
      pages: [],
    },
  ];

  const offlineRingMembers = [
    {
      name: "Daeric Sylar's ELO Fansite",
      status: "404",
      description: "\"my elfline, my rules, my terrible html.\" last updated sometime before the Expansion Pack 1 drop. domain expired, nobody renewed it.",
    },
    {
      name: "Granny Ed's Garden & Gaming Corner",
      status: "online, barely",
      description: "half gardening blog, half ELO kill-cam highlight reel. surprisingly high uptime for someone's grandmother.",
    },
    {
      name: "Watson Nightlife Guide",
      status: "404",
      description: "hasn't been updated since three of the bars it reviewed stopped existing. rest in peace, Watson Nightlife Guide.",
    },
    {
      name: "Bur's Razorfire Survival Log",
      status: "online",
      description: "a single page. one entry. \"day 1: setting up camp here seemed smart at the time.\" no day 2.",
    },
    {
      name: "Southside Fixer Directory (Unverified)",
      status: "online",
      description: "a list of names and numbers. we did not vet this. neither should you, probably.",
    },
    {
      name: "Wormwood's Newbie Elfline Recruitment Page",
      status: "online",
      description: "free starter gear, weekly escorts, a surprisingly professional layout for a guild recruitment flyer.",
    },
    {
      name: "+ 3 more members",
      status: "unconfirmed",
      memberCount: 3,
      description: "ring registry hasn't been fully audited since the last maintainer disappeared. if your site's missing, that's probably why.",
    },
  ];

  window.NightCityNet = Object.freeze({
    sites: Object.freeze(sites),
    offlineRingMembers: Object.freeze(offlineRingMembers),
    liveSites: function () {
      return sites.filter(function (site) {
        return site.status === "live";
      });
    },
    ringMemberCount: function () {
      return sites.filter(function (site) {
        return site.status === "live";
      }).length + offlineRingMembers.reduce(function (total, member) {
        return total + (member.memberCount || 1);
      }, 0);
    },
  });
})();
