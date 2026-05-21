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
    ? 'w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px] main-artifact-container' 
    : size === 'mini' 
    ? 'w-10 h-10' 
    : 'w-8 h-8 md:w-14 md:h-14';

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
        {/* Concentric Hexagon 1: Outer Hexagon */}
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

        {/* Concentric Hexagon 2: Mid Hexagon */}
        <motion.polygon
          points="100,45 156,77 156,123 100,155 44,123 44,77"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "2" : "3"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Concentric Hexagon 3: Inner Hexagon */}
        <motion.polygon
          points="100,75 126,90 126,110 100,125 74,110 74,90"
          fill="none"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Concentric Hexagon 4: Core Hexagon */}
        <motion.polygon
          points="100,88 111,94 111,106 100,112 89,106 89,94"
          fill="none"
          stroke={neon}
          strokeWidth={isLarge ? "1" : "1.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Core Radiating Axes */}
        {/* Vertical Center Axis */}
        <motion.line
          x1="100"
          y1="15"
          x2="100"
          y2="185"
          stroke={neon}
          strokeWidth={isLarge ? "2.5" : "3"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        {/* Diagonal Axis (Top-Left to Bottom-Right) */}
        <motion.line
          x1="20"
          y1="60"
          x2="180"
          y2="140"
          stroke={neon}
          strokeWidth={isLarge ? "1.5" : "2"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        {/* Diagonal Axis (Bottom-Left to Top-Right) */}
        <motion.line
          x1="20"
          y1="140"
          x2="180"
          y2="60"
          stroke={neon}
          strokeWidth={isLarge ? "1.5" : "2"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Left inner vertical sub-strut */}
        <motion.line
          x1="44"
          y1="77"
          x2="44"
          y2="123"
          stroke={secondary}
          strokeWidth={isLarge ? "1" : "1.5"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        {/* Right inner vertical sub-strut */}
        <motion.line
          x1="156"
          y1="77"
          x2="156"
          y2="123"
          stroke={secondary}
          strokeWidth={isLarge ? "1" : "1.5"}
          strokeLinecap="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Upper nested chevrons / parallel elements mimicking the screenshot's fine spiderweb layout */}
        <motion.line
          x1="100"
          y1="30"
          x2="168"
          y2="68"
          stroke={secondary}
          strokeWidth="1"
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        <motion.line
          x1="100"
          y1="30"
          x2="32"
          y2="68"
          stroke={secondary}
          strokeWidth="1"
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Lower nested chevrons */}
        <motion.line
          x1="100"
          y1="170"
          x2="168"
          y2="132"
          stroke={secondary}
          strokeWidth="1"
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />
        <motion.line
          x1="100"
          y1="170"
          x2="32"
          y2="132"
          stroke={secondary}
          strokeWidth="1"
          opacity="0.8"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Left side Chevron "<" */}
        <motion.path
          d="M 50,85 L 30,100 L 50,115"
          fill="none"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Right side Chevron ">" */}
        <motion.path
          d="M 150,85 L 170,100 L 150,115"
          fill="none"
          stroke={secondary}
          strokeWidth={isLarge ? "1.5" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={animate ? lineVariants : undefined}
          initial="hidden"
          animate="visible"
        />

        {/* Extra fine aesthetic concentric rings/crossings if Large rendering */}
        {isLarge && (
          <>
            <motion.polygon
              points="100,55 139,77 139,123 100,145 61,123 61,77"
              fill="none"
              stroke={secondary}
              strokeWidth="0.75"
              opacity="0.5"
            />
            {/* Fine concentric web diagonals */}
            <motion.line x1="44" y1="77" x2="100" y2="45" stroke={secondary} strokeWidth="1" opacity="0.6" />
            <motion.line x1="156" y1="77" x2="100" y2="45" stroke={secondary} strokeWidth="1" opacity="0.6" />
            <motion.line x1="44" y1="123" x2="100" y2="155" stroke={secondary} strokeWidth="1" opacity="0.6" />
            <motion.line x1="156" y1="123" x2="100" y2="155" stroke={secondary} strokeWidth="1" opacity="0.6" />
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
