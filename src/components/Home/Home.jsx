import { useState } from "react";
import {
  Zap, Download, Gauge, QrCode, FileText, Link2,
  Hash, Image, Clock, Calculator, Lock, Globe,
  ArrowRight, Sparkles, ChevronRight
} from "lucide-react";

const tools = [
  {
    id: 1,
    name: "Meter Token Reader",
    description: "Read and decode prepaid meter tokens instantly",
    icon: Gauge,
    path: "/meter-token-reader",
    color: "emerald",
    badge: "Popular",
  },
  {
    id: 2,
    name: "File Downloader",
    description: "Download files from any URL with ease",
    icon: Download,
    path: "/",
    color: "blue",
    badge: null,
  },
  {
    id: 3,
    name: "QR Code Generator",
    description: "Generate QR codes for links, text, and more",
    icon: QrCode,
    path: "/",
    color: "violet",
    badge: "New",
  },
  {
    id: 4,
    name: "Text Formatter",
    description: "Format, clean, and transform plain text",
    icon: FileText,
    path: "/",
    color: "amber",
    badge: null,
  },
  {
    id: 5,
    name: "URL Shortener",
    description: "Shorten long URLs into compact shareable links",
    icon: Link2,
    path: "/",
    color: "rose",
    badge: null,
  },
  {
    id: 6,
    name: "Hash Generator",
    description: "Generate MD5, SHA-256 and other hash types",
    icon: Hash,
    path: "/",
    color: "cyan",
    badge: null,
  },
  {
    id: 7,
    name: "Image Converter",
    description: "Convert images between PNG, JPG, WEBP formats",
    icon: Image,
    path: "/",
    color: "orange",
    badge: null,
  },
  {
    id: 8,
    name: "Unix Timestamp",
    description: "Convert timestamps to human-readable dates",
    icon: Clock,
    path: "/",
    color: "teal",
    badge: null,
  },
  {
    id: 9,
    name: "Unit Calculator",
    description: "Convert units across length, weight, temperature",
    icon: Calculator,
    path: "/",
    color: "indigo",
    badge: null,
  },
  {
    id: 10,
    name: "Password Generator",
    description: "Generate strong, secure random passwords",
    icon: Lock,
    path: "/",
    color: "pink",
    badge: "Popular",
  },
  {
    id: 11,
    name: "IP Lookup",
    description: "Find geolocation info for any IP address",
    icon: Globe,
    path: "/",
    color: "sky",
    badge: null,
  },
  {
    id: 12,
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings instantly",
    icon: Zap,
    path: "/",
    color: "lime",
    badge: null,
  },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    icon: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-200 dark:ring-emerald-800",
    hover: "hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    glow: "group-hover:shadow-emerald-200/60 dark:group-hover:shadow-emerald-900/60",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    icon: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-200 dark:ring-blue-800",
    hover: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    glow: "group-hover:shadow-blue-200/60 dark:group-hover:shadow-blue-900/60",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/40",
    icon: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-200 dark:ring-violet-800",
    hover: "hover:bg-violet-100 dark:hover:bg-violet-900/50",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
    glow: "group-hover:shadow-violet-200/60 dark:group-hover:shadow-violet-900/60",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    icon: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-200 dark:ring-amber-800",
    hover: "hover:bg-amber-100 dark:hover:bg-amber-900/50",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    glow: "group-hover:shadow-amber-200/60 dark:group-hover:shadow-amber-900/60",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    icon: "text-rose-600 dark:text-rose-400",
    ring: "ring-rose-200 dark:ring-rose-800",
    hover: "hover:bg-rose-100 dark:hover:bg-rose-900/50",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
    glow: "group-hover:shadow-rose-200/60 dark:group-hover:shadow-rose-900/60",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    icon: "text-cyan-600 dark:text-cyan-400",
    ring: "ring-cyan-200 dark:ring-cyan-800",
    hover: "hover:bg-cyan-100 dark:hover:bg-cyan-900/50",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    glow: "group-hover:shadow-cyan-200/60 dark:group-hover:shadow-cyan-900/60",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/40",
    icon: "text-orange-600 dark:text-orange-400",
    ring: "ring-orange-200 dark:ring-orange-800",
    hover: "hover:bg-orange-100 dark:hover:bg-orange-900/50",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    glow: "group-hover:shadow-orange-200/60 dark:group-hover:shadow-orange-900/60",
  },
  teal: {
    bg: "bg-teal-50 dark:bg-teal-950/40",
    icon: "text-teal-600 dark:text-teal-400",
    ring: "ring-teal-200 dark:ring-teal-800",
    hover: "hover:bg-teal-100 dark:hover:bg-teal-900/50",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
    glow: "group-hover:shadow-teal-200/60 dark:group-hover:shadow-teal-900/60",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    icon: "text-indigo-600 dark:text-indigo-400",
    ring: "ring-indigo-200 dark:ring-indigo-800",
    hover: "hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    glow: "group-hover:shadow-indigo-200/60 dark:group-hover:shadow-indigo-900/60",
  },
  pink: {
    bg: "bg-pink-50 dark:bg-pink-950/40",
    icon: "text-pink-600 dark:text-pink-400",
    ring: "ring-pink-200 dark:ring-pink-800",
    hover: "hover:bg-pink-100 dark:hover:bg-pink-900/50",
    badge: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    glow: "group-hover:shadow-pink-200/60 dark:group-hover:shadow-pink-900/60",
  },
  sky: {
    bg: "bg-sky-50 dark:bg-sky-950/40",
    icon: "text-sky-600 dark:text-sky-400",
    ring: "ring-sky-200 dark:ring-sky-800",
    hover: "hover:bg-sky-100 dark:hover:bg-sky-900/50",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
    glow: "group-hover:shadow-sky-200/60 dark:group-hover:shadow-sky-900/60",
  },
  lime: {
    bg: "bg-lime-50 dark:bg-lime-950/40",
    icon: "text-lime-600 dark:text-lime-400",
    ring: "ring-lime-200 dark:ring-lime-800",
    hover: "hover:bg-lime-100 dark:hover:bg-lime-900/50",
    badge: "bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300",
    glow: "group-hover:shadow-lime-200/60 dark:group-hover:shadow-lime-900/60",
  },
};

