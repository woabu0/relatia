import { ShieldCheck, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { WORKFLOW_STEPS } from "../../lib/constants";

export default function Workflow() {
  return (
    <section id="workflow" className="relative py-16 md:py-24 lg:py-32 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 h-80 w-80 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">
            Orchestrate the customer journey
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto">
            Relatia gives every team member context before they need to ask
          </h2>
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Replace blind hand-offs with living timelines. Relatia stitches
            together CRM, playbooks, support tickets, and success health
            indicators—so every interaction is grounded in reality.
          </p>
        </div>

        {/* Workflow steps with connecting lines */}
        <div className="relative">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
            {WORKFLOW_STEPS.map((stage, index) => {
              const Icon = stage.icon;
              const isLast = index === WORKFLOW_STEPS.length - 1;
              
              return (
                <div key={stage.title} className="relative">
                  {/* Connecting arrow on desktop */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent z-0">
                      <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500/50" />
                    </div>
                  )}
                  
                  <div className="group relative rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 p-6 md:p-8 transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:scale-105">
                    {/* Step number badge */}
                    <div className="absolute -top-4 -left-4 flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-4 border-slate-900 shadow-lg z-10">
                      <span className="text-xl font-bold text-white">{index + 1}</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center pt-4">
                      {/* Icon container */}
                      <div className="flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 border-blue-500/30 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                        <Icon className="h-10 w-10 md:h-12 md:w-12 text-blue-400" />
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {stage.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-12 md:mt-16 flex items-center justify-center gap-3 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-blue-600/5 p-4 md:p-5 text-blue-300 backdrop-blur-sm max-w-2xl mx-auto">
          <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
          <p className="text-xs sm:text-sm md:text-base font-medium text-center">
            SOC2 Type II, GDPR compliant, and enterprise-ready SSO.
          </p>
        </div>
      </div>
    </section>
  );
}
