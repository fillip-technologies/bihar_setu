import React from 'react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';

export default function SummitThematicTracks() {
  const c = useHomeSection('tracks');
  const tx = useLocalized();

  const tracks = c.tracks;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#F0EBE3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight leading-tight">
            {tx(c.heading)}
          </h2>
          <p className="text-[#6B5A52] text-sm sm:text-[15px] mt-3 font-normal">
            {tx(c.subheading)}
          </p>
        </div>

        {/* 4 Thematic Tracks Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {tracks.map((track, idx) => (
            <div
              key={idx}
              className="group bg-[#FAF5EB] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-[#EFE5D7]/70"
            >
              {/* Card Image */}
              <div className="w-full h-48 sm:h-52 overflow-hidden bg-[#ECE3D5]">
                <img
                  src={resolveImage(track.image)}
                  alt={tx(track.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-start">
                <h3 className="font-bold text-[#1F0E0A] text-sm sm:text-base leading-snug">
                  {tx(track.title)}
                </h3>
                <p className="text-[#6B5A52] text-xs sm:text-[13px] mt-2 leading-relaxed">
                  {tx(track.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

