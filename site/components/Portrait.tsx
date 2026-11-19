import Image from "next/image";

/** Cut-out portrait on a glowing disc with orbiting rings. Colour photo in light mode, black-and-white in dark mode. */
export default function Portrait({ sizes = "(max-width: 768px) 80vw, 380px", priority = false }: { sizes?: string; priority?: boolean }) {
  const mask = "linear-gradient(to bottom, #000 82%, transparent 100%)";
  const common = "object-contain object-bottom drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]";
  return (
    <div className="relative aspect-[4/5] w-full">
      <div className="absolute left-1/2 top-[22%] aspect-square w-[118%] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "var(--glow)" }} aria-hidden="true" />
      <div className="absolute bottom-[5%] left-1/2 aspect-square w-[92%] -translate-x-1/2" aria-hidden="true">
        <div className="spin-slow absolute -inset-4 rounded-full border border-dashed border-line" />
        <div className="spin-rev absolute -inset-7 rounded-full border border-line">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
          <span className="absolute bottom-[14%] right-[6%] h-1.5 w-1.5 rounded-full bg-brand" />
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-full border border-line" style={{ background: "radial-gradient(circle at 50% 32%, color-mix(in srgb, var(--accent) 42%, var(--surface)) 0%, color-mix(in srgb, var(--brand) 55%, var(--surface)) 62%, var(--surface2) 100%)" }}>
          <div className="spin-slow absolute inset-0 opacity-40" style={{ background: "conic-gradient(from 0deg, transparent 0 70%, var(--accent) 88%, transparent 100%)" }} />
          <div className="absolute inset-[7%] rounded-full border border-white/20" />
          <div className="absolute inset-[16%] rounded-full border border-dashed border-white/15" />
        </div>
      </div>
      <Image src="/photos/cutout-color.png" alt="Portrait of Pradeep Ragul S" fill priority={priority} sizes={sizes} className={`only-light ${common}`} style={{ WebkitMaskImage: mask, maskImage: mask }} />
      <Image src="/photos/cutout-dark.png" alt="" fill priority={priority} sizes={sizes} className={`only-dark ${common}`} style={{ WebkitMaskImage: mask, maskImage: mask }} />
    </div>
  );
}
