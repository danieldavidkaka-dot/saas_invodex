import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../utils/i18n';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const testimonials = t.testimonials.items;

  return (
    <section id="testimonials" className="py-24 bg-muted/30 relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(249,193,49,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-muted-foreground text-sm font-medium mb-6 shadow-sm">
            <Quote className="w-4 h-4 text-primary" />
            {t.testimonials.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            {t.testimonials.title_trusted} <span className="text-primary">{t.testimonials.title_leaders}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <div className={`h-full p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                testimonial.highlight
                  ? 'bg-card border-primary/20 shadow-lg shadow-primary/5'
                  : 'bg-card border-border hover:border-gold/20'
              }`}>
                <div>
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(testimonial.rating)].map((_: any, i: number) => (
                      <Star key={i} className={`w-4 h-4 fill-current ${testimonial.highlight ? 'text-primary' : 'text-gold/70'}`} />
                    ))}
                  </div>
                  <p className={`text-base leading-relaxed mb-8 ${testimonial.highlight ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground transition-colors'}`}>
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${
                    testimonial.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
