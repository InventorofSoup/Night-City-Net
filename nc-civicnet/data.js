const districts = [
  {id:"little-europe",code:"A",name:"Little Europe",classification:"Mixed-Use District",manager:"Amanda Polishchuk",selection:"Elected by property owners",administration:"Active",council:"Voting seat",security:"NCPD",gangs:"6th Street, Eurotrashers, Maelstrom, Undertow",utility:"Reduced Service",wealth:"standard",warning:"Sewer pressure advisory near the old brick quarter"},
  {id:"upper-marina",code:"B",name:"Upper Marina",classification:"Mixed Industrial / Residential District",manager:"Kabria Chung",selection:"Elected by property owners",administration:"Active",council:"Voting seat",security:"NCPD",gangs:"Maelstrom, Prime-Time Players, Street Queens",utility:"Operational",wealth:"premium",warning:"Verified tidal-gate maintenance, 02:10-03:00"},
  {id:"downtown",code:"C",name:"Downtown",classification:"Central Business District",manager:"Emilia Ortega",selection:"Appointed by Chamber of Commerce",administration:"Active",council:"Corporate proxy vote",security:"Whitewater Security",gangs:"Eastern Tigers Triad, Skiv Family, Undertow",utility:"Operational",wealth:"premium",warning:"Corporate convoy closures on Central Avenue"},
  {id:"hot-zone",code:"D",name:"The Hot Zone",classification:"Restricted Reclamation District",manager:"None",selection:"No active administration",administration:"Unadministered",council:"Seat suspended",security:"NCPD (in theory)",gangs:"Lightning Cats, Maelstrom, Reckoners, scavver groups",utility:"No Municipal Coverage",wealth:"underserved",warning:"Structural collapse and radioactive debris reports remain unverified",lawStatus:"none"},
  {id:"little-china",code:"E",name:"Little China",classification:"Rebuilding Urban District",manager:"David Ling Po",selection:"Appointed by Little China Redevelopment Association",administration:"Active",council:"Advisory seat",security:"Gold Dragons",gangs:"Gold Dragons, Red Chrome Legion, Weng Fang Tong",utility:"Intermittent",wealth:"underserved",warning:"Unverified electrical fire reports east of Bridgetown"},
  {id:"university-district",code:"F",name:"University District",classification:"Institutional District",manager:"Doctor Edward Michaels",selection:"Self-appointed",administration:"Self-administered",council:"Institutional advisory seat",security:"NCU Campus Security",gangs:"Philharmonic Vampyres, Princesses of Justice",utility:"Operational",wealth:"standard",warning:"Campus checkpoints may deny access to non-students after 20:00"},
  {id:"the-glen",code:"G",name:"The Glen",classification:"Government District",manager:"Zohara Freeman",selection:"Appointed by Night Corp",administration:"Active",council:"Priority voting seat",security:"NCPD",gangs:"DeadWoods, Kill Krashers, Reckoners, Weng Fang Tong",utility:"Operational",wealth:"premium",warning:"Hall of Justice access screening extended"},
  {id:"old-japantown",code:"H",name:"Old Japantown",classification:"Combat Zone / Cultural District",manager:"Adriane Casselle",selection:"Elected by local family heads",administration:"Fragmented",council:"Advisory seat",security:"Kimen-Gumi",gangs:"Iron Sights, Maelstrom, Red Chrome Legion, Shroomers, Tyger Claws",utility:"Intermittent",wealth:"underserved",warning:"No verified safe corridor between community enclaves after dark"},
  {id:"south-night-city",code:"I",name:"South Night City",classification:"Industrial Combat Zone",manager:"Garven Haakensen",selection:"Self-appointed",administration:"Active - disputed",council:"Contested seat",security:"Scythe Security",gangs:"Bozos, DeadWoods, Enhanced, Kanzaki Family, Kill Krashers, Reckoners, Sinful Adams, Tyger Claws, Zoners",utility:"Major Disruption",wealth:"underserved",warning:"Provider response suspended outside contracted industrial blocks"},
  {id:"port",code:"J",name:"Port of Night City",classification:"Port District",manager:"Calypso",selection:"Appointed by Thelas elders",administration:"Special administration",council:"Contractual observer",security:"Thelas Marines",gangs:"Consortium, DeadWoods",utility:"Reduced Service",wealth:"standard",warning:"Cargo spill response; Dock 18 approach restricted"},
  {id:"reclamation-zone",code:"K",name:"Reclamation Zone",classification:"Reclamation District",manager:"Santos Dorado",selection:"Elected by district residents",administration:"Active",council:"Provisional voting seat",security:"Los Perros Guardianes",gangs:"Tombstone Preservers",utility:"Reduced Service",wealth:"standard",warning:"Transit maintenance exchange may interrupt district power allocation"},
  {id:"old-combat-zone",code:"L",name:"Old Combat Zone",classification:"Combat Zone / Reclamation District",manager:"Brick Coleman",selection:"As leader of Edgerunners Inc",administration:"Provisional administration",council:"Non-voting observer",security:"Edgerunners Inc",gangs:"Edgerunners Inc, Faded, Generation Red, Iron Sights, Shroomers",utility:"No Municipal Coverage",wealth:"underserved",warning:"Municipal responders will not enter without local security escort",lawStatus:"none"},
  {id:"norcal-base",code:"M",name:"NorCal Military Base",classification:"Military-Controlled District",manager:"General Ash Giovanni",selection:"Base commander",administration:"Restricted",council:"No public seat",security:"NorCal Military Police",gangs:"Culper Ring",utility:"Operational",wealth:"premium",warning:"Public information withheld under Estero Bay COG directive"},
  {id:"watson",code:"N",name:"Watson Development",classification:"Development District",manager:"Lucius Rhyne",selection:"Elected via general election",administration:"Active",council:"Contested voting seat",security:"NCPD",gangs:"Arzin Tynon, Dragula Racers, G3, Kanzaki Family, Tyger Claws, Wild Things",utility:"Reduced Service",wealth:"standard",warning:"Megabuilding lift failures; restoration estimate pending"},
  {id:"kabuki",code:"O",name:"Kabuki",classification:"Special Administrative Area",manager:"Yoshiki Murakami",selection:"Appointed by NCCS",administration:"Active",council:"Advisory seat",security:"Kimen-Gumi",gangs:"G3, Tyger Claws",utility:"Operational",wealth:"premium",warning:"Market access limited during cultural security review"},
  {id:"new-westbrook",code:"P",name:"New Westbrook",classification:"Mixed-Use Media District",manager:"Belkis Abera",selection:"Appointed by WorldSat and Network 54",administration:"Active",council:"Corporate proxy vote",security:"NCPD",gangs:"Arzin Tynon, Prime-Time Players, Street Queens, Tombstone Preservers",utility:"Reduced Service",wealth:"standard",warning:"Network 54 production perimeter may redirect public traffic"},
  {id:"charter-hill",code:"Q",name:"Charter Hill",classification:"Corporate Residential District",manager:"Symon Featherstonehaugh",selection:"Elected by property owners",administration:"Active",council:"Voting seat",security:"Militech",gangs:"Prime-Time Players, Tombstone Preservers, Tyger Claws",utility:"Operational",wealth:"premium",warning:"Property credential checks active on approaches to Executive Zone"},
  {id:"exec-zone",code:"R",name:"Exec Zone",classification:"Executive Corporate District",manager:"Doctor Karen Davies",selection:"Elected by Home Owner's Association",administration:"Active",council:"Priority voting seat",security:"Lazarus",gangs:"None",utility:"Operational",wealth:"premium",warning:"Advance notice: landscaping drone window, 14:00-14:20"},
  {id:"heywood-docks",code:"S",name:"Heywood Docks",classification:"Corporate Port District",manager:"Andrea Lee",selection:"Appointed by SK Security",administration:"Contract administration",council:"Corporate advisory seat",security:"SK Security",gangs:"DeadWoods, Skiv Family",utility:"Operational",wealth:"premium",warning:"Non-contracted cargo crews subject to secondary inspection"},
  {id:"north-heywood",code:"T",name:"North Heywood",classification:"Residential / Industrial District",manager:"Barry “Big Deal” Delvecchio",selection:"Appointed by district council",administration:"Active",council:"Voting seat",security:"6th Street",gangs:"6th Street, Inquisitors, Muses, Toecutters",utility:"Reduced Service",wealth:"standard",warning:"Deputized patrol checkpoint locations change without public notice"},
  {id:"heywood-industrial",code:"U",name:"Heywood Industrial Zone",classification:"Industrial District",manager:"Theo Walker",selection:"Appointed by Arroyo Concern",administration:"Active",council:"Industrial advisory seat",security:"NCPD",gangs:"Consortium, DeadWoods, Enhanced, Fixie's Couriers",utility:"Major Disruption",wealth:"underserved",warning:"Industrial runoff testing delayed; public sensor access unavailable"},
  {id:"santo-domingo",code:"V",name:"Santo Domingo",classification:"Industrial / Residential District",manager:"Theresa Valentino",selection:"Elected by residents",administration:"Active",council:"Voting seat",security:"Aldecaldo Peacekeepers",gangs:"El Norte Cartel, Kill Krashers, Rat Kings, Steel Vaqueros",utility:"Intermittent",wealth:"underserved",warning:"Water testing data unavailable; boil first if feasible"},
  {id:"pacifica-playground",code:"W",name:"Pacifica Playground",classification:"Corporate Entertainment District",manager:"Elliot Kane",selection:"Appointed by Playland by the Sea management",administration:"Active",council:"Corporate proxy vote",security:"Militech",gangs:"6th Street, Andersons, Enhanced, Mudang Gumi, Piranhas, Voodoo Boys",utility:"Operational",wealth:"premium",warning:"Public beach access may close during sponsored events"},
  {id:"rancho-coronado",code:"X",name:"Rancho Coronado",classification:"Unadministered Residential District",manager:"None",selection:"No funded office",administration:"Unadministered",council:"Vacant - seat unfunded",security:"NCPD (in theory)",gangs:"6th Street, Albino Alligators, Dirty Hippies, Steel Vaqueros, Voodoo Boys",utility:"No Municipal Coverage",wealth:"underserved",warning:"No verified provider data. Shelter capacity unavailable."}
];

