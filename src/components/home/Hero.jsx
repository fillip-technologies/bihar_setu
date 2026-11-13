import React, { useState, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';
import CmsLink from '../../content/CmsLink';

export default function Hero() {
  const c = useHomeSection('hero');
  const tx = useLocalized();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = c.slides.map((slide) => resolveImage(slide.image)).filter(Boolean);

  // Auto-play carousel transition every 5 seconds
  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0503] min-h-[380px] md:min-h-[440px] flex flex-col justify-center text-center">
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

      {/* Clean Dark Overlay: Keeps image fully visible while guaranteeing natural text legibility */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

      {/* Content Container with Proportional Vertical Padding */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 flex flex-col items-center">
        {/* Eyebrow Venue & Date Header */}
        <span className="text-[11px] sm:text-xs font-bold text-[#F7C568] tracking-widest uppercase mb-2 sm:mb-2.5">
          {tx(c.venue)}
        </span>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
          <span className="block font-medium">{tx(c.titleLine1)}</span>
          <span className="block font-serif text-[#F7C568] font-bold mt-0.5">{tx(c.titleLine2)}</span>
        </h1>

        {/* Subheading in Gold */}
        <p className="mt-2 text-base sm:text-lg md:text-xl text-[#F7C568] font-serif italic tracking-wide font-normal">
          {tx(c.subheading)}
        </p>

        {/* Description Paragraph */}
        <p className="mt-2.5 text-xs sm:text-[13px] md:text-sm text-[#F5EFE6] max-w-xl font-normal leading-relaxed">
          {tx(c.description)}
        </p>

        {/* Event Meta Details: Date & Location */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-white font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#F7C568]" />
            <span>{tx(c.dates)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#F7C568]" />
            <span>{tx(c.location)}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3.5">
          <CmsLink
            to={c.primaryLink}
            className="inline-flex items-center justify-center bg-[#D6A33A] hover:bg-[#C28F27] text-[#1E0904] font-bold text-xs tracking-wider uppercase px-6 sm:px-7 py-2.5 rounded-full shadow-md transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {tx(c.primaryLabel)}
          </CmsLink>
          <CmsLink
            to={c.secondaryLink}
            className="inline-flex items-center justify-center border-2 border-[#D6A33A] hover:bg-[#D6A33A] text-[#D6A33A] hover:text-[#1E0904] font-bold text-xs tracking-wider uppercase px-6 sm:px-7 py-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {tx(c.secondaryLabel)}
          </CmsLink>
        </div>

        {/* Organised by footer text */}
        <p className="mt-4 sm:mt-5 text-[10px] sm:text-[11px] text-white/80 font-medium tracking-wide">
          {tx(c.organizedBy)}
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
                    ? 'w-6 h-1.5 rounded-full bg-[#D6A33A] shadow-xs'
                    : 'w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
