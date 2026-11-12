import React from 'react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';

export default function ConnectSection() {
  const c = useHomeSection('connect');
  const tx = useLocalized();

  const cards = c.cards;

  return (
    <section className="w-full bg-white py-14 sm:py-18 lg:py-20 border-b border-stone-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-normal text-[#1F0702] tracking-tight leading-tight">
          {tx(c.heading)}
        </h2>

        {/* Section Subheading */}
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#5C443C] font-normal leading-relaxed max-w-xl mx-auto mb-10 sm:mb-12">
          {tx(c.subheading)}
        </p>

        {/* 8 Cards Grid (2 rows x 4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-[#FFF5E4] border border-[#EFE5D5]/80 group cursor-default"
            >
              {/* Card Image */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={resolveImage(card.image)}
                  alt={tx(card.title)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Bottom Box */}
              <div className="bg-[#FFF5E4] px-4 py-3.5 sm:py-4 flex items-center min-h-[56px]">
                <h3 className="text-xs sm:text-[13.5px] font-bold text-[#1F0702] leading-snug">
                  {tx(card.title)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
