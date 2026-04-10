import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';

const CtaBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-cobalt" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(242,122,24,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,122,24,0.08)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              Ready to transform your workflow?
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 max-w-3xl mx-auto">
              Start automating your enterprise with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                INVODEX
              </span>
            </h2>

            <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
              Join 500+ enterprises already using AI agents to process millions of documents every month.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full h-12 px-8 text-base shadow-lg shadow-primary/30"
                onClick={() => navigate('/auth')}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 bg-transparent"
                onClick={() => navigate('/chat')}
              >
                Try Live Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
