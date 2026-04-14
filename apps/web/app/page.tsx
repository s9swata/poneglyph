"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ArrowLeft, Users, FileText, BarChart3, Brain, MapPin, Upload, Cpu, TrendingUp, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, HBarChart, LineChart, DonutChart,
  SparkStat, Heatmap, ProgressRing, StackedBar,
  ChartCard, ScatterPlot, MiniStat, Sparkline,
} from "@/components/charts";
import { Highlight, HeroTag, SectionHeader, ActivityItem, DarkBanner } from "@/components/cards";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

// Synthetic data generators
const COLORS = ["#22242A", "#bfff00", "#25C5FA", "#37955B", "#B3BDBD", "#E5E6E6"];

function SearchResults({ query, results = [] }: { query: string; results?: any[] }) {
  
  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <div className="text-left mb-6">
        <h3 className="text-xl font-medium text-black">
          Results for &quot;<span className="text-primary">{query}</span>&quot;
        </h3>
        <p className="text-sm text-grey-1 mt-1">Based on aggregated data from 156,000+ records</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((result, i) => (
          <div key={i} className="p-6 bg-grey-4 rounded-xl border border-grey-3">
            <p className="text-sm font-medium text-grey-1 mb-4">{result.title}</p>
            
            {/* Simple bar visualization */}
            {result.type === "bar" && (
              <div className="space-y-3">
                {result.data.map((item: any, j: number) => {
                  const values = result.data.map((d: any) => typeof d.value === 'number' ? d.value : 0);
                  const maxValue = Math.max(...values);
                  const width = maxValue > 0 ? ((typeof item.value === 'number' ? item.value : 0) / maxValue) * 100 : 0;
                  return (
                    <div key={j} className="flex items-center gap-3">
                      <span className="text-xs text-grey-1 w-24 truncate">{item.name}</span>
                      <div className="flex-1 h-6 bg-grey-3 rounded overflow-hidden">
                        <div 
                          className="h-full rounded" 
                          style={{ width: `${width}%`, backgroundColor: item.color || COLORS[j % COLORS.length] }}
                        />
                      </div>
                      <span className="text-xs font-medium text-black w-16 text-right">
                        {typeof item.value === 'number' && item.value > 1000 
                          ? `${(item.value / 1000).toFixed(1)}k` 
                          : `${item.value}%`}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Simple line/area visualization */}
            {result.type === "area" && (
              <div className="flex items-end justify-between h-40 gap-1">
                {result.data.map((item: any, j: number) => {
                  const values = result.data.map((d: any) => typeof d.value === 'number' ? d.value : 0);
                  const maxValue = Math.max(...values);
                  const height = maxValue > 0 ? ((typeof item.value === 'number' ? item.value : 0) / maxValue) * 100 : 0;
                  return (
                    <div key={j} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-primary rounded-t min-h-[4px]"
                        style={{ height: `${Math.max(height, 5)}%` }}
                      />
                      <span className="text-[10px] text-grey-1 mt-2 truncate w-full text-center">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Simple donut visualization */}
            {result.type === "donut" && (
              <div className="flex items-center justify-center h-40">
                <div className="relative w-32 h-32 rounded-full border-8 flex items-center justify-center" style={{ 
                  borderColor: result.data[0]?.color || COLORS[0],
                  borderLeftColor: result.data[1]?.color || COLORS[1],
                  borderRightColor: result.data[2]?.color || COLORS[2],
                  borderBottomColor: result.data[3]?.color || COLORS[3],
                }}>
                  <div className="text-center">
                    <span className="text-lg font-medium text-black">{typeof result.data[0]?.value === 'number' ? result.data[0].value : 0}</span>
                    <span className="text-xs text-grey-1">%</span>
                  </div>
                </div>
                <div className="ml-6 space-y-2">
                  {result.data.map((item: any, j: number) => (
                    <div key={j} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || COLORS[j] }} />
                      <span className="text-grey-1">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-grey-2">
          Data is synthetic for demonstration purposes. Connect to API for real data.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: Hero — Resource Allocation Dashboard
───────────────────────────────────────────────── */
function HeroDashboard() {
  const monthly = [
    { label: "Jan", values: [42, 28] },
    { label: "Feb", values: [55, 32] },
    { label: "Mar", values: [48, 38] },
    { label: "Apr", values: [70, 45] },
    { label: "May", values: [63, 52] },
    { label: "Jun", values: [81, 60] },
    { label: "Jul", values: [74, 55] },
    { label: "Aug", values: [90, 68] },
    { label: "Sep", values: [88, 72] },
    { label: "Oct", values: [102, 84] },
    { label: "Nov", values: [97, 79] },
    { label: "Dec", values: [118, 95] },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto border border-grey-3 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Dashboard top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-grey-3 bg-grey-4/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] font-medium text-grey-1 ml-2">Poneglyph — Global Crime Overview</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-grey-2 bg-primary/20 px-2 py-0.5 rounded-full">Live</span>
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-4 divide-x divide-grey-3 border-b border-grey-3">
        {[
          { label: "Dataset Records", value: "112,847", delta: "+12%", up: true, spark: [40,55,48,70,63,81,74,90,88,102,97,118] },
          { label: "AI Insights Published", value: "15,134", delta: "+8%", up: true, spark: [20,25,22,30,28,35,32,40,38,45,43,50] },
          { label: "NGOs Contributing", value: "4,600", delta: "+24%", up: true, spark: [30,38,35,50,47,58,54,66,62,75,70,85] },
          { label: "Campaigns Deployed", value: "8,490", delta: "+31%", up: true, spark: [100,140,120,180,160,210,190,240,230,280,260,310] },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-1 p-4">
            <div className="flex items-end justify-between">
              <p className="text-xl font-semibold text-black leading-none">{s.value}</p>
              <Sparkline values={s.spark} color="primary" width={60} height={28} />
            </div>
            <p className={`text-[10px] font-medium ${s.up ? "text-success" : "text-error"}`}>
              {s.up ? "↑" : "↓"} {s.delta} this month
            </p>
            <p className="text-[10px] text-grey-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-black">Resource Allocation Over Time</p>
            <p className="text-[11px] text-grey-1">Task Force Funds vs. Intelligence operations logged</p>
          </div>
          <div className="flex gap-3">
            {[
              { label: "Funds ($k)", color: "#22242A" },
              { label: "Intel Ops", color: "#E3FF8F" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-grey-1">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
        <BarChart
          data={monthly}
          colors={["black", "primary"]}
          height={160}
          unit="k"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: Analytics Tabs UI (replaces Feature Tabs)
───────────────────────────────────────────────── */
function AnalyticsTabsUI() {
  const impactByRegion: import("@/components/charts").HBarDatum[] = [
    { label: "South Asia", value: 87, color: "black" },
    { label: "Sub-Saharan Africa", value: 74, color: "primary" },
    { label: "Latin America", value: 61, color: "blue" },
    { label: "Southeast Asia", value: 53, color: "success" },
    { label: "MENA", value: 42, color: "grey" },
  ];

  const volunteerTrend: import("@/components/charts").LineSeries[] = [
    {
      label: "New Cases",
      color: "primary",
      filled: true,
      values: [120, 145, 132, 168, 155, 192, 178, 215, 204, 248, 236, 280],
    },
    {
      label: "Resolved",
      color: "black",
      filled: false,
      values: [100, 118, 108, 140, 128, 162, 150, 185, 174, 212, 200, 245],
    },
  ];

  const aiInsights: import("@/components/charts").DonutSegment[] = [
    { label: "Trafficking Networks", value: 34, color: "black" },
    { label: "Child Exploitation", value: 28, color: "primary" },
    { label: "Forced Labor", value: 18, color: "error" },
    { label: "Organized Crime", value: 20, color: "success" },
  ];

  return (
    <div className="w-full border border-grey-3 rounded-2xl overflow-hidden bg-white">
      {/* 3 chart panels */}
      <div className="grid grid-cols-3 divide-x divide-grey-3 border-b border-grey-3">
        {/* Panel 1: Impact by region */}
        <div className="p-5">
          <HBarChart
            data={impactByRegion}
            title="Impact by Region"
            unit="%"
          />
        </div>
        {/* Panel 2: Volunteer trends */}
        <div className="p-5">
          <LineChart
            series={volunteerTrend}
            xLabels={["J","F","M","A","M","J","J","A","S","O","N","D"]}
            height={160}
            title="Cases Tracked vs Resolved"
            showLegend={true}
          />
        </div>
        {/* Panel 3: AI insights donut */}
        <div className="p-5 flex flex-col items-center justify-center">
          <DonutChart
            segments={aiInsights}
            size={140}
            centerLabel="8.5k"
            centerSub="insights"
            title="AI Insight Categories"
            showLegend={true}
          />
        </div>
      </div>

      {/* Bottom 3 labels */}
      <div className="grid grid-cols-3 divide-x divide-grey-3">
        {[
          { title: "Victim Mapping", badge: "AI", desc: "See exploitation hotzones, route tracking, and demographic vulnerabilities globally." },
          { title: "Incident Trends", desc: "Track crime volume, seasonal variations, and cross-border reporting patterns." },
          { title: "AI Threat Engine", desc: "Sub-agents process disparate reports and generate structured, actionable statistics." },
        ].map((f) => (
          <div key={f.title} className="p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-medium text-black">{f.title}</p>
              {f.badge && (
                <span className="text-[9px] font-medium bg-primary text-black px-1.5 py-0.5 rounded-full">{f.badge}</span>
              )}
            </div>
            <p className="text-[11px] text-grey-1 leading-relaxed">{f.desc}</p>
            <button className="text-[11px] font-medium text-black flex items-center gap-1 mt-1">
              Learn more <ArrowRight size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: Live Feed + Empowering Charts
───────────────────────────────────────────────── */
const feedItems = [
  { user: "UNODC Data", action: "uploaded global statistics report", avatarColor: "bg-black" },
  { user: "AI Agent", action: "extracted 847 insights from", target: "UNODC dataset", avatarColor: "bg-primary", textBlack: true },
  { user: "Polaris Project", action: "submitted fresh hotline datasets", avatarColor: "bg-[#25C5FA]" },
  { user: "AI Agent", action: "matched 12 cross-border data points to", target: "Europol DB", avatarColor: "bg-primary", textBlack: true },
  { user: "Research Bot", action: "generated longitudinal trend report", avatarColor: "bg-success" },
  { user: "A21 Campaign", action: "uploaded field recovery data", avatarColor: "bg-[#f4a261]" },
  { user: "Campaign Agent", action: "launched data monitor in", target: "Region 4", avatarColor: "bg-error" },
  { user: "NCMEC", action: "contributed child welfare dataset", avatarColor: "bg-black" },
];

function LiveFeedPanel() {
  return (
    <div className="bg-white border border-grey-3 rounded-2xl overflow-hidden h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-grey-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-black">Live Activity Feed</span>
        </div>
        <span className="text-[10px] text-grey-2 bg-grey-4 px-2 py-0.5 rounded-full">Real-time</span>
      </div>
      <div className="flex flex-col divide-y divide-grey-3/50">
        {feedItems.map((a, i) => (
          <ActivityItem
            key={i}
            user={a.user}
            action={a.action}
            target={a.target}
            avatarColor={a.avatarColor}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: Impact Heatmap + Roles (replaces accordion)
───────────────────────────────────────────────── */
function ImpactHeatmap() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const regions = ["Asia","Africa","LatAm","MENA","Europe","NAm"];
  // Simulated activity intensity 0–1
  const data = [
    [0.3,0.5,0.4,0.7,0.6,0.8,0.7,0.9,0.8,1.0,0.9,1.0],
    [0.2,0.4,0.6,0.5,0.7,0.6,0.8,0.7,0.9,0.8,1.0,0.9],
    [0.1,0.3,0.2,0.4,0.5,0.7,0.6,0.5,0.7,0.6,0.8,0.9],
    [0.4,0.3,0.5,0.4,0.6,0.5,0.7,0.6,0.5,0.7,0.6,0.8],
    [0.1,0.2,0.1,0.3,0.2,0.4,0.3,0.5,0.4,0.3,0.5,0.6],
    [0.2,0.1,0.3,0.2,0.1,0.3,0.2,0.4,0.3,0.2,0.4,0.5],
  ];

  return (
    <ChartCard title="Incident Heatmap" subtitle="Reported exploitation by region × month">
      <Heatmap
        data={data}
        rowLabels={regions}
        colLabels={months}
        color="primary"
      />
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[9px] text-grey-2">Low</span>
        <div className="flex gap-px">
          {[0.15, 0.3, 0.5, 0.7, 0.85, 1].map((v) => (
            <div key={v} className="w-4 h-2.5 rounded-sm bg-primary" style={{ opacity: 0.2 + v * 0.8 }} />
          ))}
        </div>
        <span className="text-[9px] text-grey-2">High</span>
      </div>
    </ChartCard>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: "Make Actionable Decisions" → AI Analysis
───────────────────────────────────────────────── */
function AiAnalysisViz() {
  const scatter: import("@/components/charts").ScatterPoint[] = [
    { x: 20, y: 65, label: "Interpol", color: "primary", size: 8 },
    { x: 45, y: 80, label: "UNODC", color: "black", size: 10 },
    { x: 70, y: 55, label: "Europol", color: "blue", size: 7 },
    { x: 30, y: 40, label: "Polaris", color: "success", size: 9 },
    { x: 85, y: 70, label: "IJM", color: "primary", size: 6 },
    { x: 55, y: 90, label: "A21", color: "error", size: 8 },
    { x: 15, y: 30, label: "NCMEC", color: "grey", size: 6 },
    { x: 90, y: 45, label: "ECPAT", color: "blue", size: 7 },
    { x: 60, y: 75, label: "Walk Free", color: "success", size: 5 },
    { x: 40, y: 60, label: "Hope", color: "primary", size: 6 },
  ];

  const resourceSplit: import("@/components/charts").StackedSegment[] = [
    { label: "Task Forces", value: 38, color: "black" },
    { label: "Victim Support", value: 27, color: "primary" },
    { label: "Legal Aid", value: 18, color: "blue" },
    { label: "Border Intel", value: 12, color: "success" },
    { label: "Other", value: 5, color: "grey" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
      <ChartCard title="Rescue Operations vs. Intel Gathered" subtitle="Bubble = operation scale">
        <ScatterPlot
          points={scatter}
          height={200}
          xLabel="Intel Gathered →"
          yLabel="Rescues ↑"
        />
      </ChartCard>

      <div className="flex flex-col gap-4">
        <ChartCard title="Intervention Category Split" subtitle="Current resource deployment">
          <StackedBar segments={resourceSplit} height={14} showLabels={true} />
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { label: "Efficiency", value: 82, color: "primary" as const },
              { label: "Coverage", value: 67, color: "blue" as const },
              { label: "Speed", value: 91, color: "success" as const },
            ].map((r) => (
              <ProgressRing key={r.label} value={r.value} color={r.color} label={r.label} size={72} />
            ))}
          </div>
        </ChartCard>

        <ChartCard title="AI Processing Queue" subtitle="Sub-agent task throughput">
          <LineChart
            series={[
              { label: "Tasks Queued", color: "grey", values: [40,55,48,60,52,70,65,80,72,88,80,95], filled: false },
              { label: "Tasks Completed", color: "success", filled: true, values: [38,53,46,58,50,68,63,78,70,86,78,93] },
            ]}
            xLabels={["J","F","M","A","M","J","J","A","S","O","N","D"]}
            height={120}
            showLegend={true}
          />
        </ChartCard>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: Payroll → "Poneglyph by the Numbers"
───────────────────────────────────────────────── */
function ByTheNumbers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Threat Detection */}
      <ChartCard title="Threat Detection Accuracy" subtitle="Pattern matching alignment">
        <DonutChart
          segments={[
            { label: "High Threat", value: 62, color: "primary" },
            { label: "Medium", value: 24, color: "black" },
            { label: "Suspicious", value: 10, color: "grey" },
            { label: "False Positive", value: 4, color: "error" },
          ]}
          size={140}
          centerLabel="96%"
          centerSub="accurate"
          showLegend={true}
        />
      </ChartCard>

      {/* Card 2: Data pipeline */}
      <ChartCard title="Intel Report Pipeline" subtitle="Volume processed by AI agents">
        <BarChart
          data={[
            { label: "W1", values: [120, 95] },
            { label: "W2", values: [145, 118] },
            { label: "W3", values: [132, 108] },
            { label: "W4", values: [168, 140] },
            { label: "W5", values: [155, 128] },
            { label: "W6", values: [192, 162] },
            { label: "W7", values: [178, 150] },
            { label: "W8", values: [215, 185] },
          ]}
          colors={["black", "primary"]}
          height={140}
          showLegend={true}
          legendLabels={["Uploaded", "Processed"]}
        />
      </ChartCard>

      {/* Card 3: Regional coverage */}
      <ChartCard title="High-Risk Hotspots" subtitle="% of global incidents mapped">
        <div className="flex flex-col gap-3 flex-1">
          <HBarChart
            data={[
              { label: "South Asia", value: 91, color: "primary" },
              { label: "Sub-Saharan Africa", value: 78, color: "black" },
              { label: "Latin America", value: 65, color: "blue" },
              { label: "Southeast Asia", value: 58, color: "success" },
              { label: "MENA", value: 44, color: "grey" },
              { label: "Europe", value: 32, color: "grey" },
            ]}
            unit="%"
            showValues={true}
          />
        </div>
      </ChartCard>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: Intelligence Reports / Articles Carousel
───────────────────────────────────────────────── */
function IntelligenceReports() {
  const [index, setIndex] = useState(0);
  const articles = [
    {
      title: "Global Human Trafficking Trends 2025",
      desc: "Cross-border exploitation routes have shifted dramatically toward digital recruiting methods. Tracking indicates a massive surge in online coercion.",
      chartType: "bar",
      data: [
        { label: "Transit", values: [45] },
        { label: "Digital", values: [85] },
        { label: "Smuggling", values: [30] },
      ],
      linkText: "Read intelligence brief"
    },
    {
      title: "Child Exploitation Statistics",
      desc: "A 40% rise in online predation incidents reported by global task forces this quarter. Heatmap data shows coordinated network activity.",
      chartType: "line",
      data: [
        { label: "Incidents", color: "error", filled: true, values: [30, 45, 60, 50, 70, 85] }
      ],
      linkText: "View incident report"
    },
    {
      title: "Forced Labor by Sub-sector",
      desc: "Intelligence audits revealed deep exploitation in electronics manufacturing and agriculture supply chains.",
      chartType: "donut",
      data: [
        { label: "Agriculture", value: 40, color: "success" },
        { label: "Tech", value: 35, color: "black" },
        { label: "Textiles", value: 25, color: "primary" }
      ],
      linkText: "Access supply-chain data"
    },
    {
      title: "Organized Crime Funds Tracking",
      desc: "Following the illicit financial flows generated by multi-national trafficking rings, task forces seized assets linked to shadow shell companies.",
      chartType: "bar",
      data: [
        { label: "Laundered", values: [80] },
        { label: "Seized", values: [20] }
      ],
      linkText: "Analyze financial flows"
    }
  ];

  const nextSlide = () => setIndex((prev) => (prev + 1) % articles.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + articles.length) % articles.length);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      <div className="relative w-[90vw] md:w-[60vw] max-w-[800px] h-[380px] md:h-[320px]" style={{ perspective: 1200 }}>
        <AnimatePresence initial={false}>
          {articles.map((article, i) => {
            const offset = (i - index + articles.length) % articles.length;
            const isVisible = offset <= 2;
            
            return (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, x: 100, z: -200, rotateY: -20 }}
                animate={{
                  opacity: isVisible ? 1 - offset * 0.15 : 0,
                  x: isVisible ? offset * 60 : 120,
                  y: 0,
                  z: isVisible ? offset * -120 : -240,
                  rotateY: isVisible ? offset * -8 : -15,
                  scale: 1,
                  zIndex: articles.length - offset,
                  pointerEvents: offset === 0 ? "auto" : "none"
                }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.1, stiffness: 100 }}
                className="absolute inset-0 border border-grey-3 rounded-2xl bg-white overflow-hidden flex flex-col md:flex-row shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)]"
                style={{ originX: 0, originY: 0.5, transformStyle: "preserve-3d" }}
              >
                <div className="p-8 flex-1 flex flex-col gap-3 items-center justify-center border-b md:border-b-0 md:border-r border-grey-3 bg-grey-4/30 md:w-1/2">
                  {article.chartType === "bar" && (
                    <div className="w-full">
                      <BarChart data={article.data as import("@/components/charts").BarDatum[]} height={180} colors={["primary"]} />
                    </div>
                  )}
                  {article.chartType === "line" && (
                    <div className="w-full">
                      <LineChart series={article.data as import("@/components/charts").LineSeries[]} xLabels={["Q1","Q2","Q3","Q4","Q5","Q6"]} height={180} />
                    </div>
                  )}
                  {article.chartType === "donut" && (
                    <DonutChart segments={article.data as import("@/components/charts").DonutSegment[]} size={160} />
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col gap-4 justify-center md:w-1/2 bg-white">
                  <h3 className="text-[20px] md:text-[24px] font-medium text-black leading-snug">{article.title}</h3>
                  <p className="text-[14px] md:text-[15px] text-grey-1 line-clamp-3 leading-relaxed">{article.desc}</p>
                  <a href="#" className="mt-2 flex items-center gap-1.5 text-sm font-medium text-black hover:text-grey-1 transition-colors">
                    {article.linkText} <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border border-grey-3 flex items-center justify-center hover:bg-grey-4 transition-colors text-black"
          aria-label="Previous report"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border border-grey-3 flex items-center justify-center hover:bg-grey-4 transition-colors text-black"
          aria-label="Next report"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────────────── */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  
  // Clear results when search query is empty
  const showResults = hasSearched && searchQuery.trim().length > 0;
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`http://localhost:3001/api/query?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchData(data.charts || []);
    } catch (err) {
      console.error(err);
      setSearchData([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleClearSearch = () => {
    setSearchQuery("");
    setHasSearched(false);
  };
  
  return (
    <>
      <Navigation />
      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 dots-pattern pointer-events-none" aria-hidden />
        <div className="container-max pt-24 pb-12 flex flex-col items-center gap-8 text-center relative z-10">
          <HeroTag label="New" text="Agentic research now live — try it at /research" />
          <h1 className="text-[clamp(44px,7vw,80px)] font-medium leading-[1.05em] tracking-[-0.03em] text-black">
            The world's humanitarian
            <br />
            <Highlight>data commons</Highlight>
          </h1>
          <p className="text-body-lg text-grey-1 max-w-md">
            NGOs upload field data. AI extracts insights. Researchers, journalists, and task forces access them — free, open, and actionable.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-xl">
            <div className="flex items-center gap-2 bg-white border border-grey-3 rounded-xl p-2 shadow-sm focus-within:border-grey-2 transition-colors">
              <Search size={20} className="text-grey-2 shrink-0 ml-1" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for data (e.g., 'crimes by region', 'exploitation types')..."
                className="flex-1 text-base bg-transparent outline-none text-black placeholder:text-grey-2"
              />
              <button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSearching ? <Loader2 size={14} className="animate-spin" /> : "Search"}
              </button>
            </div>
          </form>
          
          {/* Search Results */}
          {showResults && !isSearching && (
            <div className="w-full">
              <SearchResults query={searchQuery} results={searchData} />
              <button
                onClick={handleClearSearch}
                className="mt-6 text-sm text-grey-1 hover:text-black underline"
              >
                Clear search
              </button>
            </div>
          )}
          
          {/* Original CTA buttons (hidden when showing results) */}
          {!showResults && (
            <div className="flex items-center gap-3">
              <Link href="/research" className="px-5 py-2.5 border border-grey-3 text-black text-sm font-medium rounded-xl hover:bg-grey-4 transition-colors">
                View insights
              </Link>
              <Link href="/contact" className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-black/80 transition-colors">
                Submit your dataset <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
        {!showResults && (
          <div className="container-max pb-24 relative z-10">
            <HeroDashboard />
          </div>
        )}
      </section>

      {/* ══ LATEST STATISTICS ══ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-max flex flex-col gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-tight tracking-tight text-black">
              Latest Statistics
            </h2>
            <p className="text-body text-grey-1 max-w-lg">
              Explore dynamic articles and statistics on global exploitation, organized crime, and human trafficking networks.
            </p>
          </div>
          <div className="-mx-4 px-4 lg:mx-0 lg:px-0">
            <IntelligenceReports />
          </div>
        </div>
      </section>

      {/* ══ LOGO TICKER ══ */}
      <section className="py-8 border-y border-grey-3 bg-white">
        <p className="text-center text-xs text-grey-1 mb-6">Trusted by 134 NGOs across 6 regions</p>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[
              "Interpol","Europol","UNODC","Polaris","A21","IJM","NCMEC","Hope for Justice",
              "Interpol","Europol","UNODC","Polaris","A21","IJM","NCMEC","Hope for Justice",
            ].map((name, i) => (
              <div key={i} className="flex items-center gap-2 px-10 text-sm font-medium text-grey-1 whitespace-nowrap">
                <div className="w-4 h-4 border border-grey-3 rounded" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EVERYTHING IN ONE PLATFORM ══ */}
      <section className="py-24 bg-white">
        <div className="container-max flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12S8 26.627 8 20z" stroke="#B3BDBD" strokeWidth="1.5"/>
              <path d="M14 20h12M20 14v12" stroke="#B3BDBD" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h2 className="text-[clamp(32px,5vw,52px)] font-medium leading-tight tracking-tight text-black">
              All humanitarian data,
              <br />
              one open <Highlight>platform</Highlight>
            </h2>
            <Link href="/contact" className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-black/80 transition-colors">
              Request access <ArrowRight size={14} />
            </Link>
          </div>
          <AnalyticsTabsUI />
        </div>
      </section>

      {/* ══ LIVE FEED + EMPOWERING ══ */}
      <section className="py-24 bg-white">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Lime panel with live feed */}
          <div className="bg-primary rounded-2xl p-6">
            <LiveFeedPanel />
          </div>

          {/* Right: heading + 4 spark stats */}
          <div className="flex flex-col gap-8 lg:pt-4">
            <div className="flex flex-col gap-3">
              <p className="text-sub font-medium uppercase tracking-widest text-grey-1">real-time processing</p>
              <h2 className="text-[clamp(28px,4vw,42px)] font-medium leading-tight tracking-tight text-black">
                Empowering your data pipeline
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SparkStat value="2,847" label="Field contributors" sparkValues={[40,55,48,70,63,81,74,90,88,102,97,118]} sparkColor="primary" delta="12% vs last month" deltaUp={true} />
              <SparkStat value="8,490" label="AI insights generated" sparkValues={[100,140,120,180,160,210,190,240,230,280,260,310]} sparkColor="black" delta="31% vs last month" deltaUp={true} />
              <SparkStat value="134" label="Contributing NGOs" sparkValues={[20,25,22,30,28,35,32,40,38,45,43,50]} sparkColor="blue" delta="8% vs last month" deltaUp={true} />
              <SparkStat value="98.2%" label="Data processing accuracy" sparkValues={[95,96,95,97,96,98,97,99,98,99,98,99]} sparkColor="success" delta="0.4pts improvement" deltaUp={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ HEATMAP + 4 ICONS ══ */}
      <section className="py-24 bg-white">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: eyebrow + heading + 4 icon cards */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <p className="text-sub font-medium uppercase tracking-widest text-grey-1">insight at every level</p>
              <h2 className="text-[clamp(28px,4vw,42px)] font-medium leading-tight tracking-tight text-black">
                Turning data into<br />real-world impact
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Upload, title: "Incident data uploads", desc: "Agents submit intel reports, operational data, and resource usage securely." },
                { icon: Cpu, title: "AI threat processing", desc: "Sub-agents classify, correlate, and analyze cross-border data within minutes." },
                { icon: BarChart3, title: "Trend tracking", desc: "Task forces receive structured statistics and operational recommendations." },
                { icon: Brain, title: "Predictive modeling", desc: "AI predicts vulnerabilities based on historical trafficking and crime data." },
              ].map((f) => (
                <div key={f.title} className="flex flex-col gap-2">
                  <f.icon size={20} className="text-grey-1" />
                  <p className="text-sm font-medium text-black">{f.title}</p>
                  <p className="text-xs text-grey-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Heatmap */}
          <ImpactHeatmap />
        </div>
      </section>

      {/* ══ LESS PAPERWORK → LESS FRICTION ══ */}
      <section className="py-24 bg-white">
        <div className="container-max flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(32px,5vw,60px)] font-medium leading-tight tracking-tight text-black">
             Submit once. The world
            <br />
            accesses <Highlight>forever</Highlight>
          </h2>
          <p className="text-body text-grey-1 max-w-md">
            We connect seamlessly with the trusted databases your teams already use.
          </p>
          <Link href="/solutions" className="flex items-center gap-1.5 text-sm font-medium text-black border border-grey-3 rounded-full px-4 py-2 hover:bg-grey-4 transition-colors">
            See all integrations <ArrowRight size={14} />
          </Link>

          {/* Mini stat row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-grey-3 rounded-2xl overflow-hidden w-full mt-4">
            {[
              { label: "Avg. time-to-insight", value: "4 min", change: "3× faster than manual", up: true },
              { label: "Data accuracy", value: "98.2%", change: "+0.4pts this quarter", up: true },
              { label: "Task force efficiency", value: "87%", change: "+11% YoY", up: true },
              { label: "NGO CSAT score", value: "72", change: "Industry avg: 41", up: true },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 p-6 bg-white">
                <MiniStat label={s.label} value={s.value} change={s.change} up={s.up} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAKE ACTIONABLE DECISIONS ══ */}
      <section className="py-24 bg-white">
        <div className="container-max flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 30 Q20 10 30 20" stroke="#22242A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M26 16l4 4-4 4" stroke="#22242A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <h2 className="text-[clamp(28px,4vw,52px)] font-medium leading-tight tracking-tight text-black">
              Turn raw field data into
              <br />
              <Highlight>published intelligence</Highlight>
            </h2>
            <p className="text-body text-grey-1 max-w-md">
               Our AI agents turn raw intel uploads into structured insights — so task forces can act, not just report.
            </p>
          </div>
          <AiAnalysisViz />
          <Link href="/contact" className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-black/80 transition-colors">
            See a live demo <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ══ BY THE NUMBERS ══ */}
      <section className="py-24 bg-white">
        <div className="container-max flex flex-col gap-10">
          <h2 className="text-[clamp(28px,4vw,44px)] font-medium leading-tight tracking-tight text-black max-w-sm">
            Poneglyph by the numbers
          </h2>
          <ByTheNumbers />
        </div>
      </section>

      {/* ══ CTA BANNER (LIGHT) ══ */}
      <section className="py-24 bg-white">
        <div className="container-max flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-sub font-medium uppercase tracking-widest text-grey-1">Deploy Interventions</p>
          </div>
          <h2 className="text-[clamp(40px,6vw,72px)] font-medium leading-tight tracking-tight text-black">
            Join the global data network.
          </h2>
          <div className="flex items-center gap-6 text-sm text-grey-1">
            {["Open dataset access","AI-generated insights","Agentic research terminal"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#22242A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t}
              </span>
            ))}
          </div>
          <Link href="/contact" className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-black/80 transition-colors">
            Contribute your data <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
