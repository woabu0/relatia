import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import WorkflowSection from "../components/sections/WorkflowSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CTASection from "../components/sections/CTASection";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-slate-900 min-h-screen">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute -bottom-32 left-10 h-88 w-88 rounded-full bg-blue-400/20 blur-[120px]" />
      </div>

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
