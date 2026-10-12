// Single source of truth for business details. Every fact here comes from the restaurant's
// own site (chancesryork.com: Our Story, The Experience, Events & Catering, "R" Buffets; scraped Oct 2026),
// its Google and TripAdvisor listings, or public reviews. Nothing invented.

export const site = {
  name: 'Chances "R"',
  fullName: 'Chances "R" Restaurant & Lounge',
  founded: 1932,
  founders: { him: "Raymond", her: "Shirley", family: "Reetz" },
  named: 1964,
  hosts: "Bryan & Renee Jantz",
  hostsShort: "Bryan & Renee",
  seats: 550,
  phone: {
    display: "(402) 362-7755",
    href: "tel:+14023627755",
    e164: "+14023627755",
  },
  cateringEmail: "catering@chancesryork.com",
  address: {
    street: "124 W 5th St",
    city: "York",
    region: "NE",
    zip: "68467",
    oneLine: "124 W 5th St, York, NE 68467",
  },
  // Checked Oct 2026.
  rating: {
    google: { score: "4.3", count: "320+" },
    tripadvisor: { rank: 1, of: 33, count: "440+" },
  },
  // Their current menus live on the old site as PDFs. Move these when the web address switches over.
  menus: {
    main: "https://www.chancesryork.com/s/Chances-R-Menu-52026.pdf",
    breakfast: "https://www.chancesryork.com/s/Breakfast-Menu-672026.pdf",
  },
  facebook: "https://www.facebook.com/ChancesRYork",
  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Chances+R+Restaurant+%26+Lounge%2C+124+W+5th+St%2C+York%2C+NE+68467",
    place: "https://www.google.com/maps/search/?api=1&query=Chances+R+Restaurant+%26+Lounge+York+NE",
  },
  // Spec preview mode. While true: noindex/nofollow for search engines and the
  // "Proposed site by T3KDesigns" footer credit. Flip to false at launch. That's the whole go-live switch.
  spec: true,
} as const;

// 0 = Sunday … 6 = Saturday. Hours as 24h decimals (Central time), used by the live open/closed badge.
export const hours: { label: string; days: number[]; time: string; open: number; close: number; note?: string }[] = [
  { label: "Mon – Tue", days: [1, 2], time: "11am – 9pm", open: 11, close: 21 },
  { label: "Wed – Fri", days: [3, 4, 5], time: "7am – 9pm", open: 7, close: 21 },
  { label: "Saturday", days: [6], time: "8am – 9pm", open: 8, close: 21 },
  { label: "Sunday", days: [0], time: "8am – 3pm", open: 8, close: 15 },
];

export const hoursSchema = ["Mo-Tu 11:00-21:00", "We-Fr 07:00-21:00", "Sa 08:00-21:00", "Su 08:00-15:00"];

export const carryOut = {
  time: "11am – 2pm & 5pm – 9pm",
  note: "Carry-out & local delivery",
  fine: "Local delivery as staffing allows. Out-of-town by arrangement.",
};

// From the "R" Buffets page, Oct 2026. Past dates hide themselves (see UpcomingBuffets).
// Their Experience page: "Due to staff shortages these buffets are currently available once a month."
// Leave this list empty and the site just says "call for the next one".
export const buffets: { date: string; label: string; time: string }[] = [
  { date: "2026-11-26", label: "Thanksgiving Brunch", time: "10am – 2pm" },
  { date: "2026-11-27", label: "Prime Rib Buffet", time: "from 5pm" },
  { date: "2026-12-19", label: "Prime Rib Buffet", time: "from 5pm" },
  { date: "2026-12-20", label: "Sunday Brunch", time: "10am – 2pm" },
];

// Verbatim from public reviews.
export const quotes = {
  butterKnife: "You can cut our prime rib with a butter knife! That's how tender it is.",
  bestInState: "Hands down, best prime rib in the state.",
  bestEver: "Best prime rib I ever had.",
  buffet: "Prime Rib Buffet was fantastic.",
  dessert: "spectacular",
  chicken: "I usually order the fried chicken — all white meat — or the prime rib.",
};

