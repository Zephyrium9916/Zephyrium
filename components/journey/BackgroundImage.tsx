'use client';

import React, { ReactNode } from 'react';

interface BackgroundImageProps {
  children?: ReactNode;
  imageUrl?: string;
  gradientType?: 'genesis' | 'innovation' | 'growth' | 'future' | 'none';
  particleEffect?: boolean;
  className?: string;
}

export const BackgroundImage = ({ 
  children,
  imageUrl,
  gradientType = 'none',
  particleEffect = false,
  className = ''
}: BackgroundImageProps) => {
  // Define gradient overlays based on theme
  const getGradientOverlay = () => {
    switch (gradientType) {
      case 'genesis':
        // Dark, mysterious beginnings with subtle light
        return 'bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-800/40';
      case 'innovation':
        // Futuristic, tech-focused imagery
        return 'bg-gradient-to-br from-blue-900/70 via-indigo-900/50 to-purple-900/30';
      case 'growth':
        // Expansive, upward-reaching visuals
        return 'bg-gradient-to-br from-emerald-900/60 via-teal-900/40 to-cyan-900/20';
      case 'future':
        // Ethereal, forward-looking scenes
        return 'bg-gradient-to-br from-violet-900/70 via-purple-900/50 to-fuchsia-900/30';
      default:
        return 'bg-gradient-to-br from-black/60 to-black/40';
    }
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Background Image */}
      {imageUrl ? (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            // Fallback background color if image fails to load
            backgroundColor: 'rgb(15, 23, 42)' // slate-900
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      )}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${getGradientOverlay()}`} />

      {/* Particle Effect Container */}
      {particleEffect && (
        <div className="absolute inset-0">
          {/* Particle effect implementation would go here */}
          {/* For now, we'll add a subtle animated pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_70%)]" />
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};