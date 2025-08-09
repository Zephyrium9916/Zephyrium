'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TimelineItem } from './TimelineItem';

interface TimelineProps {
  items: TimelineItemProps[];
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

interface TimelineItemProps {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'past' | 'present' | 'future';
  icon?: React.ReactNode;
  image?: string;
}

export const Timeline = ({ 
  items, 
  layout = 'vertical',
  className = ''
}: TimelineProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Set the first item as active by default
    if (items.length > 0 && !activeItem) {
      setActiveItem(items[0].id);
    }
  }, [items, activeItem]);

  const handleItemClick = (id: string) => {
    setActiveItem(id);
  };

  // Determine if we should show the horizontal layout (on larger screens)
  const isHorizontal = layout === 'horizontal' && typeof window !== 'undefined' && window.innerWidth >= 1024;

  return (
    <div 
      ref={timelineRef}
      className={`w-full ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className={`${isHorizontal ? 'flex justify-center' : ''}`}
      >
        {isHorizontal ? (
          // Horizontal Timeline
          <div className="relative w-full max-w-6xl">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 transform -translate-y-1/2 rounded-full"></div>
            
            {/* Timeline items */}
            <div className="relative flex justify-between">
              {items.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={activeItem === item.id}
                  onClick={() => handleItemClick(item.id)}
                  layout="horizontal"
                  totalItems={items.length}
                />
              ))}
            </div>
          </div>
        ) : (
          // Vertical Timeline
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 rounded-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-12 pl-12">
              {items.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={activeItem === item.id}
                  onClick={() => handleItemClick(item.id)}
                  layout="vertical"
                  totalItems={items.length}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};