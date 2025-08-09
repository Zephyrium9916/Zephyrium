import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SparklesCore } from "./3d/SparklesCore";
import Vault3D from "../components/3d/Vault3D";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { useEffect } from "react";

export default function VaultGuardHero() {
  useEffect(() => {
    const ambient = new Howl({
      src: ["/sounds/vault-ambient.mp3"],
      volume: 0.2,
      autoplay: true,
      loop: true,
    });
    return () => {
      ambient.unload();
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Canvas className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <Vault3D />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          VaultGuard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="mt-4 text-lg md:text-xl max-w-2xl"
        >
          Zero-trust protection for your digital future — fortified with AI, encrypted by design.
        </motion.p>
      </div>

      <div className="absolute bottom-0 w-full z-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={150}
          className="w-full h-40"
          particleColor="#00C2FF"
        />
      </div>
    </div>
  );
}
