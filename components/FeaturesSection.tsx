'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: 'Video Detection',
    description: 'Analyze video content frame-by-frame to identify manipulated facial expressions, unnatural movements, and synthetic artifacts invisible to the human eye.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
    title: 'Audio Detection',
    description: 'Detect AI-generated voice clones, spliced audio, and synthetic speech patterns that attempt to impersonate real people.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    ),
    title: 'Image Detection',
    description: 'Spot AI-generated and manipulated images by analyzing pixel-level inconsistencies, lighting anomalies, and generative model fingerprints.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Invisible Stamping',
    description: 'Stamp photos and videos with cryptographic technology to create a database of verified media, proving authenticity at the source.',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Mockup + Description Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 tracking-tight">
              Deepfake detection,
              <br />
              <span className="text-[#2a4a6c]">built for everyone.</span>
            </h3>
            <p className="text-[#1a1a1a]/50 text-lg leading-relaxed mb-8">
              In a world where AI can generate fake videos, clone voices, and fabricate images in seconds, knowing what&apos;s real matters more than ever. Clarify puts enterprise-grade detection technology into the hands of everyday people.
            </p>
            <p className="text-[#1a1a1a]/50 text-lg leading-relaxed">
              No technical expertise required. Simply download the Clarify app or browser extension to receive instant deepfake alerts as you scroll through social media, browse the internet, or receive calls.
            </p>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Soft shadow behind phone */}
              <div className="absolute inset-0 bg-[#2a4a6c]/10 blur-[60px] rounded-full scale-125" />
              <Image
                src="/images/clarify-mockup-full.png"
                alt="Clarify App Mockup"
                width={316}
                height={558}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] tracking-tight mb-6">
            See What&apos;s Real
          </h2>
          <p className="text-[#1a1a1a]/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Clarify gives everyday people the power to detect deepfakes across video, audio, and images, instantly and effortlessly.
          </p>
        </motion.div>

        {/* Feature Cards - 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.5 + i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl border border-[#1a1a1a]/[0.06] bg-white/40 backdrop-blur-sm transition-all duration-500 hover:border-[#1a1a1a]/[0.12] hover:bg-white/60">
                {/* Icon */}
                <div className="mb-6 text-[#2a4a6c] transition-colors duration-300 group-hover:text-[#1a1a1a]">
                  {feature.icon}
                </div>

                {/* Title */}
                <h4 className="text-xl font-semibold text-[#1a1a1a] mb-3 tracking-tight">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-[#1a1a1a]/45 leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
