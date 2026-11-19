import Image from "next/image";
import { about, identity } from "@/lib/content";
import { Icon, Reveal, SectionHead } from "./ui";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHead eyebrow="About" title="Platforms that people and AI can rely on" />
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative mx-auto w-full max-w-xs lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <Image src="/photos/headshot.jpg" alt="Pradeep Ragul S smiling" fill sizes="(max-width: 1024px) 70vw, 380px" className="object-cover" />
            </div>
            <a href={identity.azureUserGroup} target="_blank" rel="noopener noreferrer" className="card absolute -bottom-5 -right-2 flex items-center gap-3 px-4 py-3 shadow-xl transition-transform hover:-translate-y-1 sm:-right-6">
              <Image src="/community/azure-ug.png" alt="" width={40} height={40} className="h-10 w-10 rounded-lg" />
              <span className="text-sm leading-tight">
                <b className="block">Azure User Group</b>
                <span className="text-muted">Coimbatore · co-organizer</span>
              </span>
            </a>
          </Reveal>
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {about.cards.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={i * 70} className="card group h-full p-5 transition-all hover:-translate-y-1.5 hover:border-accent">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-surface2 text-brand transition-colors group-hover:bg-accent group-hover:text-[#04141a]">
                  <Icon name={c.icon} />
                </span>
                <h3 className="font-semibold leading-snug">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
