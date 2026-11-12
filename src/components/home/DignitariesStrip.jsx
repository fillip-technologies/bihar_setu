import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import cmImg from '../../assets/cm.jpg';
import tourismMinisterImg from '../../assets/tourism-minister.jpg';
import secretaryImg from '../../assets/secretary-bihar.avif';
import tourismSecretaryImg from '../../assets/tourism-seceraty.jpg';

export default function DignitariesStrip() {
  const { t } = useTranslation();

  const baseLeaders = [
    { id: 'cm-1', roleKey: 'dignitaries.cm', image: cmImg },
    { id: 'tourism-minister-1', roleKey: 'dignitaries.tourismMinister', image: tourismMinisterImg },
    { id: 'chief-secretary-1', roleKey: 'dignitaries.chiefSecretary', image: secretaryImg },
    { id: 'tourism-secretary-1', roleKey: 'dignitaries.tourismSecretary', image: tourismSecretaryImg },
    { id: 'cm-2', roleKey: 'dignitaries.cm', image: cmImg },
    { id: 'tourism-minister-2', roleKey: 'dignitaries.tourismMinister', image: tourismMinisterImg },
    { id: 'chief-secretary-2', roleKey: 'dignitaries.chiefSecretary', image: secretaryImg },
    { id: 'tourism-secretary-2', roleKey: 'dignitaries.tourismSecretary', image: tourismSecretaryImg },
  ];

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
                  alt={t(leader.roleKey)}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <User className="w-4 h-4 text-stone-400/80" />
              )}
            </div>

            {/* Title / Role */}
            <span className="text-xs sm:text-[13px] font-semibold text-[#2D0B02] whitespace-nowrap">
              {t(leader.roleKey)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
