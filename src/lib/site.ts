// Single source of truth for business details. Every fact here comes from the restaurant's
// own site (chancesryork.com), its Google and TripAdvisor listings, or public reviews. Nothing invented.

export const site = {
  name: 'Chances "R"',
  fullName: 'Chances "R" Restaurant & Lounge',
  founded: 1932,
  founders: { him: "Raymond", her: "Shirley" },
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
  { label: "Sunday", days: [0], time: "8am – 3pm", open: 8, close: 15, note: "Brunch" },
];

export const hoursSchema = ["Mo-Tu 11:00-21:00", "We-Fr 07:00-21:00", "Sa 08:00-21:00", "Su 08:00-15:00"];

export const carryOut = { time: "11am – 2pm & 5pm – 9pm", note: "Carry-out & local delivery, daily" };

// Verbatim from public reviews.
export const quotes = {
  butterKnife: "You can cut our prime rib with a butter knife! That's how tender it is.",
  bestInState: "Hands down, best prime rib in the state.",
  bestEver: "Best prime rib I ever had.",
  buffet: "Prime Rib Buffet was fantastic.",
  dessert: "spectacular",
  chicken: "I usually order the fried chicken — all white meat — or the prime rib.",
};

export const nav = [
  { href: "#plate", label: "Build a plate" },
  { href: "#story", label: "Story" },
  { href: "#food", label: "Food" },
  { href: "#rooms", label: "Rooms" },
  { href: "#visit", label: "Visit" },
];

// ---- Build Your Plate ------------------------------------------------------

export const cuts = [
  { id: "petite", name: "Petite", oz: 8, line: "Still a real supper.", scale: 0.88 },
  { id: "house", name: "House", oz: 12, line: "The sweet spot.", scale: 1 },
  { id: "hungry", name: "Hungry", oz: 16, line: "You skipped lunch.", scale: 1.12 },
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

export const sides = [
  { id: "mash", name: "Real mashed potatoes", ticket: "real mashed", line: "Real potatoes. Not instant." },
  { id: "veg", name: "Seasonal vegetables", ticket: "seasonal veg", line: "Whatever's good this time of year." },
  { id: "shroom", name: "Mushrooms", ticket: "mushrooms", line: "Sautéed. Piled on the side." },
] as const;
export type SideId = (typeof sides)[number]["id"];

export const MAX_LADLES = 3;
