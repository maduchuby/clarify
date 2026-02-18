'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AnymaFace() {
  const faceRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [fragments, setFragments] = useState<Array<{x: number, y: number, rotation: number}>>([]);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  // Generate fragment positions
  useEffect(() => {
    const newFragments = Array.from({ length: 50 }, (_, i) => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      rotation: Math.random() * 360,
    }));
    setFragments(newFragments);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return;

      const rect = faceRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={faceRef}
      className="relative w-full max-w-2xl mx-auto aspect-[3/4]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main face container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 1000,
        }}
      >
        {/* Face image container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* REPLACE THIS WITH YOUR AI-GENERATED FACE IMAGE */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isHovered ? 0.3 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/api/placeholder/800/1000"
              alt="Human face"
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(1.1) saturate(0.9)',
              }}
            />
          </motion.div>

          {/* Particle fragmentation overlay - Anyma style */}
          <div className="absolute inset-0 pointer-events-none">
            {fragments.map((fragment, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-clarify-blue/60 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={isHovered ? {
                  x: fragment.x,
                  y: fragment.y,
                  rotate: fragment.rotation,
                  scale: [1, 1.5, 0],
                  opacity: [0.8, 0.5, 0],
                } : {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.01,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Digital grid overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Glitch effect lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`glitch-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-clarify-blue to-transparent"
              style={{ top: `${20 + i * 15}%` }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 3 + i * 0.5,
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Breathing pulse overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-clarify-blue/20 via-transparent to-transparent"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Scanning line - continuous */}
          <motion.div
            className="absolute inset-0 h-2 bg-gradient-to-r from-transparent via-clarify-blue/80 to-transparent blur-sm"
            animate={{
              y: ['0%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 0.5,
            }}
          />

          {/* Face fragmentation shader effect */}
          <motion.div
            className="absolute inset-0 mix-blend-overlay"
            style={{
              background: `
                radial-gradient(circle at 30% 40%, rgba(0, 212, 255, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(0, 212, 255, 0.2) 0%, transparent 50%)
              `,
            }}
            animate={{
              opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Geometric overlay shapes - Anyma style */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Orbiting circles */}
            <motion.circle
              cx="200"
              cy="250"
              r="150"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, rotate: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                rotate: 360,
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            <motion.circle
              cx="200"
              cy="250"
              r="180"
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, rotate: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                rotate: -360,
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </svg>

          {/* Corner frames */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-clarify-blue/60 rounded-tl-2xl">
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-clarify-blue/60 rounded-tr-2xl">
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-clarify-blue/60 rounded-bl-2xl">
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-clarify-blue/60 rounded-br-2xl">
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
          </div>
        </div>

        {/* Floating data particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-clarify-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Status indicators */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 glass-panel px-8 py-3 border-clarify-blue/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-clarify-blue tracking-wide">
            AUTHENTICITY VERIFIED
          </span>
        </div>
      </motion.div>
    </div>
  );
}
