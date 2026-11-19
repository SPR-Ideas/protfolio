import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Community from "@/components/Community";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Agentic, Certifications, Contact, Footer, Homelab, Journey, Patterns, RecognitionEducation, Skills } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <Patterns />
        <Agentic />
        <Journey />
        <Skills />
        <Homelab />
        <Community />
        <Certifications />
        <RecognitionEducation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
