import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import summitAttendeesImg from '../../assets/attend/summit-attendees.jpg';

export default function WhoShouldAttend() {
  const { t } = useTranslation();

  const roles = [
    {
      titleKey: 'attendSection.role1Title',
      descKey: 'attendSection.role1Desc',
    },
    {
      titleKey: 'attendSection.role2Title',
      descKey: 'attendSection.role2Desc',
    },
    {
      titleKey: 'attendSection.role3Title',
      descKey: 'attendSection.role3Desc',
    },
    {
      titleKey: 'attendSection.role4Title',
      descKey: 'attendSection.role4Desc',
    },
  ];

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#EFEAE2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading, Roles list & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight leading-tight">
              {t('attendSection.heading')}
            </h2>

            <p className="text-[#6B5A52] text-sm sm:text-[15px] mt-2 mb-8 sm:mb-10 font-normal">
              {t('attendSection.subheading')}
            </p>

            <div className="space-y-6 sm:space-y-7">
              {roles.map((role) => (
                <div key={role.titleKey} className="group">
                  <h3 className="font-bold text-[#1F0E0A] text-sm sm:text-base leading-snug">
                    {t(role.titleKey)}
                  </h3>
                  <p className="text-[#6B5A52] text-xs sm:text-sm mt-1 leading-relaxed">
                    {t(role.descKey)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <Link
                to="/agenda#register-form"
                className="inline-flex items-center justify-center px-7 py-3 bg-[#D6A33A] hover:bg-[#C49129] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
              >
                {t('attendSection.registerBtn')}
              </Link>
            </div>
          </div>

          {/* Right Column: High-Res Summit Auditorium Image */}
          <div className="lg:col-span-7 w-full flex items-center justify-center lg:pt-2">
            <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl border border-[#E8DFD5] bg-white">
              <img
                src={summitAttendeesImg}
                alt={t('attendSection.heading')}
                className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] transform hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

