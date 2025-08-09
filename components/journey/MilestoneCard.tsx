'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MilestoneCardProps {
  title: string;
  date: string;
  description: string;
  status: 'past' | 'present' | 'future';
  icon?: React.ReactNode;
  image?: string;
  className?: string;
}

export const MilestoneCard = ({ 
  title, 
  date, 
  description, 
  status,
  icon,
  image,
  className = ''
}: MilestoneCardProps) => {
  // Determine status-based styling
  const getStatusColor = () => {
    switch (status) {
      case 'past':
        return 'from-green-500/20 to-emerald-500/10 border-green-500/30';
      case 'present':
        return 'from-blue-500/20 to-cyan-500/10 border-blue-500/30';
      case 'future':
        return 'from-gray-500/20 to-gray-700/10 border-gray-500/30';
      default:
        return 'from-gray-500/20 to-gray-700/10 border-gray-500/30';
    }
  };

  const getStatusGlow = () => {
    switch (status) {
      case 'past':
        return 'shadow-green-500/20';
      case 'present':
        return 'shadow-blue-500/20';
      case 'future':
        return 'shadow-gray-500/20';
      default:
        return 'shadow-gray-500/20';
    }
  };

  const getStatusAccent = () => {
    switch (status) {
      case 'past':
        return 'text-green-400';
      case 'present':
        return 'text-blue-400';
      case 'future':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${getStatusColor()} border rounded-2xl p-6 backdrop-blur-sm ${getStatusGlow()} shadow-xl ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`text-sm font-semibold ${getStatusAccent()}`}>{date}</span>
          <h3 className="text-2xl font-bold text-white mt-1">{title}</h3>
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStatusColor().split(' ')[0]} flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
      
      <p className="text-gray-300 mb-6">{description}</p>
      
      {image && (
        <div className="rounded-xl overflow-hidden border border-white/10">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        </div>
      )}
    </motion.div>
  );
};