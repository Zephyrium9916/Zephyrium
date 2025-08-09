"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SparklesCoreProps {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export function SparklesCore({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.2,
  particleDensity = 150,
  className = "",
  particleColor = "#00C2FF",
}: SparklesCoreProps) {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleDensity; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [particleDensity]);

  const colors = useMemo(() => {
    const color = new THREE.Color(particleColor);
    const temp = [];
    for (let i = 0; i < particleDensity; i++) {
      temp.push(color.r, color.g, color.b);
    }
    return new Float32Array(temp);
  }, [particleDensity, particleColor]);

  const sizes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleDensity; i++) {
      temp.push(Math.random() * (maxSize - minSize) + minSize);
    }
    return new Float32Array(temp);
  }, [particleDensity, minSize, maxSize]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
          args={[particles, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={sizes.length}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
