/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import NeuralBackground from './components/NeuralBackground';
import Splash from './components/Splash';
import Hero from './components/Hero';
import ExperienceTimeline from './components/ExperienceTimeline';
import CinematicVault from './components/CinematicVault';
import SkillPhysicsMatrix from './components/SkillPhysicsMatrix';
import CredentialsHub from './components/CredentialsHub';
import BentoLedger from './components/BentoLedger';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500/30">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div key="splash" className="fixed inset-0 z-50">
            <Splash onComplete={() => setShowSplash(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <NeuralBackground />
            
            {/* Navigation / Scroll Spy could go here */}
            <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center mix-blend-difference">
              <div className="text-xl font-bold tracking-tighter text-cyan-400">RP</div>
              <div className="hidden md:flex gap-6 text-sm font-mono uppercase tracking-widest">
                <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
                <a href="#credentials" className="hover:text-cyan-400 transition-colors">Credentials</a>
                <a href="#ledger" className="hover:text-cyan-400 transition-colors">Ledger</a>
              </div>
            </nav>

            <main className="relative z-10">
              <Hero />
              <ExperienceTimeline />
              <CinematicVault />
              <SkillPhysicsMatrix />
              <CredentialsHub />
              <BentoLedger />
            </main>

            <footer className="py-12 text-center text-white/40 text-sm font-mono border-t border-white/5 mt-24">
              <p>© {new Date().getFullYear()} Rohan Upendra Patil. All rights reserved.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
