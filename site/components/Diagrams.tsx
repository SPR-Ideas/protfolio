"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";

/** Cycles 0..n-1 while playing and on screen. Starts paused for users who prefer reduced motion. */
function useCycle(n: number, ms: number) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (reduce) setPlaying(false);
        setVisible(e.isIntersecting);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const id = setInterval(() => setStep((s) => (s + 1) % n), ms);
    return () => clearInterval(id);
  }, [playing, visible, n, ms]);

  return { step, setStep, playing, setPlaying, ref };
}

function PlayToggle({ playing, onClick }: { playing: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={playing ? "Pause animation" : "Play animation"} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-muted hover:text-fg">
      <Icon name={playing ? "pause" : "play"} className="h-3.5 w-3.5" /> {playing ? "Pause" : "Play"}
    </button>
  );
}

function Frame({ title, note, children, controls }: { title: string; note: string; children: React.ReactNode; controls?: React.ReactNode }) {
  return (
    <figure className="card min-w-0 p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-semibold">{title}</span>
        {controls}
      </figcaption>
      <div className="overflow-x-auto" tabIndex={0} role="group" aria-label={`${title} diagram (scrolls sideways on small screens)`}>
        <div className="min-w-[620px]">{children}</div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">{note}</p>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Build Once, Deploy Many                                           */
/* ------------------------------------------------------------------ */
export function BodmDiagram() {
  const { step, playing, setPlaying, ref } = useCycle(5, 1700);
  const envs = ["Dev", "Test", "UAT", "Prod"];
  const xs = [250, 410, 570, 730];
  const dotX = step === 0 ? 105 : xs[step - 1] + 60;
  return (
    <div ref={ref}>
      <Frame
        title="Build Once, Deploy Many"
        controls={<PlayToggle playing={playing} onClick={() => setPlaying(!playing)} />}
        note="One validated artifact is built once, passes the shared security and quality gates, then is promoted unchanged through every environment, so what runs in Prod is exactly what was tested."
      >
        <svg viewBox="0 0 900 250" role="img" aria-label="A single build passes security gates and is promoted through Dev, Test, UAT and Prod" className="h-auto w-full">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill="var(--accent)" />
            </marker>
          </defs>
          <rect x="20" y="70" width="170" height="90" rx="14" className={`dg-box ${step === 0 ? "dg-on" : ""}`} />
          <text x="105" y="108" textAnchor="middle" className="dg-text">Build once</text>
          <text x="105" y="128" textAnchor="middle" className="dg-sub">shared pipeline template</text>
          <text x="105" y="145" textAnchor="middle" className="dg-sub">one validated artifact</text>

          {["Snyk", "SonarQube", "Checkov", "42Crunch"].map((g, i) => (
            <g key={g}>
              <rect x={20 + (i % 2) * 88} y={180 + Math.floor(i / 2) * 28} width="82" height="22" rx="11" className="dg-box" />
              <text x={61 + (i % 2) * 88} y={195 + Math.floor(i / 2) * 28} textAnchor="middle" className="dg-sub">{g}</text>
            </g>
          ))}

          <path d="M190 115 H245" className="dg-flow flow" markerEnd="url(#arr)" />
          {envs.map((e, i) => (
            <g key={e}>
              <rect x={xs[i]} y="70" width="120" height="90" rx="14" className={`dg-box ${step === i + 1 ? "dg-on" : ""}`} />
              <text x={xs[i] + 60} y="108" textAnchor="middle" className="dg-text">{e}</text>
              <text x={xs[i] + 60} y="128" textAnchor="middle" className="dg-sub">{i === 3 ? "same artifact" : "promote"}</text>
              <text x={xs[i] + 60} y="145" textAnchor="middle" className="dg-sub">{i === 3 ? "no rebuild" : "no rebuild"}</text>
              {i < 3 && <path d={`M${xs[i] + 120} 115 H${xs[i + 1] - 5}`} className="dg-flow flow" markerEnd="url(#arr)" />}
            </g>
          ))}
          <g style={{ transform: `translateX(${dotX}px)`, transition: "transform 0.9s cubic-bezier(.4,0,.2,1)" }}>
            <circle cx="0" cy="55" r="9" className="dg-dot" />
            <circle cx="0" cy="55" r="9" className="dg-dot pulse-ring" />
            <text x="0" y="35" textAnchor="middle" className="dg-sub">artifact</text>
          </g>
          <text x="450" y="230" textAnchor="middle" className="dg-sub">GitFlow branching · configurable promotion paths · hotfix flows · self-service onboarding</text>
        </svg>
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Active-active multi-region                                        */
/* ------------------------------------------------------------------ */
export function FailoverDiagram() {
  const { step, setStep, playing, setPlaying, ref } = useCycle(3, 3200);
  const modes = ["Both regions healthy", "East US 2 down", "Central US down"];
  const aDown = step === 1;
  const bDown = step === 2;
  return (
    <div ref={ref}>
      <Frame
        title="Active-active multi-region"
        controls={
          <div className="flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Failure scenario" className="flex overflow-hidden rounded-lg border border-line text-xs">
              {modes.map((m, i) => (
                <button key={m} type="button" aria-pressed={step === i} onClick={() => { setStep(i); setPlaying(false); }} className={`px-2.5 py-1.5 ${step === i ? "bg-brand text-on-brand" : "bg-surface text-muted hover:text-fg"}`}>
                  {m}
                </button>
              ))}
            </div>
            <PlayToggle playing={playing} onClick={() => setPlaying(!playing)} />
          </div>
        }
        note="Illustrative design: Azure Front Door routes globally and fails over automatically between two regions, with database replication, all managed in Terraform. This is a design goal of near-zero downtime, not a measured uptime, RTO or RPO."
      >
        <svg viewBox="0 0 900 330" role="img" aria-label={`Front Door sends traffic to two Azure regions. Scenario: ${modes[step]}`} className="h-auto w-full">
          <defs>
            <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill="var(--accent)" />
            </marker>
          </defs>
          <rect x="20" y="125" width="110" height="80" rx="14" className="dg-box" />
          <text x="75" y="160" textAnchor="middle" className="dg-text">Users</text>
          <text x="75" y="180" textAnchor="middle" className="dg-sub">global traffic</text>

          <path d="M130 165 H250" className="dg-flow flow" markerEnd="url(#arr2)" />
          <rect x="255" y="115" width="190" height="100" rx="14" className="dg-box dg-on" />
          <text x="350" y="152" textAnchor="middle" className="dg-text">Azure Front Door</text>
          <text x="350" y="172" textAnchor="middle" className="dg-sub">global routing · automatic failover</text>
          <text x="350" y="190" textAnchor="middle" className="dg-sub">WAF · single controlled entry</text>

          <path d="M445 150 C 520 150, 520 70, 590 70" className={bDown ? "dg-flow flow" : aDown ? "dg-line" : "dg-flow flow"} markerEnd={aDown ? undefined : "url(#arr2)"} style={{ opacity: aDown ? 0.35 : 1, strokeWidth: bDown ? 4 : 2.5 }} />
          <path d="M445 180 C 520 180, 520 260, 590 260" className={aDown ? "dg-flow flow" : bDown ? "dg-line" : "dg-flow flow"} markerEnd={bDown ? undefined : "url(#arr2)"} style={{ opacity: bDown ? 0.35 : 1, strokeWidth: aDown ? 4 : 2.5 }} />

          {[{ y: 25, name: "East US 2", down: aDown }, { y: 215, name: "Central US", down: bDown }].map((r) => (
            <g key={r.name}>
              <rect x="595" y={r.y} width="285" height="90" rx="14" className={`dg-box ${r.down ? "dg-bad" : "dg-on"}`} />
              <text x="615" y={r.y + 30} className="dg-text">{r.name}</text>
              <text x="615" y={r.y + 50} className="dg-sub">App tier · private endpoints · private DNS</text>
              <text x="615" y={r.y + 68} className="dg-sub">PostgreSQL Flexible Server</text>
              <g transform={`translate(${845},${r.y + 24})`}>
                <circle r="8" fill={r.down ? "#ef4444" : "var(--ok)"} />
                {!r.down && <circle r="8" fill="var(--ok)" className="pulse-ring" />}
              </g>
              <text x="845" y={r.y + 56} textAnchor="middle" className="dg-sub">{r.down ? "down" : "serving"}</text>
            </g>
          ))}
          <path d="M737 115 V215" className="dg-flow flow-slow" style={{ opacity: aDown || bDown ? 0.3 : 1 }} />
          <text x="750" y="170" className="dg-sub">DB replication</text>
          <text x="450" y="318" textAnchor="middle" className="dg-sub" aria-live="polite">{aDown ? "East US 2 unavailable: 100% of traffic served from Central US" : bDown ? "Central US unavailable: 100% of traffic served from East US 2" : "Traffic shared across both regions"}</text>
        </svg>
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Agentic incident workflow (designed architecture)                 */
/* ------------------------------------------------------------------ */
const agenticSteps = [
  { t: "A user asks", d: "“Why is my application degraded?”", on: ["user", "u-o", "orch"] },
  { t: "Splunk agent", d: "Analyzes logs and alerts.", on: ["orch", "o-g", "g-splunk", "splunk"] },
  { t: "Azure agent", d: "Checks cloud resource health and diagnostics.", on: ["orch", "o-g", "g-azure", "azure"] },
  { t: "Terraform agent", d: "Looks for infrastructure drift.", on: ["orch", "o-g", "g-tf", "tf"] },
  { t: "Ansible agent", d: "Proposes an approved remediation runbook and runs it only after a human approves.", on: ["orch", "o-g", "g-ansible", "ansible", "approval"] },
  { t: "Master orchestrator", d: "Combines the findings, actions and status into one incident report.", on: ["orch", "o-r", "report"] },
];

export function AgenticDiagram() {
  const { step, setStep, playing, setPlaying, ref } = useCycle(6, 2600);
  const on = (id: string) => agenticSteps[step].on.includes(id);
  const box = (id: string) => `dg-box ${on(id) ? "dg-on" : ""}`;
  const ln = (id: string) => (on(id) ? "dg-flow flow" : "dg-line");
  const agents = [
    { id: "splunk", x: 40, t: "Splunk Cloud agent", s: "Logs & alerts", c: "g-splunk" },
    { id: "azure", x: 185, t: "Azure agent", s: "Health & diagnostics", c: "g-azure" },
    { id: "tf", x: 330, t: "Terraform agent", s: "Infrastructure drift", c: "g-tf" },
    { id: "ansible", x: 475, t: "Ansible agent", s: "Approved runbooks", c: "g-ansible" },
  ];
  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="eyebrow">Designed incident workflow</span>
          <PlayToggle playing={playing} onClick={() => setPlaying(!playing)} />
        </div>
        <ol className="space-y-2">
          {agenticSteps.map((s, i) => (
            <li key={s.t}>
              <button
                type="button"
                onClick={() => { setStep(i); setPlaying(false); }}
                aria-current={step === i ? "step" : undefined}
                className={`flex w-full gap-3 rounded-xl border p-3 text-left transition-all ${step === i ? "border-accent bg-surface shadow-lg" : "border-line bg-surface/50 hover:border-accent/50"}`}
              >
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-xs ${step === i ? "bg-accent text-[#04141a]" : "bg-surface2 text-muted"}`}>{i + 1}</span>
                <span>
                  <b className="block text-sm">{s.t}</b>
                  <span className="text-sm leading-snug text-muted">{s.d}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <Frame title="Agentic operations platform on Azure AI Foundry" note="Designed architecture. Not presented as running in production. Any production-impacting action requires human approval.">
        <svg viewBox="0 0 640 440" role="img" aria-label="Master orchestrator coordinating Splunk, Azure, Terraform and Ansible agents through an API Management MCP gateway, with human approval" className="h-auto w-full">
          <defs>
            <marker id="arr3" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill="var(--accent)" />
            </marker>
          </defs>
          <rect x="20" y="25" width="150" height="50" rx="12" className={box("user")} />
          <text x="95" y="55" textAnchor="middle" className="dg-text">User</text>
          <path d="M170 50 H245" className={ln("u-o")} markerEnd={on("u-o") ? "url(#arr3)" : undefined} />
          <rect x="250" y="15" width="170" height="70" rx="14" className={box("orch")} />
          <text x="335" y="46" textAnchor="middle" className="dg-text">Master orchestrator</text>
          <text x="335" y="65" textAnchor="middle" className="dg-sub">Azure AI Foundry</text>
          <path d="M420 50 H485" className={ln("o-r")} markerEnd={on("o-r") ? "url(#arr3)" : undefined} />
          <rect x="490" y="25" width="130" height="50" rx="12" className={box("report")} />
          <text x="555" y="55" textAnchor="middle" className="dg-text">Incident report</text>

          <path d="M335 85 V150" className={ln("o-g")} markerEnd={on("o-g") ? "url(#arr3)" : undefined} />
          <rect x="40" y="155" width="560" height="50" rx="12" className="dg-box" />
          <text x="320" y="177" textAnchor="middle" className="dg-text">Azure API Management · governed MCP / tool gateway</text>
          <text x="320" y="195" textAnchor="middle" className="dg-sub">authentication · RBAC · controlled tool execution</text>

          {agents.map((a) => (
            <g key={a.id}>
              <path d={`M${a.x + 62} 205 V265`} className={ln(a.c)} markerEnd={on(a.c) ? "url(#arr3)" : undefined} />
              <rect x={a.x} y="270" width="125" height="70" rx="12" className={box(a.id)} />
              <text x={a.x + 62} y="299" textAnchor="middle" className="dg-text" style={{ fontSize: 12 }}>{a.t}</text>
              <text x={a.x + 62} y="318" textAnchor="middle" className="dg-sub">{a.s}</text>
              <text x={a.x + 62} y="332" textAnchor="middle" className="dg-sub" style={{ opacity: 0.7 }}>via MCP</text>
            </g>
          ))}

          <path d="M537 340 V375" className={ln("approval")} markerEnd={on("approval") ? "url(#arr3)" : undefined} />
          <rect x="395" y="380" width="235" height="44" rx="12" className={box("approval")} style={on("approval") ? { stroke: "var(--warn)" } : undefined} />
          <text x="512" y="406" textAnchor="middle" className="dg-text" style={{ fontSize: 12 }}>Human approval for prod actions</text>
        </svg>
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Homelab stack                                                     */
/* ------------------------------------------------------------------ */
export function HomelabDiagram() {
  const { step, playing, setPlaying, ref } = useCycle(6, 1500);
  const items = [
    { x: 15, t: "Old laptop", s: "bare metal" },
    { x: 160, t: "Proxmox VE", s: "hypervisor" },
    { x: 305, t: "K3s", s: "single-node cluster" },
    { x: 450, t: "Argo CD", s: "GitOps sync" },
    { x: 595, t: "Traefik", s: "ingress" },
  ];
  return (
    <div ref={ref}>
      <Frame title="Homelab stack" controls={<PlayToggle playing={playing} onClick={() => setPlaying(!playing)} />} note="A single-node personal lab, not highly available.">
        <svg viewBox="0 0 900 270" role="img" aria-label="Old laptop running Proxmox, then K3s, Argo CD syncing from Git, Traefik ingress, self-hosted services, reachable over Tailscale" className="h-auto w-full">
          <defs>
            <marker id="arr4" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill="var(--accent)" />
            </marker>
          </defs>
          {items.map((it, i) => (
            <g key={it.t}>
              <rect x={it.x} y="95" width="125" height="70" rx="12" className={`dg-box ${step >= i && step <= 5 ? "dg-on" : ""}`} />
              <text x={it.x + 62} y="126" textAnchor="middle" className="dg-text">{it.t}</text>
              <text x={it.x + 62} y="146" textAnchor="middle" className="dg-sub">{it.s}</text>
              {i < 4 && <path d={`M${it.x + 125} 130 H${it.x + 143}`} className={step > i ? "dg-flow flow" : "dg-line"} markerEnd={step > i ? "url(#arr4)" : undefined} />}
            </g>
          ))}
          <path d="M720 130 H748" className={step >= 5 ? "dg-flow flow" : "dg-line"} markerEnd={step >= 5 ? "url(#arr4)" : undefined} />
          <rect x="752" y="70" width="135" height="120" rx="12" className={`dg-box ${step >= 5 ? "dg-on" : ""}`} />
          <text x="820" y="98" textAnchor="middle" className="dg-text">Services</text>
          {["Excalidraw", "Vaultwarden", "10+ self-hosted"].map((s, i) => (
            <g key={s}>
              <rect x="766" y={110 + i * 24} width="107" height="19" rx="9.5" className="dg-box" />
              <text x="820" y={123.500 + i * 24} textAnchor="middle" className="dg-sub">{s}</text>
            </g>
          ))}
          <rect x="450" y="10" width="125" height="46" rx="12" className={`dg-box ${step >= 3 ? "dg-on" : ""}`} />
          <text x="512" y="38" textAnchor="middle" className="dg-text">Git repo</text>
          <path d="M512 56 V92" className={step >= 3 ? "dg-flow flow" : "dg-line"} markerEnd={step >= 3 ? "url(#arr4)" : undefined} />
          <rect x="595" y="205" width="125" height="46" rx="12" className={`dg-box ${step >= 4 ? "dg-on" : ""}`} />
          <text x="657" y="233" textAnchor="middle" className="dg-text">Tailscale</text>
          <path d="M657 205 V168" className={step >= 4 ? "dg-flow flow" : "dg-line"} markerEnd={step >= 4 ? "url(#arr4)" : undefined} />
          <text x="740" y="233" className="dg-sub">secure remote access, anywhere</text>
          <text x="15" y="233" className="dg-sub">Next: persistent storage · backups · Prometheus + Grafana</text>
        </svg>
      </Frame>
    </div>
  );
}
