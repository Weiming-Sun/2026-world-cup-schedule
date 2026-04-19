import React, { useMemo, useState } from "react";
import { Search, CalendarDays, MapPin, Clock3, SlidersHorizontal, X } from "lucide-react";

// Static 2026 FIFA World Cup schedule.
// Mobile-first, single-page webpage layout optimized for iPhone viewing.
const matches = [
  { id: 1, date: "2026-06-11", time: "12:00 PM PT", venue: "Estadio Azteca", city: "Mexico City", round: "Group Stage", match: "Mexico vs South Africa" },
  { id: 2, date: "2026-06-11", time: "3:00 PM PT", venue: "Estadio Akron", city: "Guadalajara", round: "Group Stage", match: "South Korea vs Czechia" },
  { id: 3, date: "2026-06-12", time: "12:00 PM PT", venue: "BMO Field", city: "Toronto", round: "Group Stage", match: "Canada vs Bosnia & Herzegovina" },
  { id: 4, date: "2026-06-12", time: "6:00 PM PT", venue: "SoFi Stadium", city: "Los Angeles", round: "Group Stage", match: "USA vs Paraguay" },
  { id: 5, date: "2026-06-13", time: "9:00 AM PT", venue: "Gillette Stadium", city: "Boston", round: "Group Stage", match: "Haiti vs Scotland" },
  { id: 6, date: "2026-06-13", time: "12:00 PM PT", venue: "BC Place", city: "Vancouver", round: "Group Stage", match: "Australia vs Türkiye" },
  { id: 7, date: "2026-06-13", time: "3:00 PM PT", venue: "MetLife Stadium", city: "New York/New Jersey", round: "Group Stage", match: "Brazil vs Morocco" },
  { id: 8, date: "2026-06-13", time: "6:00 PM PT", venue: "Levi's Stadium", city: "San Francisco Bay Area", round: "Group Stage", match: "Qatar vs Switzerland" },
  { id: 9, date: "2026-06-14", time: "9:00 AM PT", venue: "Lincoln Financial Field", city: "Philadelphia", round: "Group Stage", match: "Ivory Coast vs Ecuador" },
  { id: 10, date: "2026-06-14", time: "12:00 PM PT", venue: "NRG Stadium", city: "Houston", round: "Group Stage", match: "Germany vs Curaçao" },
  { id: 11, date: "2026-06-14", time: "3:00 PM PT", venue: "AT&T Stadium", city: "Dallas", round: "Group Stage", match: "Netherlands vs Japan" },
  { id: 12, date: "2026-06-14", time: "6:00 PM PT", venue: "Estadio BBVA", city: "Monterrey", round: "Group Stage", match: "Sweden vs Tunisia" },
  { id: 13, date: "2026-06-15", time: "9:00 AM PT", venue: "Hard Rock Stadium", city: "Miami", round: "Group Stage", match: "Saudi Arabia vs Uruguay" },
  { id: 14, date: "2026-06-15", time: "12:00 PM PT", venue: "Mercedes-Benz Stadium", city: "Atlanta", round: "Group Stage", match: "Spain vs Cape Verde" },
  { id: 15, date: "2026-06-15", time: "3:00 PM PT", venue: "SoFi Stadium", city: "Los Angeles", round: "Group Stage", match: "Iran vs New Zealand" },
  { id: 16, date: "2026-06-15", time: "6:00 PM PT", venue: "Lumen Field", city: "Seattle", round: "Group Stage", match: "Belgium vs Egypt" },
  { id: 17, date: "2026-06-16", time: "9:00 AM PT", venue: "MetLife Stadium", city: "New York/New Jersey", round: "Group Stage", match: "France vs Senegal" },
  { id: 18, date: "2026-06-16", time: "12:00 PM PT", venue: "Gillette Stadium", city: "Boston", round: "Group Stage", match: "Iraq vs Norway" },
  { id: 19, date: "2026-06-16", time: "3:00 PM PT", venue: "Arrowhead Stadium", city: "Kansas City", round: "Group Stage", match: "Argentina vs Algeria" },
  { id: 20, date: "2026-06-16", time: "6:00 PM PT", venue: "Levi's Stadium", city: "San Francisco Bay Area", round: "Group Stage", match: "Austria vs Jordan" },
  { id: 21, date: "2026-06-17", time: "9:00 AM PT", venue: "BMO Field", city: "Toronto", round: "Group Stage", match: "Ghana vs Panama" },
  { id: 22, date: "2026-06-17", time: "12:00 PM PT", venue: "AT&T Stadium", city: "Dallas", round: "Group Stage", match: "England vs Croatia" },
  { id: 23, date: "2026-06-17", time: "3:00 PM PT", venue: "NRG Stadium", city: "Houston", round: "Group Stage", match: "Portugal vs DR Congo" },
  { id: 24, date: "2026-06-17", time: "6:00 PM PT", venue: "Estadio Azteca", city: "Mexico City", round: "Group Stage", match: "Uzbekistan vs Colombia" },
  { id: 25, date: "2026-06-18", time: "9:00 AM PT", venue: "Mercedes-Benz Stadium", city: "Atlanta", round: "Group Stage", match: "Czechia vs South Africa" },
  { id: 26, date: "2026-06-18", time: "12:00 PM PT", venue: "Estadio Akron", city: "Guadalajara", round: "Group Stage", match: "Mexico vs South Korea" },
  { id: 27, date: "2026-06-18", time: "3:00 PM PT", venue: "SoFi Stadium", city: "Los Angeles", round: "Group Stage", match: "Switzerland vs Bosnia" },
  { id: 28, date: "2026-06-18", time: "6:00 PM PT", venue: "BC Place", city: "Vancouver", round: "Group Stage", match: "Canada vs Qatar" },
  { id: 29, date: "2026-06-19", time: "9:00 AM PT", venue: "Gillette Stadium", city: "Boston", round: "Group Stage", match: "Scotland vs Morocco" },
  { id: 30, date: "2026-06-19", time: "12:00 PM PT", venue: "Lincoln Financial Field", city: "Philadelphia", round: "Group Stage", match: "Brazil vs Haiti" },
  { id: 31, date: "2026-06-19", time: "3:00 PM PT", venue: "Lumen Field", city: "Seattle", round: "Group Stage", match: "USA vs Australia" },
  { id: 32, date: "2026-06-19", time: "6:00 PM PT", venue: "Levi's Stadium", city: "San Francisco Bay Area", round: "Group Stage", match: "Türkiye vs Paraguay" },
  { id: 33, date: "2026-06-20", time: "9:00 AM PT", venue: "BMO Field", city: "Toronto", round: "Group Stage", match: "Germany vs Ivory Coast" },
  { id: 34, date: "2026-06-20", time: "12:00 PM PT", venue: "Arrowhead Stadium", city: "Kansas City", round: "Group Stage", match: "Ecuador vs Curaçao" },
  { id: 35, date: "2026-06-20", time: "3:00 PM PT", venue: "NRG Stadium", city: "Houston", round: "Group Stage", match: "Netherlands vs Sweden" },
  { id: 36, date: "2026-06-20", time: "6:00 PM PT", venue: "Estadio BBVA", city: "Monterrey", round: "Group Stage", match: "Tunisia vs Japan" },
  { id: 37, date: "2026-06-21", time: "9:00 AM PT", venue: "SoFi Stadium", city: "Los Angeles", round: "Group Stage", match: "Belgium vs Iran" },
  { id: 38, date: "2026-06-21", time: "12:00 PM PT", venue: "BC Place", city: "Vancouver", round: "Group Stage", match: "New Zealand vs Egypt" },
  { id: 39, date: "2026-06-21", time: "3:00 PM PT", venue: "Mercedes-Benz Stadium", city: "Atlanta", round: "Group Stage", match: "Spain vs Saudi Arabia" },
  { id: 40, date: "2026-06-21", time: "6:00 PM PT", venue: "Hard Rock Stadium", city: "Miami", round: "Group Stage", match: "Uruguay vs Cape Verde" },
  { id: 41, date: "2026-06-22", time: "9:00 AM PT", venue: "Lincoln Financial Field", city: "Philadelphia", round: "Group Stage", match: "France vs Iraq" },
  { id: 42, date: "2026-06-22", time: "12:00 PM PT", venue: "MetLife Stadium", city: "New York/New Jersey", round: "Group Stage", match: "Norway vs Senegal" },
  { id: 43, date: "2026-06-22", time: "3:00 PM PT", venue: "AT&T Stadium", city: "Dallas", round: "Group Stage", match: "Argentina vs Austria" },
  { id: 44, date: "2026-06-22", time: "6:00 PM PT", venue: "Levi's Stadium", city: "San Francisco Bay Area", round: "Group Stage", match: "Jordan vs Algeria" },
  { id: 45, date: "2026-06-23", time: "9:00 AM PT", venue: "NRG Stadium", city: "Houston", round: "Group Stage", match: "Portugal vs Uzbekistan" },
  { id: 46, date: "2026-06-23", time: "12:00 PM PT", venue: "Estadio Akron", city: "Guadalajara", round: "Group Stage", match: "Colombia vs DR Congo" },
  { id: 47, date: "2026-06-23", time: "3:00 PM PT", venue: "Gillette Stadium", city: "Boston", round: "Group Stage", match: "England vs Ghana" },
  { id: 48, date: "2026-06-23", time: "6:00 PM PT", venue: "BMO Field", city: "Toronto", round: "Group Stage", match: "Panama vs Croatia" },
  { id: 49, date: "2026-06-24", time: "9:00 AM PT", venue: "Estadio Azteca", city: "Mexico City", round: "Group Stage", match: "Czechia vs Mexico" },
  { id: 50, date: "2026-06-24", time: "9:00 AM PT", venue: "Estadio BBVA", city: "Monterrey", round: "Group Stage", match: "South Africa vs Korea" },
  { id: 51, date: "2026-06-24", time: "12:00 PM PT", venue: "BC Place", city: "Vancouver", round: "Group Stage", match: "Switzerland vs Canada" },
  { id: 52, date: "2026-06-24", time: "12:00 PM PT", venue: "Lumen Field", city: "Seattle", round: "Group Stage", match: "Bosnia vs Qatar" },
  { id: 53, date: "2026-06-24", time: "3:00 PM PT", venue: "Hard Rock Stadium", city: "Miami", round: "Group Stage", match: "Scotland vs Brazil" },
  { id: 54, date: "2026-06-24", time: "3:00 PM PT", venue: "Mercedes-Benz Stadium", city: "Atlanta", round: "Group Stage", match: "Morocco vs Haiti" },
  { id: 55, date: "2026-06-25", time: "9:00 AM PT", venue: "SoFi Stadium", city: "Los Angeles", round: "Group Stage", match: "Türkiye vs USA" },
  { id: 56, date: "2026-06-25", time: "9:00 AM PT", venue: "Levi's Stadium", city: "San Francisco Bay Area", round: "Group Stage", match: "Paraguay vs Australia" },
  { id: 57, date: "2026-06-25", time: "12:00 PM PT", venue: "MetLife Stadium", city: "New York/New Jersey", round: "Group Stage", match: "Ecuador vs Germany" },
  { id: 58, date: "2026-06-25", time: "12:00 PM PT", venue: "Lincoln Financial Field", city: "Philadelphia", round: "Group Stage", match: "Curaçao vs Ivory Coast" },
  { id: 59, date: "2026-06-25", time: "3:00 PM PT", venue: "AT&T Stadium", city: "Dallas", round: "Group Stage", match: "Japan vs Sweden" },
  { id: 60, date: "2026-06-25", time: "3:00 PM PT", venue: "Arrowhead Stadium", city: "Kansas City", round: "Group Stage", match: "Tunisia vs Netherlands" },
  { id: 61, date: "2026-06-26", time: "9:00 AM PT", venue: "Lumen Field", city: "Seattle", round: "Group Stage", match: "Egypt vs Iran" },
  { id: 62, date: "2026-06-26", time: "9:00 AM PT", venue: "BC Place", city: "Vancouver", round: "Group Stage", match: "New Zealand vs Belgium" },
  { id: 63, date: "2026-06-26", time: "12:00 PM PT", venue: "NRG Stadium", city: "Houston", round: "Group Stage", match: "Cape Verde vs Saudi Arabia" },
  { id: 64, date: "2026-06-26", time: "12:00 PM PT", venue: "Estadio Akron", city: "Guadalajara", round: "Group Stage", match: "Uruguay vs Spain" },
  { id: 65, date: "2026-06-26", time: "3:00 PM PT", venue: "Gillette Stadium", city: "Boston", round: "Group Stage", match: "Norway vs France" },
  { id: 66, date: "2026-06-26", time: "3:00 PM PT", venue: "BMO Field", city: "Toronto", round: "Group Stage", match: "Senegal vs Iraq" },
  { id: 67, date: "2026-06-27", time: "9:00 AM PT", venue: "Arrowhead Stadium", city: "Kansas City", round: "Group Stage", match: "Algeria vs Austria" },
  { id: 68, date: "2026-06-27", time: "9:00 AM PT", venue: "AT&T Stadium", city: "Dallas", round: "Group Stage", match: "Jordan vs Argentina" },
  { id: 69, date: "2026-06-27", time: "12:00 PM PT", venue: "Hard Rock Stadium", city: "Miami", round: "Group Stage", match: "Colombia vs Portugal" },
  { id: 70, date: "2026-06-27", time: "12:00 PM PT", venue: "Mercedes-Benz Stadium", city: "Atlanta", round: "Group Stage", match: "DR Congo vs Uzbekistan" },
  { id: 71, date: "2026-06-27", time: "3:00 PM PT", venue: "MetLife Stadium", city: "New York/New Jersey", round: "Group Stage", match: "Panama vs England" },
  { id: 72, date: "2026-06-27", time: "3:00 PM PT", venue: "Lincoln Financial Field", city: "Philadelphia", round: "Group Stage", match: "Croatia vs Ghana" },
  { id: 73, date: "2026-06-28", time: "TBD", venue: "SoFi Stadium", city: "Los Angeles", round: "Round of 32", match: "A2 vs B2" },
  { id: 74, date: "2026-06-28", time: "TBD", venue: "Gillette Stadium", city: "Boston", round: "Round of 32", match: "E1 vs best 3rd" },
  { id: 75, date: "2026-06-29", time: "TBD", venue: "Estadio BBVA", city: "Monterrey", round: "Round of 32", match: "F1 vs C2" },
  { id: 76, date: "2026-06-29", time: "TBD", venue: "NRG Stadium", city: "Houston", round: "Round of 32", match: "C1 vs F2" },
  { id: 77, date: "2026-06-30", time: "TBD", venue: "MetLife Stadium", city: "New York/New Jersey", round: "Round of 32", match: "I1 vs best 3rd" },
  { id: 78, date: "2026-06-30", time: "TBD", venue: "AT&T Stadium", city: "Dallas", round: "Round of 32", match: "E2 vs I2" },
  { id: 79, date: "2026-07-01", time: "TBD", venue: "Estadio Azteca", city: "Mexico City", round: "Round of 32", match: "A1 vs best 3rd" },
  { id: 80, date: "2026-07-01", time: "TBD", venue: "Mercedes-Benz Stadium", city: "Atlanta", round: "Round of 32", match: "L1 vs best 3rd" },
  { id: 81, date: "2026-07-02", time: "TBD", venue: "Levi's Stadium", city: "San Francisco Bay Area", round: "Round of 32", match: "D1 vs best 3rd" },
  { id: 82, date: "2026-07-02", time: "TBD", venue: "Lumen Field", city: "Seattle", round: "Round of 32", match: "G1 vs best 3rd" },
  { id: 83, date: "2026-07-03", time: "TBD", venue: "BMO Field", city: "Toronto", round: "Round of 32", match: "K2 vs L2" },
  { id: 84, date: "2026-07-03", time: "TBD", venue: "SoFi Stadium", city: "Los Angeles", round: "Round of 32", match: "H1 vs J2" },
  { id: 85, date: "2026-07-03", time: "TBD", venue: "BC Place", city: "Vancouver", round: "Round of 32", match: "B1 vs best 3rd" },
  { id: 86, date: "2026-07-03", time: "TBD", venue: "Hard Rock Stadium", city: "Miami", round: "Round of 32", match: "J1 vs H2" },
  { id: 87, date: "2026-07-03", time: "TBD", venue: "Arrowhead Stadium", city: "Kansas City", round: "Round of 32", match: "K1 vs best 3rd" },
  { id: 88, date: "2026-07-03", time: "TBD", venue: "AT&T Stadium", city: "Dallas", round: "Round of 32", match: "D2 vs G2" },
  { id: 89, date: "2026-07-04", time: "TBD", venue: "Lincoln Financial Field", city: "Philadelphia", round: "Round of 16", match: "W74 vs W77" },
  { id: 90, date: "2026-07-04", time: "TBD", venue: "NRG Stadium", city: "Houston", round: "Round of 16", match: "W73 vs W75" },
  { id: 91, date: "2026-07-05", time: "TBD", venue: "MetLife Stadium", city: "New York/New Jersey", round: "Round of 16", match: "W76 vs W78" },
  { id: 92, date: "2026-07-05", time: "TBD", venue: "Estadio Azteca", city: "Mexico City", round: "Round of 16", match: "W79 vs W80" },
  { id: 93, date: "2026-07-06", time: "TBD", venue: "AT&T Stadium", city: "Dallas", round: "Round of 16", match: "W83 vs W84" },
  { id: 94, date: "2026-07-06", time: "TBD", venue: "Lumen Field", city: "Seattle", round: "Round of 16", match: "W81 vs W82" },
  { id: 95, date: "2026-07-07", time: "TBD", venue: "Mercedes-Benz Stadium", city: "Atlanta", round: "Round of 16", match: "W86 vs W88" },
  { id: 96, date: "2026-07-07", time: "TBD", venue: "BC Place", city: "Vancouver", round: "Round of 16", match: "W85 vs W87" },
  { id: 97, date: "2026-07-09", time: "TBD", venue: "Gillette Stadium", city: "Boston", round: "Quarterfinal", match: "W89 vs W90" },
  { id: 98, date: "2026-07-09", time: "TBD", venue: "SoFi Stadium", city: "Los Angeles", round: "Quarterfinal", match: "W93 vs W94" },
  { id: 99, date: "2026-07-10", time: "TBD", venue: "Hard Rock Stadium", city: "Miami", round: "Quarterfinal", match: "W91 vs W92" },
  { id: 100, date: "2026-07-10", time: "TBD", venue: "Arrowhead Stadium", city: "Kansas City", round: "Quarterfinal", match: "W95 vs W96" },
  { id: 101, date: "2026-07-14", time: "TBD", venue: "AT&T Stadium", city: "Dallas", round: "Semifinal", match: "W97 vs W98" },
  { id: 102, date: "2026-07-15", time: "TBD", venue: "Mercedes-Benz Stadium", city: "Atlanta", round: "Semifinal", match: "W99 vs W100" },
  { id: 103, date: "2026-07-18", time: "TBD", venue: "Hard Rock Stadium", city: "Miami", round: "Third Place", match: "Third-place match" },
  { id: 104, date: "2026-07-19", time: "TBD", venue: "MetLife Stadium", city: "New York/New Jersey", round: "Final", match: "Final" },
];

