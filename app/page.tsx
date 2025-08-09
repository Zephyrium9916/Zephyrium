'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import * as THREE from 'three';
import PerformanceMonitor from '../components/PerformanceMonitor';

function SpinningLogo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (meshRef.current && !exploded) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
      }
    }, 16);
    return () => clearInterval(interval);
  }, [exploded]);

  const handleClick = () => {
    setExploded(true);
    // basic explode animation
    if (meshRef.current) {
      meshRef.current.geometry = new THREE.IcosahedronGeometry(1.5, 3);
    }
  };

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} onClick={handleClick}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color={'#38bdf8'} wireframe />
    </mesh>
  );
}

export default function HeroSection() {
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  useEffect(() => {
    // Only show the performance monitor on the client side
    setShowPerformanceMonitor(true);
    
    const ambient = new Howl({
      src: ['/ambient.mp3'],
      volume: 0.2,
      loop: true,
      autoplay: true,
    });
    ambient.play();
  }, []);

  return (
    <section className="relative h-screen w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <SpinningLogo />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-white to-cyan-400 text-transparent bg-clip-text">
          Zephyrium
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl">
          Where cybersecurity, intelligence, and innovation converge.
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="animate-bounce text-white">↓</div>
      </motion.div>
      
      {showPerformanceMonitor && <PerformanceMonitor />}
    </section>
  );
}
