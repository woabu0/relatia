"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Users,
  ShieldCheck,
  TrendingUp,
  Activity,
  Zap,
  BarChart3,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Play,
  CheckCircle2,
  Rocket,
} from "lucide-react";
import { STATS } from "../../lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden flex items-center h-screen">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-[float_20s_ease-in-out_infinite]" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-[float_25s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] animate-[float_15s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-6 md:py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4 lg:space-y-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-cyan-500/10 backdrop-blur-xl px-3 py-1.5 shadow-lg shadow-blue-500/10">
              <Sparkles className="h-3 w-3 text-blue-400" />
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Next-Gen CRM Platform
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
                <span className="block text-white">Transform Customer</span>
                <span className="block relative">
                  <span className="relative bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Relationships Into Growth
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full opacity-60 blur-sm" />
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Unify your entire customer journey—from first touch to lifetime
              value.
              <span className="text-blue-400 font-semibold"> Relatia</span>{" "}
              connects pipeline, success, and support in one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-xl shadow-blue-500/40 transition-all duration-300 hover:shadow-blue-500/60 hover:scale-[1.02] hover:from-blue-500 hover:to-cyan-400 overflow-hidden"
              >
                <Rocket className="h-4 w-4 transition-transform group-hover:rotate-12" />
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-600/50 bg-slate-800/30 backdrop-blur-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/50 hover:scale-[1.02]"
              >
                <Play className="h-4 w-4 text-blue-400" />
                Watch Demo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span className="text-xs text-slate-400">No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span className="text-xs text-slate-400">14-day trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span className="text-xs text-slate-400">Cancel anytime</span>
              </div>
            </div>

            {/* Inline Stats - Integrated into Hero */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-700/30">
              {STATS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                      <Icon className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 leading-tight">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-white leading-tight">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Modern Dashboard Preview */}
          <div className="relative lg:pl-6">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="relative rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-2xl p-4 shadow-2xl shadow-black/50">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <BarChart3 className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-green-400 rounded-full border-2 border-slate-900" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        Relatia Dashboard
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Live • Updated now
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    {
                      icon: Users,
                      label: "Leads",
                      value: "2.4K",
                      change: "+18%",
                      color: "blue",
                      trend: "up",
                    },
                    {
                      icon: MessageSquare,
                      label: "Tickets",
                      value: "142",
                      change: "-8%",
                      color: "purple",
                      trend: "down",
                    },
                    {
                      icon: TrendingUp,
                      label: "Revenue",
                      value: "$89K",
                      change: "+32%",
                      color: "green",
                      trend: "up",
                    },
                    {
                      icon: Activity,
                      label: "Active",
                      value: "1.2K",
                      change: "+12%",
                      color: "cyan",
                      trend: "up",
                    },
                  ].map((metric, idx) => {
                    const Icon = metric.icon;
                    const colorClasses = {
                      blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
                      purple:
                        "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
                      green:
                        "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400",
                      cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400",
                    };
                    return (
                      <div
                        key={idx}
                        className={`group relative rounded-lg bg-gradient-to-br ${
                          colorClasses[
                            metric.color as keyof typeof colorClasses
                          ]
                        } border p-2 transition-all duration-300 hover:scale-105`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className="h-3 w-3" />
                          <span className="text-[10px] font-medium text-slate-400">
                            {metric.label}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-white mb-0.5">
                          {metric.value}
                        </p>
                        <div className="flex items-center gap-1">
                          {metric.trend === "up" ? (
                            <ArrowUp className="h-2.5 w-2.5 text-green-400" />
                          ) : (
                            <ArrowDown className="h-2.5 w-2.5 text-red-400" />
                          )}
                          <span
                            className={`text-[10px] font-semibold ${
                              metric.trend === "up"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">
                      Customer Health
                    </span>
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      94/100
                    </span>
                  </div>
                  <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                      style={{ width: "94%" }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <ShieldCheck className="h-3 w-3 text-green-400" />
                    <span className="text-[10px] text-slate-400">
                      Excellent health
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Top Right (Growth Rate) */}
              <div className="absolute -top-4 -right-4 rounded-xl border border-green-500/40 bg-gradient-to-br from-green-500/25 to-emerald-500/15 backdrop-blur-xl p-2.5 shadow-xl shadow-green-500/30 animate-[float_6s_ease-in-out_infinite] hover:scale-110 transition-transform z-30">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <Zap className="h-3.5 w-3.5 text-green-300" />
                  <span className="text-xs font-extrabold text-white">
                    +42%
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-green-200 mt-0.5">
                  Growth
                </p>
              </div>

              {/* Floating Badge - Bottom Right (Uptime) */}
              <div
                className="absolute -bottom-4 -right-4 rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/25 to-blue-500/15 backdrop-blur-xl p-2.5 shadow-xl shadow-cyan-500/30 animate-[float_8s_ease-in-out_infinite] hover:scale-110 transition-transform z-30"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-cyan-300" />
                  <span className="text-xs font-extrabold text-white">
                    99.9%
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-cyan-200 mt-0.5">
                  Uptime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
