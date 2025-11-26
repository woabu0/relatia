import Navbar from "../components/sections/Navbar";
import Footer from "../components/sections/Footer";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Workflow from "../components/sections/Workflow";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-slate-900 min-h-screen">
      {/* Decorative orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 right-0 h-96 w-96 md:h-[500px] md:w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute -bottom-32 left-10 h-88 w-88 md:h-[400px] md:w-[400px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <Workflow />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
