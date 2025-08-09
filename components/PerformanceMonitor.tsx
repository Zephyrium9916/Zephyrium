import React, { useState, useEffect, useRef } from 'react';

const PerformanceMonitor: React.FC = () => {
  const [fps, setFps] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const fpsRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press 'P' to toggle visibility of performance monitor
      if (e.key === 'p' || e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const updateFps = (timestamp: number) => {
      if (lastFrameTimeRef.current) {
        const delta = timestamp - lastFrameTimeRef.current;
        const currentFps = 1000 / delta;
        
        fpsRef.current.push(currentFps);
        // Keep only the last 10 FPS values for averaging
        if (fpsRef.current.length > 10) {
          fpsRef.current.shift();
        }
        
        // Calculate average FPS
        const avgFps = fpsRef.current.reduce((sum, val) => sum + val, 0) / fpsRef.current.length;
        setFps(Math.round(avgFps));
      }
      
      lastFrameTimeRef.current = timestamp;
      requestAnimationFrame(updateFps);
    };

    const frameId = requestAnimationFrame(updateFps);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs z-50">
        Press 'P' to show performance monitor
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded shadow-lg z-50">
      <div className="text-sm font-mono">
        <div>FPS: {fps}</div>
        <div className="text-xs mt-1 opacity-75">Press 'P' to hide</div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;