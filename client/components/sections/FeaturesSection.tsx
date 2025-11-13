import { ArrowRight, BarChart3, MessageCircle, Workflow } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Unified Growth Dashboard",
    description:
      "See revenue, pipeline, customer health, and support pulse in a single real-time control center.",
  },
  {
    icon: Workflow,
    title: "Automated Playbooks",
    description:
      "Trigger next-best actions with AI-assisted follow-ups, smart routing, and ready-to-launch workflows.",
  },
  {
    icon: MessageCircle,
    title: "Human Moments at Scale",
    description:
      "Capture every conversation, feedback loop, and multi-channel touchpoint in one timeline.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative border-y border-slate-700/60 bg-slate-900 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Designed for modern relationship teams
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Everything your GTM, success, and support teams need to move in sync
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
          Relatia connects every customer signal—emails, calls, deals,
          feedback loops, service tickets—into a single canvas. Spend less
          time piecing data together and more time creating impact.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-3xl border border-slate-700 bg-slate-800 p-8 text-left transition duration-500 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="inline-flex rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3 text-blue-400 transition group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition group-hover:translate-x-1">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

