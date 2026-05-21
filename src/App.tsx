/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Domain, DomainConfig } from './types';
import { Artifact } from './components/Artifact';
import { RegistrationForm } from './components/RegistrationForm';
import { Globe, Award, Sparkles, ExternalLink } from 'lucide-react';

const DOMAINS: Record<Domain, DomainConfig> = {
  paris: {
    id: 'paris',
    domainName: 'MADE.PARIS',
    name: 'La Tour',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    glowIntensity: 'rgba(14, 165, 233, 0.25)',
    accentColor: 'text-sky-400',
  },
  fr: {
    id: 'fr',
    domainName: 'MADE.FR',
    name: 'La Tortue',
    glowColor: 'rgba(34, 211, 238, 0.4)',
    glowIntensity: 'rgba(6, 182, 212, 0.22)',
    accentColor: 'text-cyan-400',
  },
  eu: {
    id: 'eu',
    domainName: 'MADE.EU',
    name: 'La Pile',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    glowIntensity: 'rgba(168, 85, 247, 0.18)',
    accentColor: 'text-purple-400',
  },
};

export default function App() {
  const [activeDomain, setActiveDomain] = useState<Domain>('paris');

  const activeConfig = DOMAINS[activeDomain];

  // Helper to obtain the two inactive domains for the navigation at the bottom
  const getInactiveDomains = (): Domain[] => {
    if (activeDomain === 'paris') return ['fr', 'eu'];
    if (activeDomain === 'fr') return ['paris', 'eu'];
    return ['paris', 'fr'];
  };

  const inactiveDomains = getInactiveDomains();

  // Premium Typography Logo Component for top header and navigation
  const BrandLogo = ({ domain, size = 'large' }: { domain: Domain; size?: 'large' | 'small' }) => {
    const sizeClasses = size === 'large' 
      ? 'text-3xl md:text-5xl lg:text-6xl font-black' 
      : 'text-[10px] md:text-sm font-bold';
      
    const dotSizeClasses = size === 'large'
      ? 'w-2.5 h-2.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5'
      : 'w-0.5 h-0.5 md:w-1.5 md:h-1.5';
      
    const dotSpacingClasses = size === 'large'
      ? 'mx-1 mb-1.5 md:mb-2'
      : 'mx-[2px] mb-[1px] md:mb-[2px]';

    const renderDotSymbol = () => {
      if (domain === 'eu') {
        // Gold square
        return (
          <span 
            className={`${dotSizeClasses} ${dotSpacingClasses} bg-[#FFCC00] rounded-[1px] shrink-0`} 
            style={{ 
              boxShadow: size === 'large' ? '0 0 10px rgba(255, 204, 0, 0.5)' : 'none' 
            }}
          />
        );
      }
      if (domain === 'fr') {
        // Tricolour bar
        return (
          <span className={`inline-flex ${dotSizeClasses} ${dotSpacingClasses} shrink-0 rounded-[1px] overflow-hidden`}>
            <span className="w-1/3 h-full bg-[#002395]" />
            <span className="w-1/3 h-full bg-[#FFFFFF]" />
            <span className="w-1/3 h-full bg-[#ED2939]" />
          </span>
         );
      }
      // 'paris' => Bicolour bar (Blue & Red)
      return (
        <span className={`inline-flex ${dotSizeClasses} ${dotSpacingClasses} shrink-0 rounded-[1px] overflow-hidden`}>
          <span className="w-1/2 h-full bg-[#002395]" />
          <span className="w-1/2 h-full bg-[#ED2939]" />
        </span>
      );
    };

    return (
      <span className={`inline-flex items-end font-sans tracking-tighter text-neutral-100 select-none ${sizeClasses}`}>
        <span className="lowercase">made</span>
        {renderDotSymbol()}
        <span className="lowercase">{domain}</span>
      </span>
    );
  };

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden bg-black flex flex-col justify-between p-6 md:p-12 font-sans select-none transition-all duration-1000"
      id="root-container"
    >
      {/* 1. Deep Space Atmospheric Radial Glow: Near the neons we have dark blue passing to black */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out z-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, ${activeConfig.glowIntensity} 0%, rgba(8, 20, 64, 0.22) 25%, rgba(4, 8, 28, 0.08) 55%, #000000 85%),
            radial-gradient(circle at 50% 40%, rgba(10, 20, 50, 0.35) 0%, #000000 70%)
          `,
        }}
      />

      {/* 2. Abstract Geometric Gridlines for cyber art feel */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        {/* Horizontal Laser Division line */}
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-900/35 to-transparent" />
        <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-900/35 to-transparent" />
        
        {/* Tech Corner Crosshairs */}
        <div className="absolute top-12 left-12 w-6 h-6 border-t border-l border-blue-950/40" />
        <div className="absolute top-12 right-12 w-6 h-6 border-t border-r border-blue-950/40" />
        <div className="absolute bottom-12 left-12 w-6 h-6 border-b border-l border-blue-950/40" />
        <div className="absolute bottom-12 right-12 w-6 h-6 border-b border-r border-blue-950/40" />
      </div>

      {/* HEADER SECTION (Top) */}
      <header className="relative w-full flex justify-end items-start z-10">
        {/* Top Right: Page Main Big Domain Display using the typography requested logos */}
        <div className="text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain}
              initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <BrandLogo domain={activeDomain} size="large" />
            </motion.div>
          </AnimatePresence>
        </div>
      </header>

      {/* CENTER COMPONENT (Main active artifact) */}
      <section className="relative flex-1 w-full flex flex-col md:flex-row items-center justify-center z-10 py-4">
        {/* Central Displayed Glowing Artifact */}
        <div className="relative flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain}
              initial={{ scale: 0.82, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 6 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative cursor-pointer transition-transform duration-500 hover:scale-[1.03]"
            >
              {/* Outer light glow halo right behind shape */}
              <div 
                className="absolute inset-0 rounded-full blur-[72px] opacity-40 transition-all duration-1000"
                style={{
                  background: activeConfig.glowIntensity,
                }}
              />
              
              {/* SVG Neon Shape */}
              <Artifact type={activeDomain} size="large" />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER SECTION: Navigation through the other two mini artifacts at bottom left & right */}
      <footer className="relative w-full flex justify-between items-end z-10 mt-auto pb-4 md:pb-0">
        {/* Navigation bottom left widget: First Inactive */}
        <div className="flex flex-col items-start z-30">
          <button
            onClick={() => setActiveDomain(inactiveDomains[0])}
            className="group flex items-center gap-1.5 md:gap-3 text-left focus:outline-none focus:ring-1 focus:ring-neutral-800 rounded-lg p-1 md:p-3 bg-neutral-950/20 hover:bg-neutral-950/80 hover:border-neutral-900 border border-transparent transition-all duration-300 cursor-pointer nav-btn-container"
          >
            <div className="relative p-0.5 md:p-1 rounded bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Artifact type={inactiveDomains[0]} size="small" animate={false} />
            </div>
            
            <div className="hidden sm:flex flex-col pt-1">
              <BrandLogo domain={inactiveDomains[0]} size="small" />
            </div>
          </button>
        </div>

        {/* Unified Mobile and Desktop Registration Form with Active Neon Mini Artifact pointing above it */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 flex flex-col items-center registration-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              {/* Dynamic Neon Mini pointing shape respective to the active domain */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <Artifact type={activeDomain} size="mini" />
              </motion.div>

              <div className="p-3 rounded-lg border border-neutral-900/60 bg-black/85 backdrop-blur-md shadow-2xl">
                <RegistrationForm type={activeDomain} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation bottom right widget: Second Inactive */}
        <div className="flex flex-col items-end z-30">
          <button
            onClick={() => setActiveDomain(inactiveDomains[1])}
            className="group flex items-center flex-row-reverse gap-1.5 md:gap-3 text-right focus:outline-none focus:ring-1 focus:ring-neutral-800 rounded-lg p-1 md:p-3 bg-neutral-950/20 hover:bg-neutral-950/80 hover:border-neutral-900 border border-transparent transition-all duration-300 cursor-pointer nav-btn-container"
          >
            <div className="relative p-0.5 md:p-1 rounded bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-105 font-sans">
              <Artifact type={inactiveDomains[1]} size="small" animate={false} />
            </div>
            
            <div className="hidden sm:flex flex-col pt-1">
              <BrandLogo domain={inactiveDomains[1]} size="small" />
            </div>
          </button>
        </div>
      </footer>
    </main>
  );
}
