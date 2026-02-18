'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 md:px-10 border-t border-[#1a1a1a]/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/clarify-logo-clean.png"
            alt="Clarify"
            width={28}
            height={28}
          />
          <span className="text-[#1a1a1a]/50 text-sm">
            Clarify
          </span>
        </div>

        <p className="text-[#1a1a1a]/25 text-sm">
          &copy; {new Date().getFullYear()} Clarify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