// From "Our Story" on their site.
export const history = [
  { year: "1932", text: "Hiney Neufeld opens the Cozy Lunch, a “modern hamburger shop.”" },
  { year: "1937", text: "Roy & Thelma “Mimi” Schultz, Shirley’s parents, take it over." },
  { year: "1957", text: "Raymond & Shirley Reetz buy the Cozy Lunch. It seats 50." },
  { year: "1964", text: "They expand to 180 seats, open the Shir-Ra Room, start catering, and rename it Chances “R”." },
  { year: "1983", text: "The Hob-Nob Lounge and Tommy-Suz Beer Garden open: mahogany, stained glass, brass. 550 seats." },
  { year: "1994", text: "Raymond & Shirley are named Restaurateurs of the Year by the Nebraska Restaurant Association." },
  { year: "2021", text: "After three generations of the family (the Schultzes, the Reetzes, Tom & Suzanne Vanous), Bryan & Renee Jantz take over." },
];

export const honors = [
  "Restaurateurs of the Year, Nebraska Restaurant Association, 1994",
  "Named the No. 1 tour bus stop in Nebraska",
];

// The Experience + Events & Catering pages.
export const rooms = {
  dining: [
    { name: "West Dining Room", line: "Stained and etched glass, brass, mahogany and oak. A business lunch or an elegant evening out." },
    { name: "East Dining Room", line: "Casual dining at its best. Slide into a booth for lunch, or homemade dessert and fresh coffee." },
  ],
  hobnob: {
    name: "Hob-Nob Lounge",
    happyHour: "Weekdays 5 – 7pm",
    line: "Friendly and relaxed, with a soup and salad bar of 30-plus items and happy hour on weekdays.",
  },
  private: [
    { name: "Shir-Ra Room", seats: "Up to 100", line: "Elegant and versatile. Banquet rows, U or E shapes, conference style, or rounds of eight. Divides for smaller parties; projection screen on request." },
    { name: "Tommy-Suz Beer Garden", seats: "Up to 250", line: "Its own saloon, a small stage, screen and sound system, antique gas pumps and neon. Meetings, parties, weddings." },
  ],
  catering: {
    range: "25 to 5,000 guests",
    area: "York, Lincoln, Grand Island, Seward, Columbus and around",
    line: "Full-service, off-premises, year-round: menu planning, hors d’oeuvres to desserts, served by an experienced staff.",
  },
  fine: "No room fee for private rooms with meal service. Tax and a 17% gratuity are added to private events. Wi-Fi throughout.",
};

export const nav = [
  { href: "#plate", label: "Build a plate" },
  { href: "#story", label: "Story" },
  { href: "#food", label: "Food" },
  { href: "#rooms", label: "Rooms" },
  { href: "#visit", label: "Visit" },
];

// ---- Build Your Plate ------------------------------------------------------

// The two cuts on the printed menu (both market price).
export const cuts = [
  { id: "regular", name: "Regular", line: "Regular Cut. Market price.", scale: 1 },
  { id: "husker", name: "Husker", line: "Husker Cut. The big one. Market price.", scale: 1.16 },
] as const;
export type CutId = (typeof cuts)[number]["id"];

// center = the color in the middle of the slice; band = the cooked ring; size = how much of the slice is "center".
export const doneness = [
  { id: "rare", name: "Rare", short: "Rare", line: "Cool red center. For the purists.", center: "#a3182a", band: "#8e4a3c", size: 0.94 },
  { id: "mr", name: "Medium rare", short: "Med-rare", line: "Warm red center. The classic.", center: "#bf3346", band: "#90574a", size: 0.86 },
  { id: "m", name: "Medium", short: "Medium", line: "Warm pink, edge to edge.", center: "#d06c6e", band: "#926253", size: 0.78 },
  { id: "mw", name: "Medium well", short: "Med-well", line: "A blush of pink in the middle.", center: "#bd8a7d", band: "#8f6656", size: 0.62 },
  { id: "w", name: "Well done", short: "Well", line: "Cooked through. Still cuts with a butter knife.", center: "#97705c", band: "#8a6450", size: 0.45 },
] as const;

// "Your choice of Potato" from the printed menu; every dinner comes with one.
export const potatoes = [
  { id: "mash", name: "Really Real Mashed", ticket: "really real mashed" },
  { id: "baked", name: "Baked", ticket: "baked potato" },
  { id: "hash", name: "Hash Browns", ticket: "hash browns" },
  { id: "fries", name: "French Fries", ticket: "fries" },
  { id: "pilaf", name: "Rice Pilaf", ticket: "rice pilaf" },
  { id: "veg", name: "Steamed Vegetables", ticket: "steamed veg" },
] as const;
export type PotatoId = (typeof potatoes)[number]["id"];
// "Served with our Special Sauteed Mushrooms, if you like."
export const mushrooms = { name: "Special Sautéed Mushrooms", line: "Served with the prime rib, if you like." };

export const MAX_LADLES = 3;
