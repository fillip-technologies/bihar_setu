import React from 'react';
import { useTranslation } from 'react-i18next';
import heroBg from '../../assets/hero/heros-3.jpg';

export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-[#370C01] py-16 sm:py-20 md:py-24 flex items-center justify-center">
      {/* Background Image */}
      <img
        src={heroBg}
        alt="About Bihar Setu"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Signature Brand Dark Mahogany Translucent Overlays */}
      <div className="absolute inset-0 bg-[#451009]/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#370C01]/85 via-[#521810]/70 to-[#370C01]/85" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl font-normal tracking-wider uppercase drop-shadow-lg">
          {t('aboutPage.heroTitle')}
        </h1>
      </div>
    </section>
  );
}

