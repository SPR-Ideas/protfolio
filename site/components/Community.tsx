"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { community, gallery, identity } from "@/lib/content";
import { Icon, Reveal, SectionHead } from "./ui";

export default function Community() {
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb((i) => (i === null ? i : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft") setLb((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lb]);

  return (
    <section id="community" className="section bg-surface/50">
      <div className="wrap">
        <SectionHead eyebrow="Community & leadership" title={community.role} lead={`${community.span} · ${community.text}`} />

        <Reveal>
          <a href={identity.azureUserGroup} target="_blank" rel="noopener noreferrer" className="card group mb-5 flex items-center gap-5 p-4 transition-all hover:-translate-y-1 hover:border-accent sm:p-5">
            <Image src="/community/azure-ug.png" alt="Coimbatore Azure User Group logo" width={96} height={96} className="h-20 w-20 shrink-0 rounded-2xl shadow-md transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105 sm:h-24 sm:w-24" />
            <span className="min-w-0 flex-1">
              <b className="block text-lg leading-snug">Azure User Group Coimbatore</b>
              <span className="text-sm text-muted">Follow the community, meetups and updates on LinkedIn</span>
            </span>
            <span className="hidden items-center gap-1.5 text-sm font-medium text-brand sm:inline-flex">
              Visit page <Icon name="ext" className="h-4 w-4" />
            </span>
          </a>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["200+", "community members"],
            ["5+", "events organized"],
            ["40+", "engineers mentored"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 80} className="card p-6 text-center">
              <div className="text-4xl font-bold text-brand">{n}</div>
              <div className="mt-1 text-sm text-muted">{l}</div>
            </Reveal>
          ))}
        </div>

        {/* Gallery */}
        <h3 className="eyebrow mb-4 mt-14">Moments</h3>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((g, i) => (
            <li key={g.src} className={i === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}>
              <Reveal delay={i * 70} className="h-full">
                <button type="button" onClick={() => setLb(i)} className="group relative block h-full min-h-44 w-full overflow-hidden rounded-2xl border border-line text-left" aria-label={`Open photo: ${g.caption}`}>
                  <div className={`relative w-full ${i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full md:min-h-96" : "aspect-[4/3]"}`}>
                    <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-xs font-medium text-white">{g.caption}</span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Events + talks */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <h3 className="eyebrow mb-5">Events I&apos;ve been part of</h3>
            <ol className="space-y-3">
              {community.events.map((e, i) => (
                <li key={e.name + e.date}>
                  <Reveal delay={i * 60} className="card flex gap-4 p-4">
                    <span className="w-20 shrink-0 font-mono text-xs text-accent-ink">{e.date}</span>
                    <span>
                      <b className="block leading-snug">{e.name}</b>
                      <span className="text-sm text-muted">{e.role}</span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0">
            <h3 className="eyebrow mb-5">Talks</h3>
            <ul className="space-y-3">
              {community.talks.map((t, i) => (
                <li key={t.title}>
                  <Reveal delay={i * 80} className="card p-5">
                    <p className="font-mono text-xs text-accent-ink">{t.date}</p>
                    <b className="mt-1 block leading-snug">{t.title}</b>
                    <p className="text-sm text-muted">{t.event}</p>
                    {t.href ? (
                      <a href={t.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">
                        {t.kind} <Icon name="ext" className="h-4 w-4" />
                      </a>
                    ) : (
                      <p className="mt-3 text-xs text-muted">
                        {t.kind} link: <span className="rounded-md border border-dashed border-line px-1.5 py-0.5 font-mono text-[11px]">[TO ADD]</span>
                      </p>
                    )}
                  </Reveal>
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mb-4 mt-10">Mentoring & enablement</h3>
            <ul className="space-y-2.5">
              {community.mentoring.map((m) => (
                <li key={m} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {m}
                </li>
              ))}
            </ul>
            <Reveal className="mt-5 overflow-x-auto pb-2">
              <ol className="flex w-max items-center gap-1.5" aria-label="Graduate academy curriculum">
                {community.academy.map((a, i) => (
                  <li key={a} className="flex items-center gap-1.5">
                    <span className="chip whitespace-nowrap">{a}</span>
                    {i < community.academy.length - 1 && <span className="text-accent">→</span>}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>

      {lb !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4" onClick={() => setLb(null)}>
          <button type="button" aria-label="Close" onClick={() => setLb(null)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <Icon name="close" />
          </button>
          <figure className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={gallery[lb].src} alt={gallery[lb].alt} fill sizes="100vw" className="object-contain" priority />
            <figcaption className="absolute inset-x-0 -bottom-9 text-center text-sm text-white/85">{gallery[lb].caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