const alerts = [
  {severity:"warning",category:"Weather",title:"Corrosive precipitation probability elevated",district:"Citywide",detail:"Coastal sensors indicate a 61% chance of acid rain after 19:00. Public garment protection stations are not funded.",agency:"NC Atmospheric Contract Office",verified:true},
  {severity:"emergency",category:"Water",title:"Potability failure - southern pressure zone",district:"Santo Domingo, Rancho Coronado",detail:"Testing confidence is low. Do not rely on color or odor to determine safety.",agency:"Municipal Water Coordination Desk",verified:false},
  {severity:"advisory",category:"Transit",title:"Metroline Red service bypass",district:"Little China",detail:"Trains may bypass Bridgetown Platform without notice during security activity.",agency:"Night City Transit Corporation",verified:true},
  {severity:"notice",category:"Security",title:"Priority corridor reservation",district:"Downtown, Executive Zone",detail:"Precise closure times are available to authorized corporate mobility accounts.",agency:"Office of Contracted Mobility",verified:true},
  {severity:"advisory",category:"Health",title:"Counterfeit dermal sealant batch",district:"Watson Development",detail:"Batch identifiers were supplied to participating clinics. Public list publication is delayed.",agency:"Department of Public Health and Biological Safety",verified:true}
];
const popupAlerts = [alerts[1], alerts[0], alerts[2]];

