'use client';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function SectionWrapper({ 
  children, 
  id, 
  className = '' 
}: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={`relative ${className}`}
    >
      {children}
    </section>
  );
}
