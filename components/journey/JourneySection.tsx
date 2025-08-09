'use client';

import { motion } from 'framer-motion';
import { SparklesCore } from '../magic/Sparkles';
import SectionWrapper from '../shared/SectionWrapper';

export default function JourneySection() {
  return (
    <SectionWrapper id="journey" className="bg-black text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center z-10 relative px-4 md:px-12 lg:px-32 pt-32"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">The Zephyrium Journey</h2>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
          From humble code to galactic firewalls, our journey has always been one of creation,
          protection, and transformation. Let us take you through the sparks, the storms,
          and the singularities that forged our mission.
        </p>
      </motion.div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#00FFFF"
        />
      </div>
    </SectionWrapper>
  );
}
