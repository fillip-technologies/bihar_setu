import React, { useEffect } from 'react';
import GetInvolvedHero from '../components/getInvolved/GetInvolvedHero';
import PassPricingTable from '../components/getInvolved/PassPricingTable';
import GetInTouch from '../components/home/GetInTouch';

export default function GetInvolved() {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero Banner with 'GET YOUR PASS' */}
      <GetInvolvedHero />

      {/* 2. Pass Pricing & Feature Comparison Table */}
      <PassPricingTable />

      {/* 3. Get In Touch Section (Reused from Home) */}
      <GetInTouch />
    </div>
  );
}

