'use client';

import Navbar from '@/components/Navbar';
import ScrollVideo from '@/components/ScrollVideo';
import FeaturesSection from '@/components/FeaturesSection';
import WaitlistForm from '@/components/WaitlistForm';
import BetaForm from '@/components/BetaForm';
import Footer from '@/components/Footer';

export default function Home() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const scrollToBeta = () => {
    document.getElementById('beta')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div className="relative bg-[#f5f0eb]">
      {/* Navigation */}
      <Navbar onBetaTester={scrollToBeta} onWaitlist={scrollToWaitlist} />

      {/* Scroll-driven video hero */}
      <ScrollVideo />

      {/* Features + Mockup section */}
      <FeaturesSection />

      {/* Waitlist */}
      <WaitlistForm />

      {/* Beta Tester */}
      <BetaForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}
