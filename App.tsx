import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoWall from './components/LogoWall';
import Capabilities from './components/Capabilities';
import Architecture from './components/Architecture';
import Testimonials from './components/Testimonials';
import UseCases from './components/UseCases';
import Pricing from './components/Pricing';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <AnimatePresence>
        {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>

      {!showPreloader && (
        <>
          <Navbar />
          <Hero />
          <LogoWall />
          <Capabilities />
          <Architecture />
          <UseCases />
          <Pricing />
          <Testimonials />
          <CtaBanner />
          <Footer />
        </>
      )}
    </main>
  );
};

export default App;
