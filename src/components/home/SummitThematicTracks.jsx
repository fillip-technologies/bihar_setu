import React from 'react';
import { useTranslation } from 'react-i18next';
import heritageImg from '../../assets/hero/hero-about.jpg';
import hospitalityImg from '../../assets/tracks/hospitality-readiness.jpg';
import culinaryImg from '../../assets/hero/heros-3.jpg';
import storytellingImg from '../../assets/tracks/storytelling-promotion.jpg';

export default function SummitThematicTracks() {
  const { t } = useTranslation();

  const tracks = [
    {
      titleKey: 'tracksSection.track1Title',
      descKey: 'tracksSection.track1Desc',
      image: heritageImg,
      alt: 'Heritage and pilgrimage',
    },
    {
      titleKey: 'tracksSection.track2Title',
      descKey: 'tracksSection.track2Desc',
      image: hospitalityImg,
      alt: 'Hospitality readiness',
    },
    {
      titleKey: 'tracksSection.track3Title',
      descKey: 'tracksSection.track3Desc',
      image: culinaryImg,
      alt: 'Food and culinary tourism',
    },
    {
      titleKey: 'tracksSection.track4Title',
      descKey: 'tracksSection.track4Desc',
      image: storytellingImg,
      alt: 'Storytelling and promotion',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#F0EBE3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight leading-tight">
            {t('tracksSection.heading')}
          </h2>
          <p className="text-[#6B5A52] text-sm sm:text-[15px] mt-3 font-normal">
            {t('tracksSection.subheading')}
          </p>
        </div>

        {/* 4 Thematic Tracks Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {tracks.map((track) => (
            <div
              key={track.titleKey}
              className="group bg-[#FAF5EB] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-[#EFE5D7]/70"
            >
              {/* Card Image */}
              <div className="w-full h-48 sm:h-52 overflow-hidden bg-[#ECE3D5]">
                <img
                  src={track.image}
                  alt={track.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-start">
                <h3 className="font-bold text-[#1F0E0A] text-sm sm:text-base leading-snug">
                  {t(track.titleKey)}
                </h3>
                <p className="text-[#6B5A52] text-xs sm:text-[13px] mt-2 leading-relaxed">
                  {t(track.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

