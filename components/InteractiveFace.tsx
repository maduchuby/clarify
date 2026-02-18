'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function InteractiveFace() {
  const faceRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform values for depth effect
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

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
      className="relative w-full max-w-2xl mx-auto aspect-[3/4] md:aspect-[4/5]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main face container with 3D transform */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 1000,
        }}
      >
        {/* Face image placeholder - replace with actual image */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* Gradient placeholder for face - replace with actual image */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
            {/* SVG Face Placeholder */}
            <svg
              viewBox="0 0 400 500"
              className="w-full h-full object-cover opacity-40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head outline */}
              <ellipse cx="200" cy="220" rx="120" ry="160" fill="url(#faceGradient)" />

              {/* Eyes */}
              <ellipse cx="170" cy="200" rx="15" ry="20" fill="#00d4ff" opacity="0.8" />
              <ellipse cx="230" cy="200" rx="15" ry="20" fill="#00d4ff" opacity="0.8" />

              {/* Pupils with glow */}
              <circle cx="170" cy="200" r="8" fill="#fff">
                <animate attributeName="opacity" values="1;0.5;1" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="230" cy="200" r="8" fill="#fff">
                <animate attributeName="opacity" values="1;0.5;1" dur="4s" repeatCount="indefinite" />
              </circle>

              {/* Nose */}
              <path d="M 200 220 L 195 245 L 205 245 Z" fill="#00d4ff" opacity="0.3" />

              {/* Mouth */}
              <path d="M 170 270 Q 200 280 230 270" stroke="#00d4ff" strokeWidth="3" opacity="0.6" fill="none" />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="faceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Overlays for effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-clarify-dark via-transparent to-transparent opacity-60" />

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-clarify-blue to-transparent opacity-60"
            animate={{
              y: ['0%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'linear',
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Clip-path reveal overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-clarify-blue/10 backdrop-blur-sm"
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{
              clipPath: isHovered ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)',
            }}
            transition={{ duration: 0.75, ease: [0.65, 0.05, 0, 1] }}
          />
        </div>

        {/* Floating particles around face */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-clarify-blue rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-clarify-blue/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-clarify-blue/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-clarify-blue/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-clarify-blue/50 rounded-br-2xl" />
      </motion.div>

      {/* Authenticity badge */}
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glass-panel px-6 py-3 border-clarify-blue/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-clarify-blue">Identity Verified</span>
        </div>
      </motion.div>

      {/* Text overlay - instruction */}
      <motion.p
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-xs text-white/40 tracking-wide whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Move your cursor to interact
      </motion.p>
    </div>
  );
}