const permitTypes = [
  {id:"business",code:"BUS-01",name:"Business Operating Certificate",base:275,days:110,summary:"Required for a fixed commercial location, office, workshop, clinic, venue, or NET-facing service.",requirements:["Verified SIN or CIN","Property-owner authorization","District security acknowledgment","Waste and utility plan"]},
  {id:"vendor",code:"VND-07",name:"Street Vendor Permit",base:95,days:75,summary:"Authorizes a cart, stall, mobile kitchen, temporary repair service, or market table in an approved public area.",requirements:["Vendor identity","Market or block sponsor","Sanitation bond","Current district location"]},
  {id:"building",code:"BLD-14",name:"Building Modification Permit",base:650,days:160,summary:"Required for structural work, container additions, rooftop occupancy, exterior generators, fortified entries, and utility rerouting.",requirements:["Registered property interest","Structural scan","Utility-provider review","Emergency access diagram"]},
  {id:"weapons",code:"WPN-09",name:"Weapons Carry Endorsement",base:420,days:95,summary:"District endorsement for regulated weapons. Security-provider rules and property restrictions remain superior.",requirements:["Verified identity","Weapon serial record","Security interview","Liability sponsor"]},
  {id:"drone",code:"AIR-22",name:"Drone and Aerial Device Permit",base:310,days:80,summary:"Covers camera drones, cargo lifters, survey units, signal repeaters, and limited commercial aerial operations.",requirements:["Device registration","Flight purpose","Route and altitude plan","Corporate-zone clearance"]},
  {id:"gathering",code:"EVT-04",name:"Public Gathering Notice",base:140,days:45,summary:"Required for demonstrations, memorials, performances, labor actions, religious events, and gatherings above twenty persons.",requirements:["Responsible organizer","Route or site plan","Cleanup bond","Security-impact review"]},
  {id:"occupancy",code:"OCC-31",name:"Temporary Occupancy Certificate",base:185,days:70,summary:"Registers temporary housing, cargo-stack residences, converted vehicles, shelters, dormitories, and encampment facilities.",requirements:["Site claimant approval","Fire-watch plan","Sanitation provider","Occupant estimate"]},
  {id:"salvage",code:"SLV-18",name:"Salvage and Recovery Claim",base:120,days:55,summary:"Registers recovery rights for abandoned machinery, vehicles, structures, cyberware, and municipal equipment.",requirements:["Location and item images","Prior-owner search fee","Hazard declaration","District claim marker"]}
];

const permitQueue = [
  ["NC-45-77192","Street Vendor","RETURNED","Sponsor credential expired during review"],
  ["NC-45-77188","Building Modification","ON HOLD","Structural scan contractor no longer recognized"],
  ["NC-45-77173","Drone Device","REFERRED","Route overlaps restricted corporate telemetry"],
  ["NC-45-77141","Business Operating","FEE DUE","Search fee increased after custody transfer"],
  ["NC-45-77096","Temporary Occupancy","UNASSIGNED","Responsible district provider not located"]
];

const municipalServiceTypes = [
  {id:"power",code:"PWR",name:"Electrical Power",provider:"Night City Grid Recovery Cooperative",note:"Generation, substations, local distribution, emergency shutoff, and metering."},
  {id:"water",code:"WTR",name:"Water Supply",provider:"Municipal Water Coordination Desk",note:"Potable supply, pressure-zone routing, tanker recognition, and public sampling."},
  {id:"sewer",code:"SWR",name:"Sewer and Drainage",provider:"Bay Reclamation & Sanitation Partners",note:"Wastewater lift stations, storm drains, flood gates, and contaminated runoff."},
  {id:"citi",code:"NET",name:"CitiNet Public Access",provider:"Ziggurat Civic Access Contract",note:"Public terminals, district gateways, emergency notices, and municipal identity routing."},
  {id:"waste",code:"WST",name:"Waste Collection",provider:"Night City Materials Recovery Office",note:"Household waste, industrial transfer, medical disposal, and abandoned property removal."},
  {id:"lighting",code:"LGT",name:"Street Lighting",provider:"Office of Public Corridor Continuity",note:"Public lamps, crossing signals, emergency beacons, and contractor corridor lighting."}
];
const serviceStates = ["Operational","Reduced Service","Intermittent","Major Disruption","Suspended","No Municipal Coverage"];
function districtServiceState(d, serviceIndex) {
  const base = serviceStates.indexOf(d.utility);
  const districtIndex = d.code.charCodeAt(0) - 65;
  const shift = (districtIndex + serviceIndex * 2) % 3 - 1;
  return serviceStates[Math.max(0, Math.min(5, base + shift))];
}
const serviceNotices = [
  ["WTR-2045-771","Santo Domingo","Potability confidence failure","Boiling does not remove suspected industrial contaminants. Tanker recognition list restricted.","VERIFIED"],
  ["PWR-2045-448","Watson Development","Megabuilding feeder rotation","Power may alternate between residential lifts, refrigeration, and exterior security systems.","VERIFIED"],
  ["SWR-2045-106","Little Europe","Brick-quarter backflow advisory","Basement drains may reverse during the evening pressure cycle. Public pump inventory unavailable.","VERIFIED"],
  ["NET-2045-903","Old Japantown","Public gateway identity failures","Temporary credentials may be rejected or assigned to a neighboring district archive.","UNVERIFIED"],
  ["WST-2045-214","Rancho Coronado","Collection provider not located","Residents should not move refuse into utility easements, transit approaches, or redevelopment claims.","UNVERIFIED"]
];

