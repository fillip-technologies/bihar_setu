import React from 'react';
import { useTranslation } from 'react-i18next';
import heroBg from '../../assets/hero/hero-about.jpg';

export default function AgendaHero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0503] py-16 sm:py-20 md:py-24 flex items-center justify-center">
      {/* Background Image - Fully Visible in Natural Color */}
      <img
        src={heroBg}
        alt="Bihar Setu Agenda 2026"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Clean Neutral Overlay: Removes maroon wash so full image is visible */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/50 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl font-medium tracking-wider uppercase drop-shadow-md">
          {t('agendaPage.heroTitle')}
        </h1>
      </div>
    </section>
  );
}

