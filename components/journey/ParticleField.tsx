"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  speed?: number;
  opacity?: number;
  mobileParticleCount?: number;
}

// Helper function to detect mobile devices
const isMobileDevice = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(max-width: 768px)').matches;
  }
  return false;
};

export function ParticleField({
  particleCount = 200,
  particleSize = 0.02,
  particleColor = "#6366f1",
  speed = 0.2,
  opacity = 0.6,
  mobileParticleCount = 50
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Create particle positions
  const particles = useMemo(() => {
    const count = isMobile ? mobileParticleCount : particleCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const color = new THREE.Color(particleColor);
    
    for (let i = 0; i < count; i++) {
      // Position particles in a spherical distribution
      const radius = 5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color variation
      const colorVariation = 0.7 + Math.random() * 0.3;
      colors[i * 3] = color.r * colorVariation;
      colors[i * 3 + 1] = color.g * colorVariation;
      colors[i * 3 + 2] = color.b * colorVariation;
    }
    
    return { positions, colors };
  }, [particleCount, mobileParticleCount, particleColor, isMobile]);
  
  // Animate particles
  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation for ambient movement
      pointsRef.current.rotation.y += speed * 0.002;
      pointsRef.current.rotation.x += speed * 0.001;
    }
    
    // Pulsing opacity effect
    if (materialRef.current) {
      materialRef.current.opacity = opacity * (0.8 + 0.2 * Math.sin(state.clock.getElapsedTime() * 0.5));
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particles.colors.length / 3}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={particleSize}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}