import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../lib/constants";

export default function Testimonials() {
  // Show only first 3 testimonials
  const displayedTestimonials = TESTIMONIALS.slice(0, 3);

  return (
    <section id="testimonials" className="relative border-y border-slate-700/60 bg-slate-900 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Teams that switched to Relatia
          </p>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-4">
            Trusted by customer-obsessed operators around the globe
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-4">
            Join thousands of teams who have transformed their customer relationships
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedTestimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="group rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-800/30 p-6 md:p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start gap-3 mb-4">
                <Quote className="h-6 w-6 md:h-8 md:w-8 text-blue-400/50 shrink-0" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-base leading-relaxed italic text-slate-200 mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50">
                <div className="shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-semibold text-white truncate">
                    {testimonial.author}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
