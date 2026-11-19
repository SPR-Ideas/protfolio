"use client";

import { useState } from "react";
import { caseStudies, smallProject, type CaseStatus } from "@/lib/content";
import { Icon, Reveal, SectionHead } from "./ui";

const statusStyle: Record<CaseStatus, string> = {
  implemented: "border-[color:var(--ok)] text-[color:var(--ok)]",
  designed: "border-[color:var(--warn)] text-[color:var(--warn)]",
  poc: "border-line text-muted",
  lab: "border-line text-muted",
};

function Status({ s, label }: { s: CaseStatus; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyle[s]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export default function CaseStudies() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="work" className="section bg-surface/50">
      <div className="wrap">
        <SectionHead
          eyebrow="Featured work"
          title="Case studies"
          lead="Every client is anonymized by sector. Each card carries its own status, so designs are never passed off as production systems."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((c, i) => {
            const isOpen = open === c.id;
            const panel = `cs-${c.id}`;
            return (
              <Reveal key={c.id} delay={(i % 2) * 80} className={isOpen ? "md:col-span-2" : ""}>
                <article
                  onClick={() => {
                    if (window.getSelection()?.toString()) return;
                    setOpen(isOpen ? null : c.id);
                  }}
                  className={`card relative cursor-pointer overflow-hidden transition-all duration-300 ${isOpen ? "border-accent shadow-xl" : "hover:-translate-y-1 hover:border-accent/60"}`}>
                  <div className="pointer-events-none absolute right-4 top-2 select-none font-mono text-6xl font-bold text-line">{c.n}</div>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    className="relative block w-full p-6 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Status s={c.status} label={c.statusLabel} />
                    </div>
                    <h3 className="mt-4 pr-12 text-xl font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {c.sector} · {c.dates}
                    </p>
                    <p className="mt-3 leading-relaxed">{c.headline}</p>
                    {c.metrics && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {c.metrics.map((m) => (
                          <li key={m} className="rounded-lg bg-surface2 px-2.5 py-1 text-xs font-medium text-brand">
                            {m}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink">
                      {isOpen ? "Hide details" : "Read the case study"}
                      <Icon name="down" className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>

                  <div id={panel} className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <div className="grid gap-8 border-t border-line p-6 md:grid-cols-2" inert={!isOpen}>
                        <div className="space-y-6">
                          <div className="text-sm text-muted">
                            <b className="text-fg">Role:</b> {c.role}
                          </div>
                          {c.challenge && (
                            <div>
                              <h4 className="eyebrow mb-2">Challenge</h4>
                              <p className="leading-relaxed text-muted">{c.challenge}</p>
                            </div>
                          )}
                          {c.outcome && (
                            <div>
                              <h4 className="eyebrow mb-2">Outcome</h4>
                              <ul className="space-y-2">
                                {c.outcome.map((o) => (
                                  <li key={o} className="flex gap-2 text-sm leading-relaxed">
                                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
                                    {o}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h4 className="eyebrow mb-2">What I did</h4>
                            <ul className="space-y-2.5">
                              {c.did.map((d) => (
                                <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {c.note && <p className="rounded-lg border border-dashed border-line p-3 text-sm text-muted">{c.note}</p>}
                          <div>
                            <h4 className="eyebrow mb-2">Tech stack</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {c.stack.map((t) => (
                                <span key={t} className="chip">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="card mt-5 flex flex-col gap-3 p-6 md:flex-row md:items-center md:gap-8">
          <div className="md:w-1/3">
            <Status s="poc" label={smallProject.status} />
            <h3 className="mt-3 font-semibold">{smallProject.title}</h3>
            <p className="text-sm text-muted">{smallProject.dates}</p>
          </div>
          <div className="md:w-2/3">
            <p className="text-sm leading-relaxed text-muted">{smallProject.text}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {smallProject.stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
