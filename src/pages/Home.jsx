import React from 'react';
import DignitariesStrip from '../components/home/DignitariesStrip';
import Hero from '../components/home/Hero';
import ScaleOfImpact from '../components/home/ScaleOfImpact';
import AboutEdition from '../components/home/AboutEdition';
import ExploreSummit from '../components/home/ExploreSummit';
import ConnectSection from '../components/home/ConnectSection';
import WhoShouldAttend from '../components/home/WhoShouldAttend';
import SummitThematicTracks from '../components/home/SummitThematicTracks';
import SectorsRepresented from '../components/home/SectorsRepresented';
import ActivationEcosystem from '../components/home/ActivationEcosystem';
import FaqSection from '../components/home/FaqSection';
import GetInTouch from '../components/home/GetInTouch';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Continuous Top Dignitaries Bar */}
      <DignitariesStrip />

      {/* Tourism Summit Hero Section */}
      <Hero />

      {/* The Scale of Impact Statistics Section */}
      <ScaleOfImpact />

      {/* The First Edition, in Patna (About Section) */}
      <AboutEdition />

      {/* Explore Bihar Setu Tourism Summit 2026 Section */}
      <ExploreSummit />

      {/* Connect with the Entire Tourism Chain Section */}
      <ConnectSection />

      {/* Who Should Attend Section */}
      <WhoShouldAttend />

      {/* Summit Thematic Tracks Section */}
      <SummitThematicTracks />

      {/* Sectors Represented Section */}
      <SectorsRepresented />

      {/* Activation Ecosystem 2026 Section */}
      <ActivationEcosystem />

      {/* Frequently Asked Questions Section */}
      <FaqSection />

      {/* Get in Touch Section */}
      <GetInTouch />
    </div>
  );
}
