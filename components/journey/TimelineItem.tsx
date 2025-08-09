'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItemData {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'past' | 'present' | 'future';
  icon?: React.ReactNode;
  image?: string;
}

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  isActive: boolean;
  onClick: () => void;
  layout: 'vertical' | 'horizontal';
  totalItems: number;
}

export const TimelineItem = ({ 
  item, 
  index, 
  isActive, 
  onClick,
  layout,
  totalItems
}: TimelineItemProps) => {
  // Determine status-based styling
  const getStatusColor = () => {
    switch (item.status) {
      case 'past':
        return 'from-green-500 to-emerald-500';
      case 'present':
        return 'from-blue-500 to-cyan-500';
      case 'future':
        return 'from-gray-500 to-gray-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getStatusGlow = () => {
    switch (item.status) {
      case 'past':
        return 'shadow-green-500/50';
      case 'present':
        return 'shadow-blue-500/50';
      case 'future':
        return 'shadow-gray-500/50';
      default:
        return 'shadow-gray-500/50';
    }
  };

  if (layout === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative flex flex-col items-center"
        style={{ width: `${100 / totalItems}%` }}
      >
        {/* Timeline item dot */}
        <div 
          className={`w-6 h-6 rounded-full bg-gradient-to-r ${getStatusColor()} flex items-center justify-center cursor-pointer ${isActive ? 'ring-4 ring-white/30 scale-110' : ''} transition-all duration-300`}
          onClick={onClick}
        >
          {item.icon && (
            <div className="text-white text-sm">
              {item.icon}
            </div>
          )}
        </div>
        
        {/* Date and title */}
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold text-gray-300">{item.date}</p>
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
        </div>
      </motion.div>
    );
  }

  // Vertical layout
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline item dot */}
      <div 
        className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r ${getStatusColor()} flex items-center justify-center cursor-pointer ${isActive ? 'ring-4 ring-white/30 scale-110' : ''} transition-all duration-300 shadow-lg ${getStatusGlow()}`}
        onClick={onClick}
      >
        {item.icon && (
          <div className="text-white text-sm">
            {item.icon}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="ml-12">
        <div className="mb-2">
          <span className="text-sm font-semibold text-gray-400">{item.date}</span>
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
        </div>
        <p className="text-gray-300">{item.description}</p>
        {item.image && (
          <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};