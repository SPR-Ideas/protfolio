import { certs, contact, education, homelab, identity, recognition, skills, timeline } from "@/lib/content";
import Image from "next/image";
import { AgenticDiagram, BodmDiagram, FailoverDiagram, HomelabDiagram } from "./Diagrams";
import { Icon, Placeholder, Reveal, SectionHead } from "./ui";

export function Patterns() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow="Patterns in motion" title="How the work actually flows" lead="Two of the designs behind the case studies, simplified. Watch the artifact travel, then break a region." />
        <div className="grid gap-6">
          <Reveal><BodmDiagram /></Reveal>
          <Reveal><FailoverDiagram /></Reveal>
        </div>
      </div>
    </section>
  );
}

export function Agentic() {
  return (
    <section id="agentic" className="section bg-surface/50">
      <div className="wrap">
        <SectionHead eyebrow="Designed architecture" title="One question, four specialist agents" lead="The incident workflow I designed for an agentic infrastructure operations platform. Step through it or let it play." />
        <Reveal><AgenticDiagram /></Reveal>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Career journey" title="Four steps in under four years" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal className="mb-6">
              <h3 className="text-xl font-semibold">{timeline.employer}</h3>
              <p className="text-sm text-muted">{timeline.span}</p>
            </Reveal>
            <Reveal>
            <ol className="relative ml-3 space-y-8 pl-8">
              <div className="draw-line absolute bottom-2 left-0 top-2 w-0.5 bg-gradient-to-b from-accent to-brand" aria-hidden="true" />
              {timeline.roles.map((r, i) => (
                <li key={r.date} className="relative">
                  <Reveal delay={i * 120}>
                    <span className="absolute -left-[2.45rem] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-accent bg-bg">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <p className="font-mono text-xs text-accent-ink">{r.date}</p>
                    <p className="text-lg font-semibold">{r.title}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
            </Reveal>
          </div>
          <div>
            <Reveal className="mb-6">
              <h3 className="text-xl font-semibold">Supporting milestones</h3>
              <p className="text-sm text-muted">Certifications and community</p>
            </Reveal>
            <ul className="space-y-3">
              {timeline.milestones.map((m, i) => (
                <li key={m.text}>
                  <Reveal delay={i * 80} className="card flex items-start gap-4 p-4 transition-all hover:translate-x-1 hover:border-accent">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface2 text-brand">
                      <Icon name={m.kind === "cert" ? "badge" : "people"} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-xs text-accent-ink">{m.date}</span>
                      <span className="text-sm leading-snug">{m.text}</span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section bg-surface/50">
      <div className="wrap">
        <SectionHead eyebrow="Skills" title="Tools I reach for" lead="Grouped by area, no percentages. Each engagement means a new stack, so range matters more than a score." />
        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((g, i) => (
            <Reveal key={g.cat} delay={(i % 2) * 80} className={`card p-6 ${g.items.length > 14 ? "md:col-span-2" : ""}`}>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <span className="h-2 w-2 rounded-full bg-accent" /> {g.cat}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Homelab() {
  return (
    <section id="homelab" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Personal project" title="Kubernetes / GitOps homelab" lead={homelab.status} />
        <div className="grid gap-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <ul className="space-y-3">
              {homelab.points.map((p, i) => (
                <li key={p}>
                  <Reveal delay={i * 70} className="flex gap-3 text-muted">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent-ink" />
                    <span className="leading-relaxed">{p}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal>
              <h3 className="eyebrow mb-2">Next on the roadmap</h3>
              <div className="flex flex-wrap gap-1.5">
                {homelab.next.map((n) => (
                  <span key={n} className="chip border-dashed">{n}</span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {homelab.stack.map((n) => (
                  <span key={n} className="chip">{n}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal><HomelabDiagram /></Reveal>
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certs" className="section bg-surface/50">
      <div className="wrap">
        <SectionHead eyebrow="Certifications" title="Five credentials" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => (
            <li key={c.code}>
              <Reveal delay={i * 70} className="card group relative h-full overflow-hidden p-5 transition-all hover:-translate-y-1.5 hover:border-accent">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 transition-transform group-hover:scale-150" aria-hidden="true" />
                <div className="relative flex items-center gap-4">
                  <span className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-white p-2 shadow-md ring-1 ring-black/5 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                    <Image src={c.img} alt={c.alt} width={180} height={180} className="h-full w-full object-contain" />
                  </span>
                  <div>
                    <p className="font-mono text-xs text-accent-ink">{c.code} · {c.year}</p>
                    <h3 className="mt-1 font-semibold leading-snug">{c.name}</h3>
                    <p className="mt-3 text-xs text-muted">Verify: <Placeholder /></p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RecognitionEducation() {
  return (
    <section className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <SectionHead eyebrow="Recognition" title="Along the way" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {recognition.map((r, i) => (
              <li key={r.title}>
                <Reveal delay={i * 60} className="card flex h-full gap-3 p-4">
                  <span className="mt-0.5 text-accent">★</span>
                  <span>
                    <b className="block leading-snug">{r.title}</b>
                    <span className="text-sm text-muted">{r.meta}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHead eyebrow="Education" title="Where it started" />
          <Reveal className="card p-6">
            <p className="font-semibold leading-snug">{education.degree}</p>
            <p className="mt-2 text-sm text-muted">{education.school}</p>
            <p className="mt-1 text-sm text-muted">{education.extra}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const links = [
    { icon: "mail", label: "Email", sub: identity.email, href: `mailto:${identity.email}` },
    { icon: "linkedin", label: "LinkedIn", sub: "pradeep-ragul-s", href: identity.linkedin },
    { icon: "github", label: "GitHub", sub: "SPR-Ideas", href: identity.github },
    { icon: "doc", label: "Résumé", sub: "View PDF", href: identity.resume },
    { icon: "phone", label: "Phone", sub: identity.phone, href: `tel:${identity.phoneHref}` },
  ];
  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="wrap relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Contact</p>
          <h2 className="h2">{contact.heading}</h2>
          <p className="mt-5 leading-relaxed text-muted">{contact.body}</p>
          <a href={`mailto:${identity.email}`} className="btn btn-primary mt-8">
            <Icon name="mail" className="h-5 w-5" /> Say hello
          </a>
        </Reveal>
        <ul className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l, i) => (
            <li key={l.label}>
              <Reveal delay={i * 60}>
                <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="card flex items-center gap-4 p-4 transition-all hover:-translate-y-1 hover:border-accent">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface2 text-brand">
                    <Icon name={l.icon} />
                  </span>
                  <span className="min-w-0">
                    <b className="block">{l.label}</b>
                    <span className="block truncate text-sm text-muted">{l.sub}</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-center text-sm text-muted">
      <div className="wrap">
        <p>© 2026 {identity.name} · {identity.tagline}</p>
        <p className="mt-1">{identity.location}</p>
      </div>
    </footer>
  );
}
