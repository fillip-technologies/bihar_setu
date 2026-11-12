import React from 'react';
import { useTranslation } from 'react-i18next';
import cmImg from '../../assets/cm.jpg';
import tourismMinisterImg from '../../assets/tourism-minister.jpg';
import secretaryImg from '../../assets/secretary-bihar.avif';
import tourismSecretaryImg from '../../assets/tourism-seceraty.jpg';

export default function SpeakersGrid() {
  const { t } = useTranslation();

  const speakers = [
    {
      id: 'cm',
      roleKey: 'dignitaries.cm',
      orgKey: 'speakersPage.govOfBihar',
      image: cmImg,
    },
    {
      id: 'tourism-minister',
      roleKey: 'dignitaries.tourismMinister',
      orgKey: 'speakersPage.govOfBihar',
      image: tourismMinisterImg,
    },
    {
      id: 'chief-secretary',
      roleKey: 'dignitaries.chiefSecretary',
      orgKey: 'speakersPage.govOfBihar',
      image: secretaryImg,
    },
    {
      id: 'tourism-secretary',
      roleKey: 'dignitaries.tourismSecretary',
      orgKey: 'speakersPage.govOfBihar',
      image: tourismSecretaryImg,
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-6xl mx-auto">
        {/* 4 Dignitaries / Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="group bg-[#FAF5EB] rounded-xl overflow-hidden border border-[#EFE5D7] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Portrait Image */}
              <div className="w-full h-64 sm:h-72 overflow-hidden bg-[#EFE8DC]">
                <img
                  src={speaker.image}
                  alt={t(speaker.roleKey)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Speaker Info */}
              <div className="p-5 flex-1 flex flex-col justify-start">
                <h3 className="font-serif text-[#1F0E0A] font-medium text-base sm:text-lg leading-snug">
                  {t(speaker.roleKey)}
                </h3>
                <p className="text-[#6B5A52] text-xs sm:text-sm mt-1 leading-relaxed">
                  {t(speaker.orgKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

