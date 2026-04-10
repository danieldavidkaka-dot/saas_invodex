import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../utils/i18n';
import { Terminal, Shield, Zap, Workflow, Database, Globe, BrainCircuit } from 'lucide-react';

const Capabilities: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { icon: <Database className="w-6 h-6" />, title: t.capabilities.items[0].title, desc: t.capabilities.items[0].desc, colSpan: 'md:col-span-2 lg:col-span-2', rowSpan: 'row-span-2', highlight: true, color: 'primary' },
    { icon: <BrainCircuit className="w-6 h-6" />, title: t.capabilities.items[1].title, desc: t.capabilities.items[1].desc, colSpan: 'col-span-1', rowSpan: 'row-span-1', color: 'accent' },
    { icon: <Workflow className="w-6 h-6" />, title: t.capabilities.items[2].title, desc: t.capabilities.items[2].desc, colSpan: 'col-span-1', rowSpan: 'row-span-1', color: 'gold' },
    { icon: <Terminal className="w-6 h-6" />, title: t.capabilities.items[3].title, desc: t.capabilities.items[3].desc, colSpan: 'md:col-span-2 lg:col-span-2', rowSpan: 'row-span-1', color: 'cobalt' },
    { icon: <Shield className="w-6 h-6" />, title: t.capabilities.items[4].title, desc: t.capabilities.items[4].desc, colSpan: 'col-span-1', rowSpan: 'row-span-1', color: 'primary' },
    { icon: <Zap className="w-6 h-6" />, title: t.capabilities.items[5].title, desc: t.capabilities.items[5].desc, colSpan: 'col-span-1', rowSpan: 'row-span-1', color: 'accent' },
    { icon: <Globe className="w-6 h-6" />, title: t.capabilities.items[6].title, desc: t.capabilities.items[6].desc, colSpan: 'md:col-span-2 lg:col-span-2', rowSpan: 'row-span-1', color: 'gold' },
  ];

  const getColorClasses = (color: string) => {
    const map: Record<string, string> = {
      accent: 'bg-accent/10 text-accent',
      gold: 'bg-gold/10 text-gold',
      cobalt: 'bg-cobalt/10 text-cobalt',
      primary: 'bg-primary/10 text-primary',
    };
    return map[color] || map.primary;
  };

  const getBorderGlow = (color: string) => {
    const map: Record<string, string> = {
      accent: 'hover:border-accent/30 hover:shadow-accent/5',
      gold: 'hover:border-gold/30 hover:shadow-gold/5',
      cobalt: 'hover:border-cobalt/30 hover:shadow-cobalt/5',
      primary: 'hover:border-primary/30 hover:shadow-primary/5',
    };
    return map[color] || map.primary;
  };

  return (
    <section id="capabilities" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,208,245,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-muted-foreground text-sm font-medium mb-6 shadow-sm">
            {t.capabilities.label}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            {t.capabilities.title_core} <span className="text-primary">{t.capabilities.title_suffix}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Modular architecture designed for autonomous execution and seamless integration with existing enterprise workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[minmax(180px,auto)]">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className={`${feature.colSpan} ${feature.rowSpan} group relative`}
            >
              <div className={`h-full p-8 rounded-2xl border bg-card flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                feature.highlight
                  ? 'border-border/50 shadow-md'
                  : `border-border ${getBorderGlow(feature.color)}`
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${getColorClasses(feature.color)}`}>
                  {feature.icon}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
