'use client';

import React from 'react';
import { FullScreenSection } from './FullScreenSection';
import { BackgroundImage } from './BackgroundImage';
import { SectionContent } from './SectionContent';

export const JourneyDemo = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Genesis Section */}
      <FullScreenSection id="genesis">
        <BackgroundImage 
          gradientType="genesis"
          particleEffect={true}
          className="flex items-center justify-center"
        >
          <SectionContent
            title="The Genesis"
            subtitle="Where it all began with a vision to transform cybersecurity"
            align="center"
          >
            <div className="mt-8 max-w-2xl">
              <p className="text-lg text-gray-300 mb-6">
                In the early days of digital transformation, we recognized a critical gap in cybersecurity. 
                Traditional solutions were reactive, leaving organizations vulnerable to emerging threats.
              </p>
              <p className="text-lg text-gray-300">
                Our founders envisioned a proactive approach that could predict, prevent, and protect against 
                cyber threats before they materialized. This vision became the foundation of Zephyrium.
              </p>
            </div>
          </SectionContent>
        </BackgroundImage>
      </FullScreenSection>

      {/* Innovation Section */}
      <FullScreenSection id="innovation">
        <BackgroundImage 
          gradientType="innovation"
          particleEffect={true}
          className="flex items-center justify-center"
        >
          <SectionContent
            title="Innovation & Growth"
            subtitle="Pioneering next-generation threat intelligence"
            align="center"
          >
            <div className="mt-8 max-w-2xl">
              <p className="text-lg text-gray-300 mb-6">
                Our breakthrough came with the development of predictive threat intelligence. 
                By leveraging machine learning and quantum computing principles, we created 
                algorithms that could anticipate cyber threats before they occurred.
              </p>
              <p className="text-lg text-gray-300">
                This innovation positioned us as pioneers in proactive cybersecurity, 
                attracting partnerships with leading tech companies and government agencies worldwide.
              </p>
            </div>
          </SectionContent>
        </BackgroundImage>
      </FullScreenSection>

      {/* Growth Section */}
      <FullScreenSection id="growth">
        <BackgroundImage 
          gradientType="growth"
          particleEffect={true}
          className="flex items-center justify-center"
        >
          <SectionContent
            title="Exponential Growth"
            subtitle="Expanding our reach across the digital universe"
            align="center"
          >
            <div className="mt-8 max-w-2xl">
              <p className="text-lg text-gray-300 mb-6">
                With our innovative approach validated, we rapidly expanded our team and capabilities. 
                Our solutions were adopted by Fortune 500 companies, government agencies, and 
                emerging startups alike.
              </p>
              <p className="text-lg text-gray-300">
                Today, we protect over 10,000 organizations worldwide, processing trillions of 
                security events daily to keep the digital world safe.
              </p>
            </div>
          </SectionContent>
        </BackgroundImage>
      </FullScreenSection>

      {/* Future Section */}
      <FullScreenSection id="future">
        <BackgroundImage 
          gradientType="future"
          particleEffect={true}
          className="flex items-center justify-center"
        >
          <SectionContent
            title="The Future Awaits"
            subtitle="Continuing to push the boundaries of cybersecurity"
            align="center"
          >
            <div className="mt-8 max-w-2xl">
              <p className="text-lg text-gray-300 mb-6">
                Today, we continue to push the boundaries of what's possible in cybersecurity. 
                Our journey is far from over as we explore new frontiers in AI-driven security 
                and quantum-resistant encryption.
              </p>
              <p className="text-lg text-gray-300">
                The future of cybersecurity is not just about protection—it's about prediction, 
                prevention, and proactive defense. We're building that future, one innovation at a time.
              </p>
            </div>
          </SectionContent>
        </BackgroundImage>
      </FullScreenSection>
    </div>
  );
};