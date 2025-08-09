'use client';

import React, { ReactNode } from 'react';

interface SectionContentProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionContent = ({ 
  children,
  title,
  subtitle,
  align = 'center',
  className = '',
  contentClassName = '',
  titleClassName = '',
  subtitleClassName = ''
}: SectionContentProps) => {
  // Determine text alignment classes
  const getTextAlignClass = () => {
    switch (align) {
      case 'left': return 'text-left items-start';
      case 'right': return 'text-right items-end';
      case 'center': return 'text-center items-center';
      default: return 'text-center items-center';
    }
  };

  // Determine content alignment classes
  const getContentAlignClass = () => {
    switch (align) {
      case 'left': return 'items-start text-left';
      case 'right': return 'items-end text-right';
      case 'center': return 'items-center text-center';
      default: return 'items-center text-center';
    }
  };

  return (
    <div className={`flex flex-col w-full max-w-6xl mx-auto px-4 md:px-8 ${className}`}>
      {/* Title and subtitle */}
      {(title || subtitle) && (
        <div className={`mb-8 ${getTextAlignClass()}`}>
          {title && (
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 ${titleClassName}`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto ${subtitleClassName}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Main content */}
      <div className={`flex flex-col ${getContentAlignClass()} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};