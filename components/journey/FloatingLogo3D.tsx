"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

interface FloatingLogo3DProps {
  position?: [number, number, number];
  scale?: number;
}

// Helper function to detect mobile devices
const isMobileDevice = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(max-width: 768px)').matches;
  }
  return false;
};

export function FloatingLogo3D({
  position = [0, 0, 0],
  scale = 1
}: FloatingLogo3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
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

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Gentle floating motion
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
      meshRef.current.rotation.y = time * 0.2;
    }
    
    // Inner rotation for visual interest (slower on mobile)
    if (innerRef.current) {
      const rotationSpeed = isMobile ? 0.15 : 0.3;
      innerRef.current.rotation.x = time * rotationSpeed;
      innerRef.current.rotation.z = time * (isMobile ? 0.05 : 0.1);
    }
  });

  return (
    <Float
      speed={isMobile ? 1 : 2}
      rotationIntensity={isMobile ? 0.2 : 0.5}
      floatIntensity={isMobile ? 0.2 : 0.5}
    >
      <group position={position} ref={meshRef}>
        {/* Outer geometric shape - Icosahedron */}
        <mesh scale={[scale * 1.5, scale * 1.5, scale * 1.5]}>
          <icosahedronGeometry args={[1, isMobile ? 0 : 1]} />
          <meshStandardMaterial
            color="#6366f1"
            wireframe={true}
            transparent={true}
            opacity={isMobile ? 0.2 : 0.3}
          />
        </mesh>
        
        {/* Inner geometric shape - Octahedron */}
        <mesh ref={innerRef} scale={[scale, scale, scale]}>
          <octahedronGeometry args={[0.8, isMobile ? 0 : 1]} />
          {isMobile ? (
            <meshStandardMaterial
              color="#8b5cf6"
              transparent={true}
              opacity={0.6}
            />
          ) : (
            <MeshTransmissionMaterial
              color="#8b5cf6"
              transmission={0.9}
              roughness={0.1}
              thickness={0.5}
              ior={1.5}
              chromaticAberration={0.02}
              opacity={0.8}
              transparent={true}
            />
          )}
        </mesh>
        
        {/* Core sphere */}
        <mesh scale={[scale * 0.4, scale * 0.4, scale * 0.4]}>
          <sphereGeometry args={[1, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
          <meshStandardMaterial
            color="#00C2FF"
            emissive="#0088ff"
            emissiveIntensity={isMobile ? 0.3 : 0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}