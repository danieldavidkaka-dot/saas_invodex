import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, CircleCheck as CheckCircle2, Zap, Shield, Globe, ChartBar as BarChart3 } from 'lucide-react';
import Button from './ui/Button';
import { useLanguage } from '../utils/i18n';
import { useNavigate } from 'react-router-dom';

const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, start]);

  return { count, ref };
};

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stat1 = useCountUp(99, 2000);
  const stat2 = useCountUp(10, 2000);
  const stat3 = useCountUp(500, 2000);
  const stat4 = useCountUp(50, 2000);

  const stats = [
    { ref: stat1.ref, value: `${stat1.count}%`, label: 'Accuracy', icon: <BarChart3 className="w-4 h-4" /> },
    { ref: stat2.ref, value: `${stat2.count}x`, label: 'Faster', icon: <Zap className="w-4 h-4" /> },
    { ref: stat3.ref, value: `${stat3.count}+`, label: 'Enterprises', icon: <Globe className="w-4 h-4" /> },
    { ref: stat4.ref, value: `${stat4.count}M`, label: 'Processed', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center pt-32 pb-20">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-12 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm text-muted-foreground text-sm font-medium mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          {t.hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 leading-[1.08]"
        >
          {t.hero.title_start}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
            {t.hero.title_highlight}
          </span>
          {t.hero.title_end ? t.hero.title_end : ''}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto text-base h-12 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
            onClick={() => navigate('/auth')}
          >
            {t.hero.button_trial}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-base h-12 px-8 rounded-full bg-card/50 backdrop-blur-sm border-border hover:border-accent/30 transition-all"
            onClick={() => navigate('/chat')}
          >
            <MessageSquare className="mr-2 w-4 h-4" />
            {t.hero.button_chat_erp}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
        >
          {[t.hero.check_no_card, t.hero.check_trial, t.hero.check_cancel].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              ref={stat.ref}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="relative group"
            >
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-5 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 w-full max-w-5xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl shadow-black/10 overflow-hidden">
            <div className="h-10 border-b border-border/50 bg-muted/30 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-gold/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground font-mono">
                  invodex.app/dashboard
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 aspect-[16/9] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

              <div className="relative z-10 h-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20" />
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-foreground/10 rounded" />
                      <div className="h-2 w-16 bg-muted-foreground/10 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-primary/20 rounded-lg" />
                    <div className="h-8 w-8 bg-muted/50 rounded-lg" />
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-4 mt-4">
                  <div className="col-span-2 bg-muted/20 rounded-xl p-4 border border-border/30">
                    <div className="h-3 w-20 bg-foreground/10 rounded mb-4" />
                    <div className="flex items-end gap-2 h-[60%]">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.8, delay: 1 + i * 0.05, ease: 'easeOut' }}
                          className="flex-1 rounded-t-sm"
                          style={{ backgroundColor: i % 3 === 0 ? 'hsl(27, 90%, 52%)' : i % 3 === 1 ? 'hsl(189, 100%, 48%)' : 'hsl(var(--muted))' }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted/20 rounded-xl p-4 border border-border/30 flex-1">
                      <div className="h-2 w-12 bg-foreground/10 rounded mb-3" />
                      <div className="text-xl font-bold text-primary">98.7%</div>
                      <div className="h-2 w-16 bg-accent/30 rounded mt-2" />
                    </div>
                    <div className="bg-muted/20 rounded-xl p-4 border border-border/30 flex-1">
                      <div className="h-2 w-12 bg-foreground/10 rounded mb-3" />
                      <div className="text-xl font-bold text-accent">1.2s</div>
                      <div className="h-2 w-12 bg-primary/30 rounded mt-2" />
                    </div>
                    <div className="bg-muted/20 rounded-xl p-4 border border-border/30 flex-1">
                      <div className="h-2 w-12 bg-foreground/10 rounded mb-3" />
                      <div className="text-xl font-bold text-gold">2.4k</div>
                      <div className="h-2 w-20 bg-gold/30 rounded mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
