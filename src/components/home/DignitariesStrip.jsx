import React from 'react';
import { User } from 'lucide-react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';

export default function DignitariesStrip() {
  const { items } = useHomeSection('dignitaries');
  const tx = useLocalized();

  // Each dignitary appears twice per strip, as before.
  const baseLeaders = [...items, ...items].map((item, idx) => ({
    id: idx,
    name: tx(item.name),
    image: resolveImage(item.image),
  }));

  // Duplicate for seamless infinite loop (0% to -50%)
  const leadersLoop = [...baseLeaders, ...baseLeaders];

  return (
    <div className="relative w-full bg-white border-b border-stone-200 py-2.5 sm:py-3 overflow-hidden select-none">
      {/* Left and Right Edge Fade Gradients for Smooth Entry/Exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      {/* Infinite Continuous Marquee (Right to Left) with generous gap */}
      <div className="animate-marquee flex items-center gap-12 sm:gap-16 lg:gap-20 will-change-transform">
        {leadersLoop.map((leader, idx) => (
          <div
            key={`${leader.id}-${idx}`}
            className="flex items-center gap-2.5 bg-[#FAF7F2] hover:bg-[#F5EFE6] border border-[#EFE8DD] rounded-xl px-4 py-1.5 transition-colors duration-200 cursor-pointer shadow-2xs shrink-0"
          >
            {/* Portrait Thumbnail */}
            <div className="w-10 h-11 rounded-lg bg-[#EFE8DC] border border-[#E4DCCE] overflow-hidden flex items-center justify-center shrink-0">
              {leader.image ? (
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <User className="w-4 h-4 text-stone-400/80" />
              )}
            </div>

            {/* Title / Role */}
            <span className="text-xs sm:text-[13px] font-semibold text-[#2D0B02] whitespace-nowrap">
              {leader.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
