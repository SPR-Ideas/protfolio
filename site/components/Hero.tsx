import Portrait from "./Portrait";
import { identity, stats, tickerTech } from "@/lib/content";
import { Counter, Icon, Reveal } from "./ui";

// Deterministic node layout for the background network.
const nodes = [
  [60, 80], [180, 40], [300, 110], [430, 60], [560, 130], [690, 70], [820, 120], [940, 50],
  [100, 230], [240, 200], [370, 260], [500, 220], [640, 280], [770, 230], [900, 270],
  [40, 380], [170, 350], [320, 400], [470, 360], [610, 410], [750, 370], [880, 400],
];
const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [0, 8], [1, 9], [2, 9], [2, 10], [3, 11], [4, 11], [4, 12], [5, 13], [6, 13], [6, 14], [7, 14],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [8, 15], [8, 16], [9, 16], [10, 17], [11, 18], [12, 19], [13, 20], [14, 21], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21],
];

const chips = [
  { t: "Terraform", style: "left-[-4%] top-[8%]", d: "0s" },
  { t: "Azure", style: "right-[-4%] top-[6%]", d: "1.2s" },
  { t: "AWS", style: "left-[-6%] bottom-[24%]", d: "2.1s" },
  { t: "Kubernetes", style: "right-[-8%] bottom-[28%]", d: "0.6s" },
  { t: "AI Foundry · MCP", style: "left-[2%] top-[40%]", d: "1.7s" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-[520px] w-full opacity-30 md:opacity-60" viewBox="0 0 980 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--line)" strokeWidth="1.2" />
        ))}
        {edges.filter((_, i) => i % 4 === 0).map(([a, b], i) => (
          <line key={`f${i}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--accent)" strokeWidth="1.6" className="flow" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            {i % 3 === 0 && <circle cx={x} cy={y} r="5" fill="var(--accent)" className="pulse-ring" style={{ "--pd": `${(i % 7) * 0.35}s` } as React.CSSProperties} />}
            <circle cx={x} cy={y} r="3.5" fill="var(--surface)" stroke="var(--brand)" strokeWidth="1.6" />
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "var(--glow)" }} aria-hidden="true" />

      <div className="wrap relative grid items-center gap-12 pb-16 md:grid-cols-[1.15fr_0.85fr] md:pb-24">
        <div>
          <Reveal>
            <p className="eyebrow mb-4 inline-flex items-center gap-2">
              <span className="blink inline-block h-2 w-2 rounded-full bg-accent" /> Open to Senior DevOps · Cloud · AI Platform roles
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-[clamp(2.4rem,7vw,4.6rem)] font-bold leading-[1.02] tracking-tight">{identity.name}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg font-medium text-brand md:text-xl">{identity.headline}</p>
            <p className="mt-1 font-mono text-sm text-accent-ink">{identity.tagline}</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{identity.intro}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted">
              <Icon name="pin" className="h-4 w-4" /> {identity.location}
            </p>
          </Reveal>
          <Reveal delay={320} className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={`mailto:${identity.email}`}>
              <Icon name="mail" className="h-5 w-5" /> Get in touch
            </a>
            <a className="btn btn-ghost" href="#work">
              View my work <Icon name="down" className="h-5 w-5" />
            </a>
            <a className="btn btn-ghost" href={identity.resume} target="_blank" rel="noopener noreferrer">
              <Icon name="doc" className="h-5 w-5" /> Résumé
            </a>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-sm">
          <div className="relative">
            <Portrait priority />
            <div className="card absolute inset-x-6 -bottom-4 flex items-center justify-between gap-3 border-line/80 bg-surface/80 px-4 py-3 shadow-xl backdrop-blur-md">
              <span className="leading-tight">
                <b className="block text-sm">Pradeep Ragul S</b>
                <span className="text-xs text-muted">Senior Engineer · Presidio</span>
              </span>
              <span className="blink h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            </div>
            {chips.map((c) => (
              <span key={c.t} className={`float absolute ${c.style} rounded-full border border-line bg-surface/95 px-3 py-1.5 font-mono text-xs shadow-lg backdrop-blur`} style={{ "--fd": c.d } as React.CSSProperties}>
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {c.t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="wrap relative pb-16">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <li key={i}>
              <Reveal delay={i * 60} className="card h-full p-5 transition-transform hover:-translate-y-1">
                <div className="text-3xl font-bold tracking-tight text-brand md:text-4xl">
                  {"text" in s ? s.text : <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />}
                </div>
                <div className="mt-2 text-sm leading-snug text-muted">{s.label}</div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative overflow-hidden border-y border-line bg-surface/60 py-4" aria-hidden="true">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-mono text-sm text-muted">
          {[...tickerTech, ...tickerTech].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t} <span className="text-accent">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
