import React from 'react';
import { motion } from 'motion/react';
import { Domain } from '../types';

interface ArtifactProps {
  type: Domain;
  size?: 'large' | 'small' | 'mini';
  animate?: boolean;
}

export const Artifact: React.FC<ArtifactProps> = ({
  type,
  size = 'large',
  animate = true,
}) => {
  const isLarge = size === 'large';
  const widthClass = size === 'large' 
    ? 'w-full h-full max-w-[320px] max-h-[320px] md:max-w-[420px] md:max-h-[420px] main-artifact-container' 
    : size === 'mini' 
    ? 'w-10 h-10' 
    : 'w-8 h-8 md:w-20 md:h-20';

  // Specific glow settings based on domain type
  const colorMap = {
    paris: {
      neon: 'rgb(56, 189, 248)', // Sky blue neon
      glow: 'rgba(56, 189, 248, 0.8)',
      secondary: 'rgb(14, 165, 233)',
    },
    fr: {
      neon: 'rgb(34, 211, 238)', // Emerald/Cyan neon
      glow: 'rgba(34, 211, 238, 0.8)',
      secondary: 'rgb(6, 182, 212)',
    },
    eu: {
      neon: 'rgb(192, 132, 252)', // Violet/Orchid neon
      glow: 'rgba(192, 132, 252, 0.8)',
      secondary: 'rgb(168, 85, 247)',
    },
  };

  const { neon, glow, secondary } = colorMap[type];

  // Motion animation variants for drawing effect
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0.2 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 2.2, bounce: 0 },
        opacity: { duration: 1.2 },
      },
    },
  };

  const renderEiffelTriangle = () => {
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{
          filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 15px ${glow})`,
        }}
      >
        {/* Outer triangle pyramid */}
        <motion.polygon
          points="100,20 180,180 20,180"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "4" : "5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Eiffel-style curved arch at the base */}
        <motion.path
          d="M 50,180 Q 100,120 150,180"
          fill="none"
          stroke={secondary}
          strokeWidth={isLarge ? "3.5" : "5"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Horizontal girders */}
        <motion.line
          x1="76"
          y1="130"
          x2="124"
          y2="130"
          stroke={neon}
          strokeWidth={isLarge ? "3" : "4.5"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        <motion.line
          x1="62"
          y1="100"
          x2="138"
          y2="100"
          stroke={neon}
          strokeWidth={isLarge ? "3" : "4.5"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        <motion.line
          x1="45"
          y1="64"
          x2="155"
          y2="64"
          stroke={neon}
          strokeWidth={isLarge ? "3" : "4.5"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Eiffel-style X-lattice work inside */}
        {/* Top X (above y=64) */}
        <motion.line
          x1="100"
          y1="20"
          x2="84"
          y2="64"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2.5"}
          opacity="0.7"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        <motion.line
          x1="100"
          y1="20"
          x2="116"
          y2="64"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2.5"}
          opacity="0.7"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Upper middle lattice (between y=64 and y=100) */}
        <motion.line
          x1="84"
          y1="64"
          x2="138"
          y2="100"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2.5"}
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        <motion.line
          x1="116"
          y1="64"
          x2="62"
          y2="100"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2.5"}
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Lower middle lattice (between y=100 and y=130) */}
        <motion.line
          x1="62"
          y1="100"
          x2="124"
          y2="130"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2.5"}
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        <motion.line
          x1="138"
          y1="100"
          x2="76"
          y2="130"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2.5"}
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Base lattice (between y=130 and 180) */}
        <motion.line
          x1="76"
          y1="130"
          x2="150"
          y2="180"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2.5"}
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        <motion.line
          x1="124"
          y1="130"
          x2="50"
          y2="180"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2.5"}
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Internal fine shading - matching the sketches of the eiffel structure */}
        {isLarge && (
          <>
            {/* Fine horizontal deck stripes */}
            <motion.line x1="88" y1="40" x2="112" y2="40" stroke={secondary} strokeWidth="1" opacity="0.5" />
            <motion.line x1="72" y1="80" x2="128" y2="80" stroke={secondary} strokeWidth="1" opacity="0.5" />
            <motion.line x1="68" y1="115" x2="132" y2="115" stroke={secondary} strokeWidth="1" opacity="0.5" />
            
            {/* Fine lattice hatch lines */}
            <motion.path 
              d="M 35,180 L 60,150 M 165,180 L 140,150" 
              stroke={secondary} 
              strokeWidth="1.2" 
              opacity="0.6" 
            />
          </>
        )}
      </svg>
    );
  };

  const renderTortoiseHexagon = () => {
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{
          filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 15px ${glow})`,
        }}
      >
        {/* Outer perfect Hexagon */}
        <motion.polygon
          points="100,15 180,60 180,140 100,185 20,140 20,60"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "4" : "5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Tortoise Shell Plating (wavy-organic-geometric division) */}
        {/* Center plate (hexagonal-like organic form) */}
        <motion.path
          d="M 100,65 Q 128,70 135,100 Q 128,130 100,135 Q 72,130 65,100 Q 72,70 100,65 Z"
          fill="none"
          stroke={secondary}
          strokeWidth={isLarge ? "3" : "4.5"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Shell segment division beams branching outward from the center plate to vertices */}
        {/* Top center branch */}
        <motion.path
          d="M 100,65 Q 100,35 100,15"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "2" : "3"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        {/* Top-Right branch */}
        <motion.path
          d="M 135,100 T 180,60"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "2" : "3"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        {/* Bottom-Right branch */}
        <motion.path
          d="M 135,100 T 180,140"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "2" : "3"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        {/* Bottom center branch */}
        <motion.path
          d="M 100,135 Q 100,165 100,185"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "2" : "3"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        {/* Bottom-Left branch */}
        <motion.path
          d="M 65,100 T 20,140"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "2" : "3"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        {/* Top-Left branch */}
        <motion.path
          d="M 65,100 T 20,60"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "2" : "3"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Organic wavy concentric accents mimicking the tortoise sketch textures inside segments */}
        {isLarge && (
          <>
            {/* Top-left plate curves */}
            <motion.path d="M 40,55 Q 60,40 85,50" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
            
            {/* Top-right plate curves */}
            <motion.path d="M 115,50 Q 140,40 160,55" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
            
            {/* Right side plate curves */}
            <motion.path d="M 148,85 Q 165,100 148,115" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
            
            {/* Bottom-right plate curves */}
            <motion.path d="M 115,150 Q 140,160 160,145" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
            
            {/* Bottom-left plate curves */}
            <motion.path d="M 40,145 Q 60,160 85,150" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
            
            {/* Left side plate curves */}
            <motion.path d="M 52,85 Q 35,100 52,115" fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
            
            {/* Central concentric miniature cell */}
            <motion.path
              d="M 100,85 Q 115,88 118,100 Q 115,112 100,115 Q 85,112 82,100 Q 85,88 100,85"
              fill="none"
              stroke={secondary}
              strokeWidth="1.2"
              opacity="0.5"
            />
          </>
        )}
      </svg>
    );
  };

  const renderDocumentStackCube = () => {
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{
          filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 15px ${glow})`,
        }}
      >
        {/* Isometric 3D Cube Outline */}
        {/* Vertices:
            Top: (100, 20)
            Top-Right: (175, 60)
            Bottom-Right: (175, 140)
            Bottom: (100, 180)
            Bottom-Left: (25, 140)
            Top-Left: (25, 60)
            Center: (100, 100)
        */}

        {/* Dynamic layered document lines inside representing the "stack. These lines are stacked vertical partitions. */}
        {/* Left Face stacked lines */}
        {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => {
          const dy = i * 8; // spaced vertically
          return (
            <motion.line
              key={`left-fine-${i}`}
              x1="25"
              y1={60 + dy}
              x2="100"
              y2={100 + dy}
              stroke={secondary}
              strokeWidth={isLarge ? "1" : "1.5"}
              opacity="0.45"
              variants={animate ? lineVariants : undefined}
              initial="hidden"
              animate="visible"
            />
          );
        })}

        {/* Right Face stacked lines */}
        {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => {
          const dy = i * 8; // spaced vertically
          return (
            <motion.line
              key={`right-fine-${i}`}
              x1="100"
              y1={100 + dy}
              x2="175"
              y2={60 + dy}
              stroke={secondary}
              strokeWidth={isLarge ? "1" : "1.5"}
              opacity="0.45"
              variants={animate ? lineVariants : undefined}
              initial="hidden"
              animate="visible"
            />
          );
        })}

        {/* Bold document separators inside the stack (representing primary bundles) */}
        {[2, 5, 8, 11].map((step) => {
          const dy = step * 10;
          return (
            <g key={`bold-divider-${step}`}>
              <motion.line
                x1="25"
                y1={60 + dy}
                x2="100"
                y2={100 + dy}
                stroke={neon}
                strokeWidth={isLarge ? "2" : "3"}
                opacity="0.8"
                variants={animate ? lineVariants : undefined}
                initial="hidden"
                animate="visible"
              />
              <motion.line
                x1="100"
                y1={100 + dy}
                x2="175"
                y2={60 + dy}
                stroke={neon}
                strokeWidth={isLarge ? "2" : "3"}
                opacity="0.8"
                variants={animate ? lineVariants : undefined}
                initial="hidden"
                animate="visible"
              />
            </g>
          );
        })}

        {/* Top hexagonal-isometric cap face */}
        <motion.polygon
          points="100,20 175,60 100,100 25,60"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "4" : "5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Cube outer edges & main joints */}
        <motion.polyline
          points="25,60 25,140 100,180 175,140 175,60"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "4" : "5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Cube internal Y-axes */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="180"
          stroke={neon}
          strokeWidth={isLarge ? "3.5" : "5"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Top page text lines accent mimicking a document layout on the top face */}
        {isLarge && (
          <>
            <motion.line x1="60" y1="50" x2="100" y2="70" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
            <motion.line x1="75" y1="42" x2="120" y2="62" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
            <motion.line x1="90" y1="34" x2="115" y2="45" stroke={secondary} strokeWidth="1.5" opacity="0.4" />
            <motion.line x1="110" y1="45" x2="140" y2="31" stroke={secondary} strokeWidth="1.5" opacity="0.6" />
          </>
        )}
      </svg>
    );
  };

  return (
    <div className={`relative flex items-center justify-center ${widthClass}`}>
      {type === 'paris' && renderEiffelTriangle()}
      {type === 'fr' && renderTortoiseHexagon()}
      {type === 'eu' && renderDocumentStackCube()}
    </div>
  );
};
