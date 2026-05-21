/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
    glowIntensity: 'rgba(6, 182, 212, 0.25)',
    accentColor: 'text-cyan-400',
  },
  eu: {
    id: 'eu',
    domainName: 'MADE.EU',
    name: 'La Pile',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    glowIntensity: 'rgba(168, 85, 247, 0.22)',
    accentColor: 'text-purple-400',
  },
};

const GLOW_COLORS: Record<Domain, string> = {
  paris: 'rgba(56, 189, 248, 0.95)',
  fr: 'rgba(34, 211, 238, 0.95)',
  eu: 'rgba(192, 132, 252, 0.95)',
};

export default function App() {
  const [activeDomain, setActiveDomain] = useState<Domain>(() => {
    if (typeof window !== 'undefined' && window.location && window.location.hostname) {
      const hostname = window.location.hostname.toLowerCase();
      if (hostname.includes('made.paris')) return 'paris';
      if (hostname.includes('made.fr')) return 'fr';
      if (hostname.includes('made.eu')) return 'eu';
    }
    return 'paris';
  });

  const activeConfig = DOMAINS[activeDomain];

  // Dynamically update browser tab title
  useEffect(() => {
    document.title = activeConfig.domainName.toLowerCase();
  }, [activeDomain, activeConfig]);

  // Helper to obtain the two inactive domains for the navigation at the bottom
  const getInactiveDomains = (): Domain[] => {
    if (activeDomain === 'paris') return ['fr', 'eu'];
    if (activeDomain === 'fr') return ['paris', 'eu'];
    return ['paris', 'fr'];
  };

  const inactiveDomains = getInactiveDomains();

  // Premium Graphic Geometric Brand Logo from uploaded reference images without background, with dynamic side neon reflexions
  const BrandLogo = ({ 
    domain, 
    size = 'large', 
    position = 'top' 
  }: { 
    domain: Domain; 
    size?: 'large' | 'small'; 
    position?: 'top' | 'left' | 'right' 
  }) => {
    const containerSize = size === 'large' 
      ? 'w-16 h-16 md:w-20 md:h-20' 
      : 'w-3 h-3 md:w-3.5 md:h-3.5';

    const glowColor = GLOW_COLORS[domain];

    // Determine drop shadow filters to simulate realistic glow reflecting from the nearest neon side
    let filterStyle = '';
    if (position === 'left') {
      filterStyle = `drop-shadow(-4px 0px 8px ${glowColor}) drop-shadow(-1px 0px 2px ${glowColor})`;
    } else if (position === 'right') {
      filterStyle = `drop-shadow(4px 0px 8px ${glowColor}) drop-shadow(1px 0px 2px ${glowColor})`;
    } else {
      filterStyle = `drop-shadow(0px 10px 18px ${glowColor}) drop-shadow(0px 2px 4px ${glowColor})`;
    }

    return (
      <div 
        className={`relative ${containerSize} flex items-center justify-center overflow-visible shrink-0 transition-all duration-300`}
        style={{ filter: filterStyle }}
      >
        <svg viewBox="0 0 100 100" className="w-[88%] h-[88%] overflow-visible">
          {domain === 'paris' && (
            <>
              {/* Image 3: Core Blue Archway with Black Inside Tower and Red Column Accent on Black Background */}
              <path
                d="M 10,10 L 90,10 L 90,90 L 72,90 L 72,58 L 60,58 L 60,20 L 40,20 L 40,58 L 28,58 L 28,90 L 10,90 Z"
                fill="#013a81"
              />
              <rect x="46" y="25" width="8" height="18" fill="#e51c24" />
            </>
          )}
          {domain === 'fr' && (
            <>
              {/* Image 2: France Blue and Red Pillars with White Bridge Connector on Black Background */}
              <path
                d="M 10,10 L 38,10 L 38,50 L 24,50 L 24,90 L 10,90 Z"
                fill="#013a81"
              />
              <path
                d="M 62,10 L 90,10 L 90,90 L 76,90 L 76,50 L 62,50 Z"
                fill="#e51c24"
              />
              <rect x="38" y="24" width="24" height="14" fill="#ffffff" />
            </>
          )}
          {domain === 'eu' && (
            <>
              {/* Image 1: Europe Blue Left and Right Pillars with Gold Bridge Connector on Black Background */}
              <path
                d="M 10,10 L 38,10 L 38,50 L 24,50 L 24,90 L 10,90 Z"
                fill="#013a81"
              />
              <path
                d="M 62,10 L 90,10 L 90,90 L 76,90 L 76,50 L 62,50 Z"
                fill="#013a81"
              />
              <rect x="38" y="24" width="24" height="14" fill="#ffa100" />
            </>
          )}
        </svg>
      </div>
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
      <header className="relative w-full flex justify-center items-start z-10">
        {/* Centered Page Main Graphic Logo */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain}
              initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <BrandLogo domain={activeDomain} size="large" position="top" />
            </motion.div>
          </AnimatePresence>
        </div>
      </header>

      {/* CENTER COMPONENT (Main active artifact) */}
      <section className="relative flex-1 w-full flex flex-col md:flex-row items-center justify-center z-10 py-4">
        {/* Central Displayed Glowing Artifact wrapped in a link to its domain */}
        <div className="relative flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain}
              initial={{ scale: 0.82, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 6 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative transition-transform duration-500 hover:scale-[1.03]"
            >
              <a
                href={activeDomain === 'paris' ? 'https://made.paris' : activeDomain === 'fr' ? 'https://made.fr' : 'https://made.eu'}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block cursor-pointer focus:outline-none"
                title={`Go to made.${activeDomain}`}
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
              </a>
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
            
            <div className="flex flex-col">
              <BrandLogo domain={inactiveDomains[0]} size="small" position="left" />
            </div>
          </button>
        </div>

        {/* Unified Mobile and Desktop Registration Form closer to the bottom */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 flex flex-col items-center registration-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="p-1.5 rounded-xl border border-neutral-900/40 bg-black/60 backdrop-blur-md shadow-2xl">
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
            
            <div className="flex flex-col">
              <BrandLogo domain={inactiveDomains[1]} size="small" position="right" />
            </div>
          </button>
        </div>
      </footer>
    </main>
  );
}
