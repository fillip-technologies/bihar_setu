import React from 'react';
import { useTranslation } from 'react-i18next';
import expLogoDark from '../../assets/404-experiences-logo-dark.png';
import biharTourismLogo from '../../assets/bihar-tourism-logo.png';

export default function PartnersShowcase() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-2xl mx-auto text-center">
        {/* Block 1: Organised by */}
        <div className="mb-14 sm:mb-18">
          <h2 className="font-serif text-[#A47625] text-sm sm:text-base tracking-[0.22em] font-normal uppercase mb-6">
            {t('partnersPage.organisedBy')}
          </h2>
          <div className="inline-block group">
            <img
              src={expLogoDark}
              alt="404 Experiences"
              className="h-20 sm:h-24 w-auto object-contain mx-auto transition-transform group-hover:scale-105 duration-300"
            />
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="w-16 h-px bg-[#E8DEC8] mx-auto mb-14 sm:mb-18" />

        {/* Block 2: In Association With */}
        <div>
          <h2 className="font-serif text-[#A47625] text-sm sm:text-base tracking-[0.22em] font-normal uppercase mb-6">
            {t('partnersPage.inAssociationWith')}
          </h2>
          <div className="inline-block group">
            <img
              src={biharTourismLogo}
              alt="Bihar Tourism - Blissful Bihar"
              className="h-24 sm:h-28 w-auto object-contain mx-auto transition-transform group-hover:scale-105 duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
