import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

import hero1 from '../../assets/hero/heros-1.jpg';
import hero2 from '../../assets/hero/heros-2.jpg';
import hero3 from '../../assets/hero/heros-3.jpg';

export default function Hero() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [hero1, hero2, hero3];

  // Auto-play carousel transition every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden bg-[#2D0B02] min-h-[380px] md:min-h-[440px] flex flex-col justify-center text-center">
      {/* Background Images with Smooth Crossfade Transition */}
      {slides.map((imgSrc, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            activeSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
      ))}

      {/* Signature Brand Color Tint: A thin translucent royal mahogany wash that tints the image while keeping all details crisp */}
      <div className="absolute inset-0 bg-[#450F07]/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#370C01]/60 via-[#521810]/40 to-[#370C01]/70" />

      {/* Content Container with Proportional Vertical Padding */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 flex flex-col items-center">
        {/* Eyebrow Venue & Date Header */}
        <span 
          className="text-[11px] sm:text-xs font-bold text-[#E5A93C] tracking-widest uppercase mb-2 sm:mb-2.5"
          style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.95)' }}
        >
          {t('hero.venue')}
        </span>

        {/* Main Heading */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight"
          style={{ textShadow: '0 3px 12px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)' }}
        >
          <span className="block font-medium">{t('hero.titleLine1')}</span>
          <span className="block font-serif">{t('hero.titleLine2')}</span>
        </h1>

        {/* Subheading in Gold */}
        <p 
          className="mt-2 text-base sm:text-lg md:text-xl text-[#E5A93C] font-serif italic tracking-wide font-normal"
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.95)' }}
        >
          {t('hero.subheading')}
        </p>

        {/* Description Paragraph */}
        <p 
          className="mt-2.5 text-xs sm:text-[13px] md:text-sm text-[#F0EAE1] max-w-xl font-normal leading-relaxed"
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.9)' }}
        >
          {t('hero.description')}
        </p>

        {/* Event Meta Details: Date & Location */}
        <div 
          className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-white font-medium"
          style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)' }}
        >
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>{t('hero.dates')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>{t('hero.location')}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/get-involved"
            className="inline-flex items-center justify-center bg-[#CB9010] hover:bg-[#B8800B] text-[#370C01] font-bold text-xs tracking-wider uppercase px-6 sm:px-7 py-2.5 rounded-full shadow-md shadow-black/30 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {t('hero.getPass')}
          </Link>
          <Link
            to="/enquire"
            className="inline-flex items-center justify-center border border-[#CB9010] hover:bg-[#CB9010]/15 text-[#CB9010] hover:text-[#E5A93C] font-bold text-xs tracking-wider uppercase px-6 sm:px-7 py-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {t('hero.enquireNow')}
          </Link>
        </div>

        {/* Organised by footer text */}
        <p 
          className="mt-4 sm:mt-5 text-[10px] sm:text-[11px] text-[#D6C5B3] font-medium tracking-wide"
          style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)' }}
        >
          {t('hero.organizedBy')}
        </p>

        {/* Carousel Pagination Dots */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5">
          {slides.map((_, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-6 h-1.5 rounded-full bg-[#CB9010] shadow-xs'
                    : 'w-1.5 h-1.5 rounded-full border border-[#CB9010]/70 hover:bg-[#CB9010]/30'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
