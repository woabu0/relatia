const testimonials = [
  {
    quote:
      "Relatia gave us back visibility. Our team closes loops faster, responds smarter, and actually sees how relationships grow over time.",
    author: "Amelia Carter",
    role: "VP of Customer Experience, StratusIQ",
  },
  {
    quote:
      "We replaced three disconnected tools with Relatia. Pipelines feel lighter, customers feel heard, and forecasting is no longer guesswork.",
    author: "Marcus Lee",
    role: "Revenue Operations Lead, Northwind Labs",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative border-y border-slate-700/60 bg-slate-900 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Teams that switched to Relatia
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Trusted by customer-obsessed operators around the globe
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-sm"
            >
              <p className="text-base italic text-slate-200">
                "{testimonial.quote}"
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-white">
                  {testimonial.author}
                </p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