const airQualityZones = [
  {name:"Little Europe",aqi:118,pollutant:"PM2.5 / construction dust",reading:"Municipal sensor / delayed",updated:"09:06"},
  {name:"Upper Marina",aqi:82,pollutant:"Salt particulate / O₃",reading:"Tidal authority verified",updated:"09:29"},
  {name:"Downtown",aqi:88,pollutant:"PM2.5",reading:"Verified",updated:"09:35"},
  {name:"The Hot Zone",aqi:null,pollutant:"Unknown",reading:"No surviving municipal sensors",updated:"OFFLINE"},
  {name:"Little China",aqi:174,pollutant:"Combustion particulate",reading:"Two sensors offline / estimated",updated:"08:42"},
  {name:"University District",aqi:74,pollutant:"O₃ / laboratory exhaust",reading:"Campus network verified",updated:"09:32"},
  {name:"The Glen",aqi:63,pollutant:"Traffic particulate",reading:"Night Corp contractor feed",updated:"09:37"},
  {name:"Old Japantown",aqi:208,pollutant:"Smoke / mold aerosol",reading:"Community sensor relay",updated:"07:18"},
  {name:"South Night City",aqi:238,pollutant:"Metallic particulate",reading:"Contractor supplied",updated:"08:11"},
  {name:"Port of Night City",aqi:156,pollutant:"Diesel soot / salt particulate",reading:"Port authority feed",updated:"09:01"},
  {name:"Reclamation Zone",aqi:132,pollutant:"Concrete and silica dust",reading:"Mobile sensor estimate",updated:"08:24"},
  {name:"Old Combat Zone",aqi:null,pollutant:"Unknown",reading:"No municipal coverage",updated:"OFFLINE"},
  {name:"NorCal Military Base",aqi:null,pollutant:"Classified",reading:"Public telemetry withheld",updated:"RESTRICTED"},
  {name:"Watson Development",aqi:143,pollutant:"PM2.5 / polymer ash",reading:"Estimated",updated:"08:50"},
  {name:"Kabuki",aqi:109,pollutant:"Cooking smoke / PM2.5",reading:"Market sensor cooperative",updated:"09:12"},
  {name:"New Westbrook",aqi:91,pollutant:"O₃ / vehicle emissions",reading:"WorldSat public feed",updated:"09:22"},
  {name:"Charter Hill",aqi:54,pollutant:"O₃",reading:"Militech contractor verified",updated:"09:39"},
  {name:"Executive Zone",aqi:42,pollutant:"O₃",reading:"Lazarus contractor verified",updated:"09:38"},
  {name:"Heywood Docks",aqi:167,pollutant:"Diesel soot / solvent vapor",reading:"SK Security feed",updated:"08:57"},
  {name:"North Heywood",aqi:151,pollutant:"Smoke / road dust",reading:"Deputized patrol sensor",updated:"08:33"},
  {name:"Heywood Industrial Zone",aqi:276,pollutant:"NO₂ / solvent vapor",reading:"Public sensor only",updated:"06:39"},
  {name:"Santo Domingo",aqi:191,pollutant:"SO₂ / industrial haze",reading:"Low confidence",updated:"07:55"},
  {name:"Pacifica Playground",aqi:67,pollutant:"Salt particulate",reading:"Sponsor network",updated:"09:31"},
  {name:"Rancho Coronado",aqi:null,pollutant:"Unknown",reading:"No funded reporting provider",updated:"UNAVAILABLE"}
];

const healthReports = [
  {id:"PH-45-0715-04",level:"ADVISORY",title:"Corrosive precipitation exposure window",area:"Citywide after 19:00",summary:"Coastal chemistry predicts skin and eye irritation during evening rainfall. Municipal garment-seal dispensers report no public inventory.",detail:"Rinse exposed skin with verified clean water for fifteen minutes. Do not use runoff, decorative fountains, or unmarked building tanks. Seek treatment for persistent burning, blurred vision, or dermal bubbling."},
  {id:"PH-45-0714-19",level:"RECALL",title:"Counterfeit Dermaseal batch DS-44",area:"Watson Development / North Heywood",summary:"Unlicensed sealant sold in gray squeeze cartridges may harden beneath synthetic skin and obstruct thermal regulation.",detail:"Stop use immediately. Do not peel cured material from implanted seams. Participating clinics have the verified batch markings; the public image attachment is restricted by the manufacturer."},
  {id:"PH-45-0713-08",level:"INVESTIGATION",title:"Acute tremor cluster near Cannery Row",area:"Upper Marina",summary:"Eleven patients reported hand tremors, auditory distortion, and a copper taste. Four shared the same street-food vendor; seven interviews remain incomplete.",detail:"Cause is unconfirmed. Samples were split between a city lab and a private insurer. The vendor cart was removed before a follow-up inspection and its current location is not recorded."},
  {id:"PH-45-0712-33",level:"WARNING",title:"Reclaimed-water contamination indicators",area:"Santo Domingo",summary:"Two pressure-zone samples contain biological markers above the provisional contractor threshold. Chain-of-custody seals were compromised.",detail:"Boiling may not remove industrial contaminants. Use sealed potable water where available. The City cannot certify private tanker, rooftop capture, or neighborhood distribution sources."},
  {id:"PH-45-0709-61",level:"RECALL",title:"NeuroPort K-12 thermal regulator",area:"Citywide",summary:"Regulators manufactured before March 2045 may lock cooling responses during sustained neural load or combat-stimulant use.",detail:"Warning signs include phantom heat, jaw tremor, visual snow, and repeated automatic reboot. Removal is covered only at participating clinics with proof of purchase or a registered employer plan."},
  {id:"PH-45-0707-12",level:"MONITORING",title:"Unlicensed kibble additive: red fleck",area:"Little Europe / Old Japantown",summary:"Brick-red seasoning found in repackaged protein lots has caused vomiting and temporary low-light blindness in six verified cases.",detail:"Retain packaging if safe. Lot codes were printed on dissolving labels and may no longer be visible. No municipal replacement-food program is funded."}
];

const clinics = [
  ["Night City Medical Center","The Glen","DIVERTING","Limited","250eb triage"],
  ["Watson Community Clinic 3","Watson","4–7 hours","No","40eb deposit"],
  ["University Medical Annex","University District","Students only","Research cases","Sponsor required"],
  ["Santo Domingo Mobile Unit","Santo Domingo","LOCATION DELAYED","No","Donation"],
  ["Trauma Team Executive Intake","Citywide dispatch","Clients only","Yes","Plan verified"],
  ["Old Japantown Mutual Aid Clinic","Old Japantown","At capacity","Street tech","Supplies or 75eb"]
];

