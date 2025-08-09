import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface BenefitIconProps {
  url: string
}

export default function BenefitIcon({ url }: BenefitIconProps) {
  const meshRef = useRef<Mesh>(null)
  const { scene } = useGLTF(url)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={[2, 2, 2]}
      position={[0, 0, 0]}
    />
  )
}

// Preload the models for better performance
useGLTF.preload('/icons/shield.glb')
useGLTF.preload('/icons/lock.glb')
useGLTF.preload('/icons/code.glb')
