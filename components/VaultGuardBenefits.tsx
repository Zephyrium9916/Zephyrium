// VaultGuard Benefits Section with 3D Icons

import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Html, Float, Environment } from '@react-three/drei'
import BenefitIcon from './3d/BenefitIcon'

const benefits = [
  {
    title: 'Real-Time Threat Detection',
    description: 'VaultGuard continuously monitors and detects suspicious activities before they escalate.',
    icon: '/icons/shield.glb',
  },
  {
    title: 'Privacy-First Architecture',
    description: 'Built with zero data retention and secure end-to-end encryption by default.',
    icon: '/icons/lock.glb',
  },
  {
    title: 'Seamless Developer Integration',
    description: 'Easy-to-use APIs and drop-in components make security integration painless.',
    icon: '/icons/code.glb',
  },
]

export default function VaultGuardBenefits() {
  return (
    <section className="relative z-10 min-h-screen px-6 py-24 text-white bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center md:text-5xl"
        >
          Why Choose VaultGuard?
        </motion.h2>
        <div className="grid gap-16 mt-20 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-full h-48">
                <Canvas camera={{ position: [0, 0, 4] }}>
                  <ambientLight intensity={0.5} />
                  <Suspense fallback={<Html>Loading...</Html>}>
                    <Environment preset="night" />
                    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                      <BenefitIcon url={benefit.icon} />
                    </Float>
                  </Suspense>
                </Canvas>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
