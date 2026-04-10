import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../utils/i18n';
import { Network, SquareTerminal as TerminalSquare, MessageSquare, Layers } from 'lucide-react';

const layers = [
  { icon: <TerminalSquare className="w-7 h-7" />, color: 'accent', borderColor: 'border-accent/20', hoverBorder: 'group-hover:border-accent/50', bgGlow: 'bg-accent/5' },
  { icon: <MessageSquare className="w-7 h-7" />, color: 'gold', borderColor: 'border-gold/20', hoverBorder: 'group-hover:border-gold/50', bgGlow: 'bg-gold/5' },
  { icon: <Layers className="w-7 h-7" />, color: 'cobalt', borderColor: 'border-cobalt/20', hoverBorder: 'group-hover:border-cobalt/50', bgGlow: 'bg-cobalt/5' },
];

const Architecture: React.FC = () => {
  const { t } = useLanguage();

  const layerData = [
    { title: t.architecture.layer1_title, desc: t.architecture.layer1, align: 'right' },
    { title: t.architecture.layer2_title, desc: t.architecture.layer2, align: 'left' },
    { title: t.architecture.layer3_title, desc: t.architecture.layer3, align: 'right' },
  ];

  return (
    <section id="architecture" className="py-24 bg-background border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,rgba(242,122,24,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,122,24,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-muted-foreground text-sm font-medium mb-6 shadow-sm">
            <Network className="w-4 h-4 text-primary" />
            {t.architecture.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            {t.architecture.title_swarm} <span className="text-primary">{t.architecture.title_intelligence}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.architecture.description}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/40 via-gold/40 to-cobalt/40 md:-translate-x-1/2 origin-top"
          />

          <div className="flex flex-col gap-20">
            {layerData.map((layer, idx) => {
              const style = layers[idx];
              const isRight = layer.align === 'right';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 group"
                >
                  {isRight ? (
                    <>
                      <div className="md:w-1/2 md:text-right order-2 md:order-1 pl-20 md:pl-0">
                        <h3 className="text-2xl font-bold text-foreground mb-3">{layer.title}</h3>
                        <div className="text-base text-muted-foreground leading-relaxed">{layer.desc}</div>
                      </div>
                      <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-20 h-20 rounded-2xl bg-card border ${style.borderColor} ${style.hoverBorder} flex items-center justify-center z-10 shadow-sm hover:shadow-lg transition-all duration-300`}>
                        <div className={`text-${style.color}`}>{style.icon}</div>
                      </div>
                      <div className="md:w-1/2 order-3 hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2 order-1 hidden md:block" />
                      <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-20 h-20 rounded-2xl bg-card border ${style.borderColor} ${style.hoverBorder} flex items-center justify-center z-10 shadow-sm hover:shadow-lg transition-all duration-300`}>
                        <div className={`text-${style.color}`}>{style.icon}</div>
                      </div>
                      <div className="md:w-1/2 order-2 pl-20 md:pl-0">
                        <h3 className="text-2xl font-bold text-foreground mb-3">{layer.title}</h3>
                        <div className="text-base text-muted-foreground leading-relaxed">{layer.desc}</div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
