import React, { useEffect } from 'react';
import PageHero from '../shared/PageHero';
import AboutEdition from '../components/home/AboutEdition';
import AboutPlatform from '../components/about/AboutPlatform';
import TransformingBihar from '../components/about/TransformingBihar';
import GetInTouch from '../components/home/GetInTouch';

export default function About() {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero Banner with 'ABOUT BIHAR SETU' */}
      <PageHero page="about" />

      {/* 2. The First Edition, in Patna (Reused from Home) */}
      <AboutEdition />

      {/* 3. About Bihar Setu Platform, Stats, Vision & Quote Banner */}
      <AboutPlatform />

      {/* 4. Transforming Every Dimension of Bihar & Impact Pipeline */}
      <TransformingBihar />

      {/* 5. Get In Touch Section (Reused from Home) */}
      <GetInTouch />
    </div>
  );
}