const roundOrder = ["Group Stage", "Round of 32", "Round of 16", "Quarterfinal", "Semifinal", "Third Place", "Final"];
const unique = (arr) => Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));

function MatchCard({ item }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-wide text-slate-500">
            <span className="rounded-full bg-slate-100 px-2 py-1">#{item.id}</span>
            <span className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700">{item.round}</span>
          </div>
          <h2 className="mt-3 text-base font-semibold leading-snug text-slate-900 sm:text-lg">{item.match}</h2>
        </div>
        <div className="shrink-0 rounded-2xl bg-slate-50 px-3 py-2 text-right">
          <div className="text-sm font-semibold text-slate-900">{item.date}</div>
          <div className="flex items-center justify-end gap-1 text-xs text-slate-500">
            <Clock3 className="h-3.5 w-3.5" /> {item.time || "TBD"}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{item.venue}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0" />
          <span className="truncate">{item.city}</span>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("all");
  const [time, setTime] = useState("all");
  const [venue, setVenue] = useState("all");
  const [round, setRound] = useState("all");

  const dates = useMemo(() => unique(matches.map((m) => m.date).filter(Boolean)), []);
  const venues = useMemo(() => unique(matches.map((m) => m.venue).filter(Boolean)), []);
  const times = useMemo(() => unique(matches.map((m) => m.time).filter(Boolean)), []);
  const rounds = useMemo(
    () => unique(matches.map((m) => m.round).filter(Boolean)).sort((a, b) => roundOrder.indexOf(a) - roundOrder.indexOf(b)),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return matches.filter((m) => {
      const haystack = `${m.match} ${m.date} ${m.time} ${m.venue} ${m.city} ${m.round} ${m.id}`.toLowerCase();
      return (
        (!q || haystack.includes(q)) &&
        (date === "all" || m.date === date) &&
        (time === "all" || m.time === time) &&
        (venue === "all" || m.venue === venue) &&
        (round === "all" || m.round === round)
      );
    });
  }, [query, date, time, venue, round]);

  const clear = () => {
    setQuery("");
    setDate("all");
    setTime("all");
    setVenue("all");
    setRound("all");
  };

  const activeCount = [query, date, time, venue, round].filter((v) => v && v !== "all" && v !== "").length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white shadow-2xl">
          <div className="p-5 sm:p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Static 2026 World Cup schedule
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Match schedule for iPhone</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Scroll, search, and filter by match, date, time, or stadium. This is a static webpage, so it works cleanly on mobile and does not need an app install.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1.4fr,repeat(4,minmax(0,1fr))]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search team, stadium, city, date, or time"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
              />
            </label>

            <select value={date} onChange={(e) => setDate(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:bg-white">
              <option value="all">All dates</option>
              {dates.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <select value={time} onChange={(e) => setTime(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:bg-white">
              <option value="all">All times</option>
              {times.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <select value={venue} onChange={(e) => setVenue(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:bg-white">
              <option value="all">All stadiums</option>
              {venues.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>

            <select value={round} onChange={(e) => setRound(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:bg-white lg:col-start-2">
              <option value="all">All rounds</option>
              {rounds.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="text-sm text-slate-500">{activeCount} active filter{activeCount === 1 ? "" : "s"}</div>
            <button onClick={clear} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              <X className="h-4 w-4" /> Clear filters
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => <MatchCard key={item.id} item={item} />)}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No matches found for the current filters.
          </div>
        )}
      </section>
    </main>
  );
}
