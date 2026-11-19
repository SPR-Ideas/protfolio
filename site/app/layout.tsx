import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

const title = "Pradeep Ragul S | Senior DevOps, Cloud & AI Platform Engineer";
const description =
  "Senior Engineer building automated, secure and resilient cloud platforms on Azure and AWS, and taking GenAI from pilot to production. Co-organizer of Azure User Group Coimbatore.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", images: ["/photos/portrait.jpg"] },
  twitter: { card: "summary_large_image", title, description },
};

// Runs before paint: marks JS as available (for reveal animations) and applies a saved theme.
const boot = `try{document.documentElement.classList.add('js');var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
