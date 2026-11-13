import React from 'react';
import { useLocalized, usePageSection } from '../../content/siteContent';

export default function AboutPlatform() {
  const c = usePageSection('about', 'platform');
  const tx = useLocalized();

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#EFE8DC]">
      <div className="max-w-6xl mx-auto">
        {/* Top Block: About Bihar Setu & Stats */}
        <div className="mb-14 sm:mb-16">
          <h2 className="font-serif text-[#1F0E0A] text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight mb-3">
            {tx(c.heading)}
          </h2>
          <p className="text-[#6B5A52] text-xs sm:text-sm max-w-4xl leading-relaxed mb-8">
            {tx(c.intro)}
          </p>

          {/* Stats (wrap onto a new line when the admin adds more) */}
          <div className="flex flex-wrap items-center gap-x-10 sm:gap-x-14 gap-y-6 pt-2">
            {c.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl font-normal leading-none">
                  {tx(stat.value)}
                </span>
                <span className="text-[#6B5A52] text-xs sm:text-[13px] font-normal mt-1">
                  {tx(stat.label)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Block: Vision & Pillars */}
        <div className="pt-6">
          <h3 className="font-serif text-[#1F0E0A] text-xl sm:text-2xl font-normal leading-snug mb-2">
            {tx(c.visionHeading)}
          </h3>
          <p className="text-[#6B5A52] text-xs sm:text-sm max-w-4xl leading-relaxed mb-8 sm:mb-10">
            {tx(c.visionIntro)}
          </p>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {c.pillars.map((pillar, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="font-serif text-[#1F0E0A] text-base sm:text-[17px] font-medium leading-snug mb-1.5">
                  {tx(pillar.title)}
                </h4>
                <p className="text-[#6B5A52] text-xs sm:text-sm leading-relaxed">
                  {tx(pillar.description)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Banner Box */}
        <div className="mt-12 sm:mt-16 bg-[#5E180F] rounded-lg sm:rounded-xl p-6 sm:p-8 text-white shadow-md">
          <p className="font-serif text-lg sm:text-xl md:text-2xl font-normal italic leading-relaxed text-white">
            {tx(c.quote)}
          </p>
          <span className="text-[#D6A33A] text-xs font-semibold uppercase tracking-wider mt-3 block">
            {tx(c.quoteAuthor)}
          </span>
        </div>
      </div>
    </section>
  );
}
