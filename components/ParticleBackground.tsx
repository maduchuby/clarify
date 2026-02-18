'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  mouse: THREE.Vector2;
  variant?: 'hero' | 'problem' | 'solution';
}

function Particles({ count = 3000, mouse, variant = 'hero' }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    if (variant === 'solution') {
      // Grid-like structure for solution section
      const gridSize = Math.cbrt(count);
      let i = 0;
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          for (let z = 0; z < gridSize; z++) {
            if (i < count * 3) {
              positions[i++] = (x - gridSize / 2) * 0.3 + (Math.random() - 0.5) * 0.1;
              positions[i++] = (y - gridSize / 2) * 0.3 + (Math.random() - 0.5) * 0.1;
              positions[i++] = (z - gridSize / 2) * 0.3 + (Math.random() - 0.5) * 0.1;
            }
          }
        }
      }
    } else {
      // Random cloud for hero and problem sections
      for (let i = 0; i < count; i++) {
        const distance = Math.sqrt(Math.random()) * 4;
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        const x = distance * Math.sin(theta) * Math.cos(phi);
        const y = distance * Math.sin(theta) * Math.sin(phi);
        const z = distance * Math.cos(theta);

        positions.set([x, y, z], i * 3);
      }
    }

    return positions;
  }, [count, variant]);

  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate slowly
    points.current.rotation.y = time * 0.05;

    // React to mouse movement
    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      mouse.y * 0.1,
      0.05
    );
    points.current.rotation.z = THREE.MathUtils.lerp(
      points.current.rotation.z,
      mouse.x * 0.1,
      0.05
    );

    // Subtle wave animation
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      positions[i + 1] += Math.sin(time + x) * 0.0005;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  const color = variant === 'problem' ? '#ff3232' : '#00d4ff';

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={variant === 'problem' ? 0.4 : 0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface ParticleBackgroundProps {
  variant?: 'hero' | 'problem' | 'solution';
  className?: string;
}

export default function ParticleBackground({
  variant = 'hero',
  className = ''
}: ParticleBackgroundProps) {
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particleCount = variant === 'problem' ? 1500 : variant === 'solution' ? 2000 : 3000;

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <fog attach="fog" args={['#050505', 3, 8]} />
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} mouse={mouse.current} variant={variant} />
      </Canvas>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-clarify-dark/50 to-clarify-dark pointer-events-none" />
    </div>
  );
}
