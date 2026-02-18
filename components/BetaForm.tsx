'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function BetaForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    reason: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/beta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', reason: '' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section ref={ref} id="beta" className="relative py-32 md:py-40 px-6 md:px-10">
      {/* Subtle divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#1a1a1a]/[0.06] to-transparent" />

      <div className="max-w-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 text-center tracking-tight">
            Become a Beta Tester
          </h2>

          <p className="text-[#1a1a1a]/45 text-center mb-12 text-lg">
            Help shape the future of deepfake detection. Get exclusive early access.
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
                <label htmlFor="beta-name" className="block text-sm text-[#1a1a1a]/50 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="beta-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-[#f5f0eb]/80 border border-[#1a1a1a]/[0.08] rounded-xl text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a]/20 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label htmlFor="beta-email" className="block text-sm text-[#1a1a1a]/50 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="beta-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-[#f5f0eb]/80 border border-[#1a1a1a]/[0.08] rounded-xl text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a]/20 transition-colors"
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm text-[#1a1a1a]/50 mb-2">
                  Company / Role
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-[#f5f0eb]/80 border border-[#1a1a1a]/[0.08] rounded-xl text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a]/20 transition-colors"
                  placeholder="Acme Corp — Product Manager"
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm text-[#1a1a1a]/50 mb-2">
                  Why are you interested?
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-5 py-3.5 bg-[#f5f0eb]/80 border border-[#1a1a1a]/[0.08] rounded-xl text-[#1a1a1a] placeholder:text-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a]/20 transition-colors resize-none"
                  placeholder="Tell us about your use case..."
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
                {isSubmitting ? 'Submitting...' : 'Apply for Beta Access'}
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
              <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">Application Received</h3>
              <p className="text-[#1a1a1a]/45">Our team will review your application and reach out shortly.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
