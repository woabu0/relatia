import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 bg-slate-900">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-[40px] border border-slate-700 bg-slate-800 p-10 text-center shadow-xl">
          <div className="absolute inset-x-0 -top-40 flex justify-center">
            <div className="h-40 w-40 rounded-full bg-blue-500/30 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ready to build relationships that go beyond transactions?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
              Join the teams using Relatia to orchestrate their entire customer
              lifecycle. 14-day free trial, no credit card, full access to
              all premium features.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700"
              >
                Try Relatia now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-700/50 px-5 py-3 text-base font-semibold text-white transition hover:border-blue-500 hover:bg-slate-700"
              >
                View live demo
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

