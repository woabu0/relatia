import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Users, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Pipeline Velocity", value: "3.4x faster" },
  { label: "Customer Retention", value: "92%" },
  { label: "Support Resolution", value: "14 hrs" },
];

export default function HeroSection() {
  return (
    <section className="relative pt-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 lg:grid-cols-[1.1fr,0.9fr] lg:pb-32">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/80 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
            <Sparkles className="h-4 w-4 text-blue-300" />
            Introducing Relatia CRM
          </div>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build loyal relationships with{" "}
            <span className="relative whitespace-nowrap">
              <span className="absolute inset-x-0 bottom-0 h-3 rounded-full bg-linear-to-r from-blue-400/50 via-blue-300/50 to-sky-300/50" />
              <span className="relative">signal-rich storytelling</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
            Relatia unifies pipeline, success, and support so your teams see
            the full customer journey. Close smarter, retain deeper, and ship
            memorable moments at every interaction.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/50 bg-white/10 backdrop-blur-sm px-5 py-3 text-base font-semibold text-white transition hover:border-blue-400 hover:bg-white/20"
            >
              Explore the platform
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="glass-panel flex flex-col rounded-2xl px-6 py-5 shadow-md transition duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-sm font-medium text-blue-300">
                  {item.label}
                </span>
                <span className="mt-2 text-2xl font-semibold text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="glass-panel animate-[pulse-glow_9s_ease-in-out_infinite] rounded-3xl border border-slate-300/30 p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-300">
                    Relationship Health
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    87 / 100
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300">
                  <Users className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { title: "Enterprise Onboarding", progress: 78, status: "On track", tone: "text-blue-300", bar: "bg-blue-500" },
                  { title: "Renewal Window", progress: 42, status: "Needs touchpoint", tone: "text-blue-400", bar: "bg-blue-400" },
                  { title: "Support Happiness", progress: 91, status: "Healthy", tone: "text-blue-300", bar: "bg-blue-500" },
                ].map((line) => (
                  <div key={line.title}>
                    <div className="flex items-center justify-between text-sm font-medium text-slate-200">
                      <span>{line.title}</span>
                      <span className={line.tone}>{line.status}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-700">
                      <div
                        className={`h-full rounded-full ${line.bar}`}
                        style={{ width: `${line.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-300/30 bg-white/5 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-10 w-10 rounded-xl bg-blue-500/20 p-2 text-blue-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Next best action
                    </p>
                    <p className="text-sm text-slate-300">
                      Schedule a renewal sync with Ava Johnson
                    </p>
                  </div>
                </div>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
                  Add to timeline
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

