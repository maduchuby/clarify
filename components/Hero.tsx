'use client';

import { motion } from 'framer-motion';
import AnymaFace from './AnymaFace';

interface HeroProps {
  onJoinWaitlist: () => void;
  onBetaAccess: () => void;
}

export default function Hero({ onJoinWaitlist, onBetaAccess }: HeroProps) {
  return (
    <section className="section-container min-h-screen py-12">
      <div className="max-w-7xl mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <motion.div
          className="text-center lg:text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.p
            className="label-text mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            POWERED BY AI
          </motion.p>

          <motion.h1
            className="heading-xl mb-6 gradient-text"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 1.4, ease: 'easeOut' }}
          >
            See What&apos;s Real.
          </motion.h1>

          <motion.p
            className="subheading mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            Real-time AI detection for a world of synthetic media.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <motion.button
              onClick={onJoinWaitlist}
              className="glow-button-primary w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Waitlist
            </motion.button>

            <motion.button
              onClick={onBetaAccess}
              className="glow-button w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Become a Beta Tester
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right side - Interactive Face */}
        <motion.div
          className="order-1 lg:order-2 flex items-center justify-center pb-20 lg:pb-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.4, ease: 'easeOut' }}
        >
          <AnymaFace />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 1 },
          y: { delay: 2.5, duration: 2, repeat: Infinity }
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white/70 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
