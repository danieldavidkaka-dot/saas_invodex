import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "Acme Corp", "GlobalTech", "Nexus Industries", "Apex Solutions", "Quantum Financial",
  "Starlight Media", "Horizon Logistics", "Pinnacle Group", "Vanguard Systems", "Zenith Corp"
];

const LogoWall: React.FC = () => {
  return (
    <section className="py-16 bg-background border-b border-border/50 overflow-hidden relative z-20">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
          Trusted by innovative teams worldwide
        </p>
      </div>

      <div className="flex relative">
        <motion.div
          className="flex gap-20 items-center whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="text-lg font-semibold text-muted-foreground/30 hover:text-muted-foreground/60 transition-all duration-500 cursor-default select-none tracking-tight flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-muted-foreground/10 flex items-center justify-center text-xs font-bold text-muted-foreground/40">
                {logo.charAt(0)}
              </div>
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoWall;