const publicRecordSamples = [
  {id:"NCR-45-0711-88",type:"Transit",district:"Little China",date:"2045-07-11",title:"Bridgetown platform obstruction invoice",summary:"Cleanup contractor billed for twelve plastic chairs, one burned vending unit, and three unregistered cargo crates. Crate contents were transferred to an unnamed security custodian.",status:"PARTIAL SCAN"},
  {id:"NCR-45-0630-14",type:"Property",district:"Watson Development",date:"2045-06-30",title:"Megabuilding 8 lift inspection addendum",summary:"Cars 2 and 5 failed emergency braking tests. The repair vendor marked both units operational four hours before the inspection was uploaded.",status:"DISPUTED"},
  {id:"NCR-45-0618-03",type:"Procurement",district:"The Glen",date:"2045-06-18",title:"Municipal toner and paper allocation",summary:"Records Node 07-C received six cyan cartridges, no black cartridges, and 40,000 sheets of Form 19-B. Substitution request remains unsigned.",status:"PUBLIC"},
  {id:"NCR-45-0602-51",type:"Utilities",district:"Santo Domingo",date:"2045-06-02",title:"South pressure-zone water sample chain",summary:"Sample SD-44 changed custody seven times. Seals 3 and 6 were recorded as already broken; laboratory destination field reads CONTRACTOR TO ADVISE.",status:"INCOMPLETE"},
  {id:"NCR-45-0527-20",type:"Meetings",district:"Rancho Coronado",date:"2045-05-27",title:"Unfunded district office attendance sheet",summary:"Meeting location listed as the parking area behind a closed All Foods. Four attendees signed in; the chair and records clerk fields are blank.",status:"UNVERIFIED"},
  {id:"NCR-45-0509-77",type:"Emergency",district:"Little Europe",date:"2045-05-09",title:"Decommissioned shelter inventory",summary:"Basement shelter LE-19 retains 31 cots, two water bladders, and a generator reported missing after a 2043 contractor transfer. Public access authorization expired.",status:"OUTDATED"},
  {id:"NCR-45-0421-09",type:"Sanitation",district:"Upper Marina",date:"2045-04-21",title:"Canal recovery and disposal summary",summary:"Recovered property included a delivery drone, two vehicle doors, and an encrypted municipal terminal registered to a department dissolved in 2038.",status:"REDACTED"},
  {id:"NCR-45-0314-62",type:"Permits",district:"Pacifica Playground",date:"2045-03-14",title:"Temporary attraction permit correction",summary:"Permit authorizes one holographic mascot through 2047. Handwritten note states second mascot is not an animal and does not require inspection.",status:"TRANSLATION PENDING"}
];

const agencyRows = [
  ["Office of Municipal Coordination","Charter administration and inter-district referrals","Operational","City Council"],
  ["Department of Public Health and Biological Safety","Outbreaks, contamination, recalls, morgue reporting","Reduced Service","Biotechnica support agreement"],
  ["Night City Transit Corporation","Metroline, surface transit, fare enforcement","Operational","Mixed public/private funding"],
  ["Municipal Water Coordination Desk","Provider routing, testing notices, pressure zones","Intermittent","Six regional contractors"],
  ["Office of Contracted Public Safety","Security agreements and deputization records","Restricted","NCPD / district providers"],
  ["CitiNet Public Records Gateway","Records publication and archive retrieval","Major Disruption","Ziggurat maintenance contract"]
];
const advisorySeats = [
  ["Militech","Defense, emergency corridors","ACTIVE"],
  ["Biotechnica","Health and food systems","ACTIVE"],
  ["Ziggurat","CitiNet infrastructure","ACTIVE"],
  ["Night City University","Research and education","LIMITED"],
  ["Thelas Nation","Port and logistics","ACTIVE"],
  ["NCTC Funding Board","Transit finance","ACTIVE"],
  ["Trauma Team","Emergency medical coordination","CLOSED BRIEFING"]
];
const meetingList = [
  ["15 JUL 2045 • 10:00","Regular City Council Session","IN PROGRESS","Public stream delayed 18 minutes. Agenda revision B not published."],
  ["15 JUL 2045 • 13:30","Emergency Utility Coordination Committee","LIMITED ACCESS","Public seating: 8. Contractor representatives receive priority."],
  ["16 JUL 2045 • 09:00","Security Agreement Review","CLOSED SESSION","Public summary expected within 30 business days."],
  ["17 JUL 2045 • 18:00","South Pressure-Zone Water Hearing","SCHEDULED","Remote testimony requires verified district residence."],
  ["22 JUL 2045 • 11:15","Election Certification Review","TENTATIVE","May be canceled upon private settlement of the challenge."]
];
const budgetRows = [
  ["Contracted public safety",93,"2.8B eb"],
  ["Utility continuity",81,"1.4B eb"],
  ["Transit operations",74,"890M eb"],
  ["Public health",48,"310M eb"],
  ["Resident assistance",17,"42M eb"]
];
const electionGrid = [
  ["Watson Development","General election","UNDER REVIEW","Resident and employer verification dispute"],
  ["Little Europe","Property-owner election","CERTIFIED","Tenant ballots not authorized"],
  ["Executive Zone","HOA election","CERTIFIED","Membership roll restricted"],
  ["Rancho Coronado","No funded election","VACANT","Council seat fee not deposited"]
];

