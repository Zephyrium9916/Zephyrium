'use client';

import React, { ReactNode } from 'react';

interface FullScreenSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const FullScreenSection = ({ 
  children, 
  className = '',
  id
}: FullScreenSectionProps) => {
  return (
    <section 
      id={id}
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};