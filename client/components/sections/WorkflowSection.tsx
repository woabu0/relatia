import { ArrowUpRight, ShieldCheck } from "lucide-react";

const workflow = [
  {
    title: "Convert",
    description:
      "Capture inbound leads, score them instantly, and personalize introductions across channels.",
  },
  {
    title: "Collaborate",
    description:
      "Hand-off seamlessly between sales, success, and support with shared visibility into context and intent.",
  },
  {
    title: "Care",
    description:
      "Reduce churn with proactive playbooks, health alerts, and AI-powered service desk routing.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="relative py-24 bg-slate-900">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              Orchestrate the customer journey
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Relatia gives every team member context before they need to ask
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Replace blind hand-offs with living timelines. Relatia stitches
              together CRM, playbooks, support tickets, and success health
              indicators—so every interaction is grounded in reality.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {workflow.map((stage, index) => (
                <div
                  key={stage.title}
                  className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 transition hover:border-blue-500 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-blue-300">
              <ShieldCheck className="h-6 w-6" />
              <p className="text-sm font-medium">
                SOC2 Type II, GDPR compliant, and enterprise-ready SSO.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel rounded-[32px] border border-slate-700 p-6 shadow-xl">
              <div className="grid gap-4">
                {[
                  {
                    title: "Morning Brief",
                    detail: "8 priority renewals flagged overnight",
                    accent: "text-blue-400",
                  },
                  {
                    title: "Slack feedback → Ticket",
                    detail: "Auto-created issue for Dashboard latency",
                    accent: "text-blue-400",
                  },
                  {
                    title: "Playbook Trigger",
                    detail: "Champion left company reached step 4",
                    accent: "text-blue-400",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-slate-700 bg-slate-800 p-5 transition hover:border-blue-500 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">
                        {card.title}
                      </p>
                      <span className={`text-xs font-medium ${card.accent}`}>
                        Live Sync
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      {card.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-800 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Forecast pulse
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-white">
                      112% to target
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                    <ArrowUpRight className="h-4 w-4" />
                    +18% vs last quarter
                  </div>
                </div>
                <div className="mt-4 h-32 w-full rounded-2xl bg-linear-to-r from-blue-500/30 via-blue-400/20 to-sky-400/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

