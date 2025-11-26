import { ArrowRight } from "lucide-react";
import { FEATURES } from "../../lib/constants";

export default function Features() {
  return (
    <section id="features" className="relative border-y border-slate-700/60 bg-slate-900 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Designed for modern relationship teams
        </p>
        <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-4">
          Everything your GTM, success, and support teams need to move in sync
        </h2>
        <p className="mx-auto mt-4 md:mt-6 max-w-3xl text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed px-4">
          Relatia connects every customer signal—emails, calls, deals,
          feedback loops, service tickets—into a single canvas. Spend less
          time piecing data together and more time creating impact.
        </p>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map(({ icon: Icon, title, description, color, iconColor }) => (
            <div
              key={title}
              className="group rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 p-6 md:p-8 text-left transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className={`inline-flex rounded-2xl border border-blue-500/30 bg-gradient-to-br ${color} p-3 ${iconColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <Icon className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <h3 className="mt-6 text-lg md:text-xl lg:text-2xl font-bold text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-300">
                {description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-300">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
