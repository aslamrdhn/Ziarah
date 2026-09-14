import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Torus, Octahedron, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GeometricCompass() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.2;
      outerRingRef.current.rotation.x = Math.cos(t * 0.4) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Glow Ring */}
      <Torus ref={outerRingRef as any} args={[2.5, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </Torus>
      
      {/* Inner Wireframe Ring */}
      <Torus args={[2, 0.03, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#34d399" wireframe opacity={0.3} transparent />
      </Torus>

      {/* Core Distorted Gem */}
      <Octahedron args={[1.2]}>
        <MeshDistortMaterial 
          color="#022c22" 
          emissive="#064e3b" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0} 
          metalness={0.9} 
          roughness={0.1} 
          distort={0.4} 
          speed={2} 
        />
      </Octahedron>

      {/* Center Light */}
      <Sphere args={[0.15, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#6ee7b7" />
      </Sphere>
    </group>
  );
}

export const IslamicGeometry3D: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[50vh] md:h-[80vh] w-full opacity-60 mix-blend-screen"
      style={{
        maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
          <GeometricCompass />
        </Float>
        
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.5} fade speed={1} />
      </Canvas>
    </div>
  );
};
