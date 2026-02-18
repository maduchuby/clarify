'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  'Browser-integrated detection',
  'Instant authenticity scoring',
  'Deepfake probability analysis',
  'Media fingerprinting',
  'Real-time flagging overlays',
];

export default function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-container min-h-screen">
      <div className="max-w-6xl mx-auto z-10">
        <div className="text-center mb-16">
          <motion.p
            className="label-text mb-6 text-clarify-blue"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            THE SOLUTION
          </motion.p>

          <motion.h2
            className="heading-lg mb-8 gradient-text"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 30, filter: 'blur(10px)' }
            }
            transition={{ delay: 0.4, duration: 1.4 }}
          >
            Clarify verifies authenticity in real time.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Features list */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                className="glass-panel p-6 border-clarify-blue/20"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(0, 212, 255, 0.5)',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-clarify-blue rounded-full animate-pulse" />
                  <p className="text-lg text-white/90">{feature}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mock UI Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="glass-panel p-8 relative overflow-hidden">
              {/* Mock video thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-clarify-blue/10 to-transparent" />

                {/* Animated detection badge */}
                <motion.div
                  className="absolute top-4 right-4 glass-panel px-4 py-2 border-clarify-blue/50"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ delay: 1.5, duration: 0.6, type: 'spring' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-400">
                      Verified Authentic
                    </span>
                  </div>
                </motion.div>

                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-clarify-blue/20 to-transparent h-20"
                  animate={{
                    y: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'linear',
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Authenticity Score</span>
                  <span className="text-clarify-blue font-medium">98.7%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-clarify-blue to-green-400"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '98.7%' } : { width: 0 }}
                    transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
