"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface InteractiveOrbProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
  hoverColor?: string;
  intensity?: number;
}

// Helper function to detect mobile devices
const isMobileDevice = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(max-width: 768px)').matches;
  }
  return false;
};

export function InteractiveOrb({
  position = [0, 0, 0],
  size = 1,
  color = "#6366f1",
  hoverColor = "#8b5cf6",
  intensity = 1
}: InteractiveOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const [isHovered, setIsHovered] = useState(false);
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
  
  // Animate the orb
  useFrame(() => {
    if (meshRef.current) {
      // Subtle floating motion
      const time = performance.now() * 0.001;
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.1 * intensity;
      
      // Mouse follow effect (subtle, disabled on mobile)
      if (mouse && !isMobile) {
        const mouseX = mouse.x * 0.5 * intensity;
        meshRef.current.position.x = position[0] + mouseX;
        meshRef.current.position.z = position[2] + Math.sin(time * 0.5) * 0.05 * intensity;
      }
      
      // Scale based on hover state (disabled on mobile)
      const targetScale = (!isMobile && isHovered) ? size * 1.3 : size;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });
  
  // Handle mouse interaction (disabled on mobile)
  const handlePointerOver = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };
  
  const handlePointerOut = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
      <meshStandardMaterial
        color={(!isMobile && isHovered) ? hoverColor : color}
        emissive={(!isMobile && isHovered) ? hoverColor : color}
        emissiveIntensity={isMobile ? 0.2 : 0.3}
        roughness={isMobile ? 0.3 : 0.1}
        metalness={isMobile ? 0.7 : 0.9}
      />
    </mesh>
  );
}