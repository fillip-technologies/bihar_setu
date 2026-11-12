import React, { useEffect } from 'react';
import PartnersHero from '../components/partners/PartnersHero';
import PartnersShowcase from '../components/partners/PartnersShowcase';
import GetInTouch from '../components/home/GetInTouch';

export default function Partners() {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero Banner with 'PARTNERS 2026' */}
      <PartnersHero />

      {/* 2. Official Partners & Organizers Showcase */}
      <PartnersShowcase />

      {/* 3. Get In Touch Section (Reused from Home) */}
      <GetInTouch />
    </div>
  );
}

