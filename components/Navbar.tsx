'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarProps {
  onBetaTester: () => void;
  onWaitlist: () => void;
}

export default function Navbar({ onBetaTester, onWaitlist }: NavbarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 100px, hide once past the scroll video section (400vh)
      const scrollVideoHeight = window.innerHeight * 4;
      setVisible(window.scrollY > 100 && window.scrollY < scrollVideoHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        {/* Logo + Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <Image
            src="/images/clarify-logo-clean.png"
            alt="Clarify"
            width={36}
            height={36}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-[#1a1a1a] text-lg font-semibold tracking-wide">
            Clarify
          </span>
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-3 sm:gap-8">
          <button
            onClick={onBetaTester}
            className="text-[#1a1a1a]/50 text-xs sm:text-sm tracking-wide hover:text-[#1a1a1a] transition-colors duration-300"
          >
            Beta Tester
          </button>
          <button
            onClick={onWaitlist}
            className="text-[#1a1a1a]/50 text-xs sm:text-sm tracking-wide hover:text-[#1a1a1a] transition-colors duration-300"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}
