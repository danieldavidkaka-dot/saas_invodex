import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    description: 'For small teams getting started with AI automation',
    features: [
      '1,000 documents/month',
      '3 AI agent sessions',
      'Email support',
      'Basic analytics dashboard',
      'Single workspace',
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'accent',
  },
  {
    name: 'Professional',
    price: '$149',
    period: '/mo',
    description: 'For growing businesses that need enterprise-grade AI',
    features: [
      '25,000 documents/month',
      'Unlimited AI agent sessions',
      'Priority support (24h)',
      'Advanced analytics & reports',
      'Multi-tenant workspaces',
      'Custom AI personas',
      'API access',
    ],
    cta: 'Start Free Trial',
    popular: true,
    color: 'primary',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced security and scale needs',
    features: [
      'Unlimited documents',
      'Unlimited AI agents',
      'Dedicated support & SLA',
      'White-label customization',
      'On-premise deployment',
      'Custom integrations',
      'RBAC & SSO',
      'Compliance & audit logs',
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'gold',
  },
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(242,122,24,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-muted-foreground text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            Simple, transparent <span className="text-primary">pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free for 14 days. No credit card required. Scale as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-2xl border bg-card p-8 flex flex-col transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-primary/40 shadow-lg shadow-primary/5 scale-[1.02] md:scale-105'
                  : 'border-border hover:border-border/80'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-md">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? 'default' : 'outline'}
                className={`w-full rounded-full h-11 ${
                  plan.popular ? 'shadow-md shadow-primary/20' : ''
                }`}
                onClick={() => navigate('/auth')}
              >
                {plan.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
