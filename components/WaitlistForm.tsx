'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function WaitlistForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section ref={ref} id="waitlist" className="relative py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 text-center tracking-tight">
            Join the Waitlist
          </h2>

          <p className="text-[#1a1a1a]/45 text-center mb-12 text-lg">
            Be among the first to experience the future of media authenticity.
          </p>

          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5 p-8 md:p-10 rounded-2xl border border-[#1a1a1a]/[0.06] bg-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div>
                <label htmlFor="fullName" className="block text-sm text-[#1a1a1a]/50 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-[#f5f0eb]/80 border border-[#1a1a1a]/[0.08] rounded-xl text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a]/20 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="wl-email" className="block text-sm text-[#1a1a1a]/50 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="wl-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-[#f5f0eb]/80 border border-[#1a1a1a]/[0.08] rounded-xl text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a]/20 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-[#1a1a1a]/50 mb-2">
                  Phone <span className="text-[#1a1a1a]/25">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-[#f5f0eb]/80 border border-[#1a1a1a]/[0.08] rounded-xl text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a]/20 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {error && (
                <p className="text-red-500/80 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#1a1a1a] text-[#f5f0eb] font-medium text-sm tracking-wide hover:bg-[#1a1a1a]/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
              </button>
            </motion.form>
          ) : (
            <motion.div
              className="p-12 text-center rounded-2xl border border-[#1a1a1a]/[0.06] bg-white/50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#1a1a1a]/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">You&apos;re on the list</h3>
              <p className="text-[#1a1a1a]/45">We&apos;ll notify you as soon as Clarify launches.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