const ToolCard = ({ tool }) => {
  const [hovered, setHovered] = useState(false);
  const c = colorMap[tool.color];
  const Icon = tool.icon;

  return (
    <a
      href={tool.path}
      className={`
        group relative flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900 p-5
        transition-all duration-300 ease-out cursor-pointer
        hover:border-slate-300 dark:hover:border-slate-700
        hover:shadow-xl ${c.glow}
        hover:-translate-y-1
        no-underline
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tool.badge && (
        <span className={`absolute top-4 right-4 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full ${c.badge}`}>
          {tool.badge}
        </span>
      )}

      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ring-1 ${c.bg} ${c.ring} ${c.hover} transition-colors duration-200`}>
        <Icon size={20} className={c.icon} />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1 leading-snug">
          {tool.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-200 ${c.icon} ${hovered ? "translate-x-1" : ""}`}>
        Open tool
        <ChevronRight size={13} />
      </div>
    </a>
  );
};

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c0e14] font-sans antialiased">

      {/* Decorative BG blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-200/40 to-blue-200/20 dark:from-violet-900/20 dark:to-blue-900/10 blur-3xl" />
        <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-emerald-200/30 to-teal-200/20 dark:from-emerald-900/10 dark:to-teal-900/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">

        {/* ── HERO ── */}
        <div className="text-center mb-16">

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5 leading-[1.1]">
            Simple tools for
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              everyday tasks
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
            A handpicked set of lightweight utilities — no clutter, no accounts,
            just tools that work the moment you need them.
          </p>

          {/* Search bar */}
          <div className="relative max-w-sm mx-auto">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search tools…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
                bg-white dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                text-slate-900 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400/50
                transition-all duration-200
              "
            />
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
          {[
            { value: `${tools.length}+`, label: "Tools available" },
            { value: "100%", label: "Free forever" },
            { value: "0", label: "Signup needed" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                {s.value}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── TOOLS GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 dark:text-slate-500 text-sm">No tools found for "{search}"</p>
          </div>
        )}

        {/* ── FOOTER CTA ── */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <Zap size={15} className="text-amber-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              More tools coming soon —
            </span>
            <a
              href="/suggest"
              className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-0.5"
            >
              suggest one <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}