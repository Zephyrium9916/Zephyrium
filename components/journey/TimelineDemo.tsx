'use client';

import React from 'react';
import { Timeline } from './Timeline';
import { MilestoneCard } from './MilestoneCard';

export const TimelineDemo = () => {
  // Sample timeline data
  const timelineItems = [
    {
      id: '1',
      title: 'Company Founded',
      date: 'January 2020',
      description: 'Zephyrium was founded with a vision to revolutionize cybersecurity through proactive threat detection.',
      status: 'past' as const,
      icon: '🚀'
    },
    {
      id: '2',
      title: 'First Product Launch',
      date: 'June 2021',
      description: 'Launched our flagship product, VaultGuard, which became the industry standard for enterprise security.',
      status: 'past' as const,
      icon: '🛡️'
    },
    {
      id: '3',
      title: 'Series A Funding',
      date: 'March 2022',
      description: 'Secured $15M in Series A funding to expand our team and accelerate product development.',
      status: 'past' as const,
      icon: '💰'
    },
    {
      id: '4',
      title: 'Global Expansion',
      date: 'September 2023',
      description: 'Opened offices in London, Singapore, and Tokyo to serve our growing international client base.',
      status: 'present' as const,
      icon: '🌍'
    },
    {
      id: '5',
      title: 'AI-Powered Security',
      date: 'Q2 2024',
      description: 'Integrating advanced AI algorithms to predict and prevent cyber threats before they occur.',
      status: 'future' as const,
      icon: '🤖'
    },
    {
      id: '6',
      title: 'Quantum Encryption',
      date: '2025',
      description: 'Developing quantum-resistant encryption to protect against future quantum computing threats.',
      status: 'future' as const,
      icon: '⚛️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Our Journey
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the key milestones that have shaped Zephyrium into the industry leader we are today.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Vertical Timeline</h2>
          <Timeline items={timelineItems} layout="vertical" />
        </div>

        {/* Horizontal Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Horizontal Timeline</h2>
          <Timeline items={timelineItems} layout="horizontal" />
        </div>

        {/* Milestone Cards */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Milestone Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timelineItems.map((item) => (
              <MilestoneCard
                key={item.id}
                title={item.title}
                date={item.date}
                description={item.description}
                status={item.status}
                icon={<span>{item.icon}</span>}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};