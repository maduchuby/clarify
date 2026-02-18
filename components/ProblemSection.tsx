'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-container min-h-screen">
      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.p
            className="label-text mb-6 text-red-400/80"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            THE CHALLENGE
          </motion.p>

          <motion.h2
            className="heading-lg mb-8 text-glow-red"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 30, filter: 'blur(10px)' }
            }
            transition={{ delay: 0.4, duration: 1.4 }}
          >
            We are entering an era where seeing is no longer believing.
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 1.2 }}
          >
            Deepfakes. Synthetic voices. AI-manipulated content spreading faster than truth.
            Every day, millions of fabricated videos and images flood the internet,
            eroding trust and distorting reality.
          </motion.p>

          {/* Glitch effect overlay */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {['Deepfakes', 'Synthetic Audio', 'Manipulated Media'].map((item, i) => (
              <motion.div
                key={item}
                className="glass-panel p-4 border-red-500/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 50, 50, 0.4)' }}
              >
                <p className="text-sm text-red-400/80 font-medium">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
