import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, CircleCheck as CheckCircle2, Shield, Zap, Globe, ChartBar as BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useLanguage } from '../utils/i18n';

const features = [
  { icon: <Zap className="w-5 h-5" />, text: '10x faster document processing' },
  { icon: <Shield className="w-5 h-5" />, text: 'Enterprise-grade security & RBAC' },
  { icon: <Globe className="w-5 h-5" />, text: 'Multi-language AI agents' },
  { icon: <BarChart3 className="w-5 h-5" />, text: 'Real-time analytics dashboard' },
];

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-cobalt" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(242,122,24,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,122,24,0.06)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-primary/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-accent/15 rounded-full blur-[60px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center">
            <img src="https://iili.io/q4wto4p.md.png" alt="INVODEX Logo" className="h-10 w-auto object-contain brightness-0 invert" />
          </Link>

          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Transform your enterprise with autonomous AI agents
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Join 500+ companies already automating their workflows with INVODEX.
            </p>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-primary shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-white/80 text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((letter, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-secondary flex items-center justify-center text-xs font-medium text-white/70">
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-white/50 text-sm">500+ teams already onboard</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden lg:hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/8 blur-[100px]" />
        </div>

        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center">
              <img src="https://iili.io/q4wto4p.md.png" alt="INVODEX Logo" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              {isLogin ? t.auth.login_title : t.auth.signup_title}
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              {isLogin ? t.auth.login_subtitle : t.auth.signup_subtitle}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {isLogin ? t.auth.login_action : t.auth.signup_action}
              </button>
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                {t.auth.email_label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
                  placeholder={t.auth.email_placeholder}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                {t.auth.password_label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
                  placeholder={t.auth.password_placeholder}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-accent shrink-0" />
                  <span>{t.hero.check_trial}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-accent shrink-0" />
                  <span>{t.hero.check_no_card}</span>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded bg-card"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                    {t.auth.remember_me}
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  {t.auth.forgot_password}
                </a>
              </div>
            )}

            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2 h-11 rounded-xl text-sm"
            >
              {isLogin ? t.auth.login_button : t.auth.signup_button}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-background text-muted-foreground text-xs">
                  {t.auth.or_continue}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-border rounded-xl bg-card text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-border rounded-xl bg-card text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
