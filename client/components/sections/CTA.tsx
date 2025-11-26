import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Full access to all features",
  "Cancel anytime",
];

export default function CTA() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/15 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-[40px] border border-slate-700/50 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-800/80 p-8 md:p-12 lg:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-blue-300 mb-6">
              <Sparkles className="h-4 w-4" />
              Start your journey today
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to build relationships that go beyond transactions?
            </h2>
            <p className="mx-auto mt-4 md:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
              Join the teams using Relatia to orchestrate their entire customer
              lifecycle. Transform how you connect, engage, and grow with your customers.
            </p>

            <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-700/50 border border-slate-600/50 px-4 py-2 text-xs sm:text-sm text-slate-300"
                >
                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>

            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-500/40 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105"
              >
                Try Relatia now
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600/50 bg-slate-700/50 backdrop-blur-sm px-7 py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-700/70 hover:scale-105"
              >
                View live demo
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

