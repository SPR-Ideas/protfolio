"use client";

import { useEffect, useState } from "react";
import { Icon } from "./ui";

const links = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Journey", "#journey"],
  ["Skills", "#skills"],
  ["Community", "#community"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const read = () => {
      const t = document.documentElement.getAttribute("data-theme");
      setDark(t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
    };
    read();
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(!dark);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"}`}>
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand font-mono text-xs text-on-brand">PR</span>
          <span className="hidden sm:inline">Pradeep Ragul S</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-fg">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-fg">
            <Icon name={dark ? "sun" : "moon"} className="h-5 w-5" />
          </button>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface md:hidden">
            <Icon name={open ? "close" : "down"} className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="wrap grid gap-1 pb-4 md:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-muted hover:bg-surface hover:text-fg">
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
