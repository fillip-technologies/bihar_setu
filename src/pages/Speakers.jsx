import React, { useEffect } from 'react';
import SpeakersHero from '../components/speakers/SpeakersHero';
import SpeakersGrid from '../components/speakers/SpeakersGrid';
import GetInTouch from '../components/home/GetInTouch';

export default function Speakers() {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero Banner with 'SPEAKERS 2026' */}
      <SpeakersHero />

      {/* 2. Keynote Speakers & Leadership Grid */}
      <SpeakersGrid />

      {/* 3. Get In Touch Section (Reused from Home) */}
      <GetInTouch />
    </div>
  );
}