// --- laws.js port ---
const lawProfiles = {
  "little-europe":"mixed","upper-marina":"mixed","downtown":"corporate","little-china":"combat-edge","university-district":"institutional","the-glen":"government","old-japantown":"combat-edge","south-night-city":"combat-edge","port":"port","reclamation-zone":"reclamation","norcal-base":"military","watson":"mixed","kabuki":"corporate","new-westbrook":"entertainment","charter-hill":"corporate","exec-zone":"corporate","heywood-docks":"port","north-heywood":"mixed","heywood-industrial":"industrial","santo-domingo":"underserved","pacifica-playground":"entertainment","rancho-coronado":"underserved"
};
function lawCommon(d) {
  return [
    {category:"Identity",title:"Identity and Address Confirmation",summary:`Anyone requesting district service in ${d.name} must provide a verifiable SIN, CIN, employer credential, property record, or approved temporary identity. Unverified persons may be detained only when an authorized provider accepts custody.`,penalty:"Service denial; 20-100eb processing assessment"},
    {category:"Emergency Access",title:"Emergency and Contractor Corridor Obstruction",summary:`Vehicles, vendors, gatherings, debris, and temporary housing may not obstruct a route designated by ${d.security}, a utility contractor, Trauma Team, MAX-TAC, or the City Manager. Corridor notices may be issued after clearance begins.`,penalty:"Immediate removal; vehicle or property impound; costs assessed"},
    {category:"Buildings",title:"Unlicensed Structural Modification",summary:"Load-bearing changes, rooftop additions, container stacking, exterior generators, fortified doors, and utility bypasses require district approval or a participating property-owner exemption.",penalty:"100-2,500eb; closure or demolition at owner expense"},
    {category:"Utilities",title:"Utility Connection and Meter Tampering",summary:"Bypassing a meter, reconnecting suspended service, diverting potable water, or interfering with contractor sensors is prohibited even when no regular municipal service is available.",penalty:"Restitution plus 200-5,000eb; service blacklisting"},
    {category:"Waste",title:"Waste, Cyberware, and Biological Disposal",summary:"Human remains, removed cyberware, batteries, industrial chemicals, medical waste, and contaminated water may be deposited only with an assigned provider. Absence of a provider is not a defense.",penalty:"250-10,000eb; hazardous-response fee"},
    {category:"Public Safety",title:"Hazard Reporting and Public Nuisance",summary:"Fires, collapses, unexploded ordnance, radiation, contagious disease, exposed wiring, and uncontrolled drones must be reported. Filing a report does not create a response obligation.",penalty:"50-500eb for failure to report; false-report fees apply"}
  ];
}
const lawProfileRules = {
  mixed:[
    {category:"Curfew",title:"Variable Residential Curfew",summary:"Persons under eighteen and unverified visitors may not remain in residential blocks between 23:00 and 05:00. Work, transit, and provider credentials are accepted at patrol discretion.",penalty:"Escort, detention, or 50eb citation"},
    {category:"Weapons",title:"Visible Weapons and Street Discharge",summary:"Long arms must be slung and heavy weapons covered in public commercial areas. Discharge is prohibited except for verified defense, contracted security, or licensed demonstrations.",penalty:"Weapon confiscation; 100-1,000eb"},
    {category:"Vendors",title:"Street Vendor and Night Market Licensing",summary:"Vendors require a district permit, security-provider acknowledgment, and proof of waste removal. Temporary markets may be relocated without compensation.",penalty:"Goods seizure; 75eb daily fine"},
    {category:"Gatherings",title:"Public Gathering Registration",summary:"Gatherings larger than twenty persons require seventy-two hours notice. Labor actions, memorials, and tenant meetings are not exempt when they affect contracted access.",penalty:"Dispersal; organizer fee up to 1,500eb"},
    {category:"Vehicles",title:"Street Parking and Vehicle Repair",summary:"Disabled vehicles, curbside repairs, and overnight freight parking require a current district sticker or property-owner authorization.",penalty:"Tow and impound; 25eb per hour"}
  ],
  corporate:[
    {category:"Access",title:"Credentialed Zone Entry",summary:"Entry beyond public corridors requires a resident, employee, client, delivery, or sponsored-visitor credential. Credentials may be scanned, retained, or revoked without public appeal.",penalty:"Removal, detention, and access blacklist"},
    {category:"Security",title:"Compliance with Private Security Direction",summary:"Lawful directions issued by the contracted security provider carry district authority while within the provider boundary. Recording a restricted operation may constitute interference.",penalty:"250-5,000eb; credential suspension",restricted:true},
    {category:"Drones",title:"Aerial Device and Counter-Surveillance Control",summary:"Unregistered drones, optics, signal repeaters, and mapping devices are prohibited above private roads, residential compounds, executive facilities, and contractor staging areas.",penalty:"Device destruction; 1,000eb minimum"},
    {category:"Commerce",title:"Solicitation and Unapproved Commercial Activity",summary:"Door-to-door sales, street performance, political canvassing, independent delivery work, and mobile advertising require property-management sponsorship.",penalty:"Removal; 500eb commercial trespass fee"},
    {category:"Property",title:"Property Appearance and Temporary Occupancy",summary:"Unapproved tents, cargo containers, exterior drying, visible repairs, protest signage, and overnight vehicle habitation are prohibited within managed viewsheds.",penalty:"Immediate abatement; costs attached to property record"}
  ],
  government:[
    {category:"Access",title:"Government Facility Security Perimeter",summary:"Courts, records halls, Council offices, and contractor briefing rooms may establish identity checkpoints and deny entry without suspending scheduled public business.",penalty:"Removal; 250eb rescreening fee"},
    {category:"Records",title:"Protected Administrative Information",summary:"Possession or redistribution of unredacted Council files, voting weights, sealed bids, protected addresses, or closed-session media is prohibited without stakeholder authorization.",penalty:"2,500eb; records-access suspension",restricted:true},
    {category:"Gatherings",title:"Civic Plaza Demonstration Permit",summary:"Demonstrations require an approved route, liability sponsor, sanitation bond, and security plan. Permits may be superseded by executive or contractor use.",penalty:"Dispersal and bond forfeiture"},
    {category:"Conduct",title:"Interference with Administrative Processing",summary:"Threatening, recording, obstructing, or repeatedly contacting a clerk, contractor, City Manager employee, or Council proxy may be classified as administrative interference.",penalty:"30-day building ban; 500eb"},
    {category:"Media",title:"Accredited Media Positioning",summary:"Media activity is limited to marked public zones. Independent recording near security screening, archives, or prisoner transfer routes requires a Council press credential.",penalty:"Equipment hold; footage review"}
  ],
  institutional:[
    {category:"Access",title:"Campus Identity and Visitor Sponsorship",summary:"Nonstudents require faculty, employer, research, or event sponsorship after 20:00. Campus Security may close academic blocks without municipal notice.",penalty:"Removal; sponsor account assessment"},
    {category:"Research",title:"Controlled Research Material",summary:"Pathogens, wetware, experimental cyberware, restricted chemicals, and proprietary datasets may not leave an approved laboratory chain of custody.",penalty:"Expulsion, confiscation, and corporate referral",restricted:true},
    {category:"Speech",title:"Amplified Speech and Assembly Scheduling",summary:"Rallies, performances, religious activity, and amplified speech require a reserved campus location and a security-impact review.",penalty:"Event termination; 100eb cleanup charge"},
    {category:"Housing",title:"Student Housing Occupancy",summary:"Subletting, rooftop habitation, container additions, and unregistered overnight guests are prohibited in university-controlled housing.",penalty:"Housing suspension or 300eb"},
    {category:"Networks",title:"Academic Network Interference",summary:"Unauthorized access points, signal masking, braindance broadcasting, and NET Architecture probing are prohibited on university property.",penalty:"Device seizure; academic or criminal referral"}
  ],
  "combat-edge":[
    {category:"Security",title:"Provisional Security Checkpoint Compliance",summary:"Checkpoints recognized by the City Manager or district Security Provider may search vehicles, verify identity, and redirect movement. Recognition does not guarantee patrol safety or complaint review.",penalty:"Detention, confiscation, or denied passage"},
    {category:"Weapons",title:"Crew-Served and Military Weapon Restriction",summary:"Rocket launchers, grenades, automatic support weapons, mines, and vehicle-mounted weapons may not be displayed within designated community protection blocks.",penalty:"Confiscation where enforceable; 500eb claim"},
    {category:"Salvage",title:"Occupied Structure and Salvage Claims",summary:"Removing fixtures, power cells, structural steel, medical equipment, or cyberware from a marked occupied building is prohibited without a local claim token.",penalty:"Restitution at replacement value; local ban"},
    {category:"Markets",title:"Protected Community Market Hours",summary:"Recognized community markets may operate without a full vendor permit but must pay sanitation, fire-watch, and security assessments to the designated administrator.",penalty:"Stall closure; inventory hold"},
    {category:"Fire",title:"Open Flame and Ammunition Storage",summary:"Open fires, ammunition loading, and fuel transfer are prohibited inside occupied cargo stacks, tenements, clinic corridors, and marked evacuation lanes.",penalty:"Immediate seizure; community restitution"}
  ],
  port:[
    {category:"Cargo",title:"Cargo Manifest and Custody Record",summary:"All commercial cargo entering or leaving a controlled dock requires a manifest, responsible carrier, destination record, and hazardous-material declaration.",penalty:"Cargo hold; 2% assessed value per day"},
    {category:"Access",title:"Dock and Vessel Security Perimeter",summary:"Nonworkers require a vessel, employer, customs, or security sponsor beyond public dock gates. Waterside entry counts as unauthorized access.",penalty:"Detention; 500eb port security fee"},
    {category:"Hazardous Materials",title:"Hazardous Cargo Segregation",summary:"Fuel, explosives, batteries, chemicals, biological material, and radioactive cargo must use assigned staging and response contractors.",penalty:"10,000eb minimum; vessel exclusion"},
    {category:"Watercraft",title:"Small Craft, Drone, and Salvage Operation",summary:"Unregistered boats, submersibles, cargo drones, and salvage rigs may not operate within marked shipping or canal approaches.",penalty:"Craft seizure; recovery costs"},
    {category:"Labor",title:"Port Labor and Contractor Recognition",summary:"Loading, repair, security, piloting, and cargo brokerage require recognition by the administering port authority or its contracted labor registry.",penalty:"Work stoppage; earnings seizure",restricted:true}
  ],
  reclamation:[
    {category:"Salvage",title:"Registered Salvage Claim",summary:"A claimant must mark, date, and register recovered structures, machinery, vehicles, and utility equipment before dismantling or resale.",penalty:"Loss of claim; restitution"},
    {category:"Structures",title:"Structural Safety Tagging",summary:"Occupied reclaimed structures require a visible green, yellow, or red inspection tag. Missing tags do not authorize demolition by outsiders.",penalty:"Evacuation order; 100eb assessment"},
    {category:"Transit",title:"Public Transit Maintenance Priority",summary:"Transit repair crews and parts shipments receive priority at crossings, generators, workshops, and district fuel points under the district land-for-service agreement.",penalty:"Equipment impound; service suspension"},
    {category:"Housing",title:"Occupancy and Reclaimer Homestead Notice",summary:"Vacant structures may be occupied after public marking and a seven-day claim period unless an active prior owner or contractor record is located.",penalty:"Claim reassignment; no relocation guarantee"},
    {category:"Community Labor",title:"Emergency Reclamation Labor Requirement",summary:"During collapse, fire, flood, or transit failure, registered households may be assigned a limited watch, evacuation, repair, or supply duty.",penalty:"Loss of priority fuel, transit, or materials access"}
  ],
  military:[
    {category:"Access",title:"Controlled Installation Entry",summary:"No public right of entry exists. All persons, vehicles, cargo, and implants are subject to search, escort, tracking, and immediate removal.",penalty:"Military detention or exclusion"},
    {category:"Imaging",title:"Photography, Mapping, and Sensor Prohibition",summary:"Photography, recording, braindance capture, mapping, telemetry, and passive signal collection are prohibited without command authorization.",penalty:"Device seizure; counterintelligence review",restricted:true},
    {category:"Weapons",title:"Weapons Surrender and Declaration",summary:"Visitors must declare and surrender all weapons, ammunition, combat drugs, drones, and offensive cyberware activation tokens.",penalty:"Detention; permanent access ban"},
    {category:"Airspace",title:"Restricted Airspace and Drone Exclusion",summary:"All unauthorized aircraft, AVs, drones, rockets, and high-altitude observation devices are subject to interception without warning.",penalty:"Destruction of craft; recovery billing"},
    {category:"Curfew",title:"Command Curfew and Emergency Orders",summary:"The base commander may establish immediate curfews, shelter orders, communications blackouts, exclusion zones, and compulsory evacuation routes.",penalty:"Military custody; no municipal appeal"}
  ],
  industrial:[
    {category:"Hazardous Materials",title:"Industrial Chemical and Fuel Handling",summary:"Bulk fuel, reactive chemicals, compressed gas, radioactive material, and contaminated machine fluids require a registered facility plan and contracted response provider.",penalty:"2,500-25,000eb; facility closure"},
    {category:"Vehicles",title:"Heavy Vehicle Route and Axle Restriction",summary:"Freight, construction, and autonomous industrial vehicles must use designated routes and yield to emergency, corporate, and utility convoys.",penalty:"500eb; cargo or vehicle hold"},
    {category:"Air Quality",title:"Emission and Particulate Reporting",summary:"Facilities must report visible plumes, odor events, filter bypasses, and toxic releases. Public sensor readings do not establish a violation without contractor confirmation.",penalty:"Corrective contract or 5,000eb"},
    {category:"Labor",title:"Shift Housing and Worker Occupancy",summary:"Rooftop containers, factory dormitories, and converted warehouses require employer sanitation, fire-watch, and evacuation certification.",penalty:"Occupancy suspension; employer assessment"},
    {category:"Noise",title:"Industrial Operating-Hour Exemption",summary:"Registered industrial facilities are exempt from ordinary noise limits. Residents must file through the facility contract liaison rather than municipal nuisance channels.",penalty:"Unauthorized shutdown interference: 1,000eb",restricted:true}
  ],
  entertainment:[
    {category:"Visitors",title:"Visitor Identity and Event Credential",summary:"Visitors may be required to link purchases, lodging, attraction entry, transit, and security screening to a temporary district credential.",penalty:"Entry denial; nonrefundable processing fee"},
    {category:"Media",title:"Filming, Performance, and Likeness Control",summary:"Commercial recording, street performance, live feeds, and public use of protected attraction imagery require a venue or district media license.",penalty:"Equipment hold; revenue claim",restricted:true},
    {category:"Crowds",title:"Sponsored Event Crowd Control",summary:"Public roads, beaches, parks, and transit platforms may be reserved for sponsored events. Existing public permits are automatically subordinate.",penalty:"Removal; ticket and rerouting costs"},
    {category:"Commerce",title:"Performer, Vendor, and Promoter License",summary:"Performers, promoters, ticket sellers, vendors, escorts, and independent guides require district approval and a recognized sponsor.",penalty:"Earnings seizure; 250eb"},
    {category:"Conduct",title:"Intoxication, Braindance, and Guest Conduct",summary:"Venues may remove intoxicated, disruptive, recording, armed, or insufficiently spending guests under delegated district authority.",penalty:"Venue exclusion; property-transfer fee"}
  ],
  underserved:[
    {category:"Curfew",title:"Emergency Curfew Publication",summary:"A curfew may be announced by radio, posted notice, patrol loudspeaker, or contractor message. Failure to receive the notice is not an exemption.",penalty:"Dispersal or detention where a patrol is available"},
    {category:"Water",title:"Potable Water Distribution Control",summary:"Resale, diversion, hoarding, or unauthorized connection to a marked potable source is prohibited. Household allocation is not guaranteed.",penalty:"Container seizure; exclusion from next distribution"},
    {category:"Markets",title:"Temporary Market Recognition",summary:"Markets are lawful only when recognized by the nominal district office, a property claimant, or the current security provider. Recognition may be withdrawn without hearing.",penalty:"Stall removal; goods held for fees"},
    {category:"Housing",title:"Temporary Housing and Encampment Notice",summary:"Cargo stacks, tents, vehicles, and occupied ruins must remain outside utility easements and claimed redevelopment parcels, including parcels with no active construction.",penalty:"Removal without relocation assistance"},
    {category:"Enforcement",title:"Unavailable Provider Enforcement Clause",summary:"A law remains in effect when no municipal provider is assigned. Residents may not compel enforcement, investigation, protection, or appeal based on publication of the law.",penalty:"No standard penalty schedule; contractor rates apply"}
  ]
};
const lawProfileOrder = ["mixed","corporate","government","institutional","combat-edge","port","reclamation","military","industrial","entertainment","underserved"];
function publishedLawCount(d) {
  const districtIndex = d.code.charCodeAt(0) - 65;
  return 10 + (districtIndex * 7) % 16;
}
function localizeFineSchedule(penalty, d) {
  const districtIndex = d.code.charCodeAt(0) - 65;
  const multiplier = [0.65,0.8,0.95,1.1,1.25,1.45,1.7][districtIndex % 7];
  return penalty.split(";").map(function (part) {
    if (!/eb/i.test(part)) return part;
    return part.replace(/\d[\d,]*/g, function (raw) {
      const amount = Number(raw.replaceAll(",", ""));
      const adjusted = amount < 20 ? Math.max(1, Math.round(amount * multiplier)) : Math.max(5, Math.round(amount * multiplier / 5) * 5);
      return adjusted.toLocaleString("en-US");
    });
  }).join(";");
}
function getDistrictLaws(d) {
  if (d.lawStatus === "none") return [];
  const profile = lawProfiles[d.id] || "mixed";
  const target = publishedLawCount(d);
  const districtIndex = d.code.charCodeAt(0) - 65;
  const borrowedProfiles = [...lawProfileOrder.slice(districtIndex % lawProfileOrder.length), ...lawProfileOrder.slice(0, districtIndex % lawProfileOrder.length)].filter(function (p) { return p !== profile; });
  const borrowed = borrowedProfiles.flatMap(function (p, profileIndex) {
    const rules = lawProfileRules[p];
    const offset = (districtIndex + profileIndex) % rules.length;
    return [...rules.slice(offset), ...rules.slice(0, offset)];
  });
  const rules = [...lawCommon(d), ...lawProfileRules[profile], ...borrowed].slice(0, target);
  return rules.map(function (r, i) {
    return {
      code: d.code + "-ORD-" + String(i + 1).padStart(3, "0"),
      category: r.category,
      title: r.title,
      summary: r.summary.replaceAll("{security}", d.security),
      enforcement: d.security,
      penalty: localizeFineSchedule(r.penalty, d),
      status: r.restricted ? "Stakeholder Only" : (d.wealth === "underserved" && i % 5 === 0) ? "Outdated" : (d.administration.includes("Provisional") || d.administration.includes("Fragmented")) ? "Provisional" : (i === 8 && d.wealth === "standard") ? "Translation Pending" : "Active"
    };
  });
}
