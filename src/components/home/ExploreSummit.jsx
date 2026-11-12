import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';
import CmsLink from '../../content/CmsLink';

export default function ExploreSummit() {
  const c = useHomeSection('explore');
  const tx = useLocalized();
  const scrollRef = useRef(null);

  const cards = c.cards;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      // Scroll by 1 card width (~320px)
      const scrollDistance = 330;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-[#651B12] py-14 sm:py-18 lg:py-20 text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-normal text-white tracking-wide mb-10 sm:mb-12">
          {tx(c.heading)}
        </h2>

        {/* Carousel / Cards Row */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-2xl hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next Slide"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-2xl hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 sm:gap-6 text-left overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 px-1 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="w-[280px] sm:w-[300px] lg:w-[315px] shrink-0 snap-start flex flex-col rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1 bg-[#D6A33A]"
              >
                {/* Card Top Image */}
                <div className="relative h-52 sm:h-56 lg:h-60 w-full overflow-hidden bg-stone-900">
                  <img
                    src={resolveImage(card.image)}
                    alt={tx(card.title)}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>

                {/* Card Bottom Golden Box */}
                <div className="bg-[#D6A33A] p-4 sm:p-5 flex flex-col justify-between grow">
                  <h3 className="text-sm sm:text-base font-bold text-[#200A05] leading-snug">
                    {tx(card.title)}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#3D1409] font-normal leading-snug mt-1">
                    {tx(card.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call To Action Button */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <CmsLink
            to={c.buttonLink}
            className="inline-flex items-center justify-center bg-[#D6A33A] hover:bg-[#C28E28] text-[#240803] font-bold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {tx(c.buttonLabel)}
          </CmsLink>
        </div>
      </div>
    </section>
  );
}
