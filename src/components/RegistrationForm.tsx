import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Domain } from '../types';

interface RegistrationFormProps {
  type?: Domain;
}

const TALLY_EMBEDS: Record<Domain, string> = {
  paris: 'https://tally.so/embed/EkNKro?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
  fr: 'https://tally.so/embed/ob6ByN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
  eu: 'https://tally.so/embed/0QDdg6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
};

const TALLY_DIRECT_LINKS: Record<Domain, string> = {
  paris: 'https://tally.so/r/EkNKro',
  fr: 'https://tally.so/r/ob6ByN',
  eu: 'https://tally.so/r/0QDdg6',
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ type = 'eu' }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Whenever the active domain type changes, reset the iframe loaded state to trigger a smooth fade transition
  useEffect(() => {
    setIframeLoaded(false);
  }, [type]);

  // Dynamic theme styling mappings
  const themeMap = {
    paris: {
      text: 'text-sky-400',
      textLight: 'text-sky-300',
      dot: 'bg-sky-500',
      border: 'border-sky-950/65',
      glow: 'shadow-[0_0_20px_rgba(56,189,248,0.15)]',
    },
    fr: {
      text: 'text-cyan-400',
      textLight: 'text-cyan-300',
      dot: 'bg-cyan-500',
      border: 'border-cyan-950/65',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]',
    },
    eu: {
      text: 'text-purple-400',
      textLight: 'text-purple-300',
      dot: 'bg-purple-500',
      border: 'border-purple-950/65',
      glow: 'shadow-[0_0_20px_rgba(192,132,252,0.15)]',
    },
  };

  const activeTheme = themeMap[type];
  const embedUrl = TALLY_EMBEDS[type];
  const directUrl = TALLY_DIRECT_LINKS[type];

  return (
    <div className={`w-[240px] sm:w-[260px] font-mono text-[10px] ${activeTheme.text} flex flex-col`}>
      {/* Interactive Frame Box Container */}
      <div className={`relative w-full h-[150px] border ${activeTheme.border} ${activeTheme.glow} bg-black/50 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-500 flex items-center justify-center`}>
        <AnimatePresence mode="wait">
          {!iframeLoaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/90 z-10"
            >
              <div className="relative flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border border-dashed animate-spin ${activeTheme.border}`} />
                <div className={`absolute w-2 h-2 rounded-full ${activeTheme.dot} animate-pulse`} />
              </div>
              <span className="text-[8px] uppercase tracking-[0.2em] text-neutral-400 animate-pulse">
                LOADING FORM...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title={`Tally Form ${type}`}
          onLoad={() => setIframeLoaded(true)}
          className="w-full h-full relative z-0 transition-opacity duration-500"
          style={{ opacity: iframeLoaded ? 1 : 0 }}
        />
      </div>
    </div>
  );
};
