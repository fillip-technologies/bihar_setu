import React, { useEffect } from 'react';
import EnquireHero from '../components/enquire/EnquireHero';
import EnquireForm from '../components/enquire/EnquireForm';
import GetInTouch from '../components/home/GetInTouch';

export default function Enquire() {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero Banner with 'ENQUIRE NOW' */}
      <EnquireHero />

      {/* 2. Structured Enquiry Form with all 38 Districts & 11 Categories */}
      <EnquireForm />

      {/* 3. Get In Touch Section (Reused from Home) */}
      <GetInTouch />
    </div>
  );
}

