import React from 'react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';
import CmsLink from '../../content/CmsLink';

export default function WhoShouldAttend() {
  const c = useHomeSection('attend');
  const tx = useLocalized();

  const roles = c.roles;

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#EFEAE2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading, Roles list & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight leading-tight">
              {tx(c.heading)}
            </h2>

            <p className="text-[#6B5A52] text-sm sm:text-[15px] mt-2 mb-8 sm:mb-10 font-normal">
              {tx(c.subheading)}
            </p>

            <div className="space-y-6 sm:space-y-7">
              {roles.map((role, idx) => (
                <div key={idx} className="group">
                  <h3 className="font-bold text-[#1F0E0A] text-sm sm:text-base leading-snug">
                    {tx(role.title)}
                  </h3>
                  <p className="text-[#6B5A52] text-xs sm:text-sm mt-1 leading-relaxed">
                    {tx(role.description)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <CmsLink
                to={c.buttonLink}
                className="inline-flex items-center justify-center px-7 py-3 bg-[#D6A33A] hover:bg-[#C49129] text-[#1E0904] font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
              >
                {tx(c.buttonLabel)}
              </CmsLink>
            </div>
          </div>

          {/* Right Column: High-Res Summit Auditorium Image */}
          <div className="lg:col-span-7 w-full flex items-center justify-center lg:pt-2">
            <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl border border-[#E8DFD5] bg-white">
              <img
                src={resolveImage(c.image)}
                alt={tx(c.heading)}
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

