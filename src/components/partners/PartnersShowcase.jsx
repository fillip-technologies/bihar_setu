import React, { Fragment } from 'react';
import { useLocalized, usePageSection } from '../../content/siteContent';
import { resolveImage } from '../../content/assets';
import CmsLink from '../../content/CmsLink';

// Logo heights for each "Logo size" choice in the admin panel.
const LOGO_SIZES = {
  regular: 'h-20 sm:h-24',
  large: 'h-24 sm:h-28',
};

export default function PartnersShowcase() {
  const c = usePageSection('partners', 'showcase');
  const tx = useLocalized();

  const renderLogo = (logo, size, idx) => {
    const img = (
      <img
        src={resolveImage(logo.image)}
        alt={logo.name}
        className={`${LOGO_SIZES[size] || LOGO_SIZES.regular} w-auto object-contain mx-auto transition-transform group-hover:scale-105 duration-300`}
      />
    );
    return (
      <div key={idx} className="inline-block group">
        {logo.link ? <CmsLink to={logo.link}>{img}</CmsLink> : img}
      </div>
    );
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-2xl mx-auto text-center">
        {c.groups.map((group, idx) => (
          <Fragment key={idx}>
            {/* Subtle Divider between groups */}
            {idx > 0 && <div className="w-16 h-px bg-[#E8DEC8] mx-auto mb-14 sm:mb-18" />}

            {/* Group: "Organised by", "In association with", ... */}
            <div className={idx < c.groups.length - 1 ? 'mb-14 sm:mb-18' : undefined}>
              <h2 className="font-serif text-[#A47625] text-sm sm:text-base tracking-[0.22em] font-normal uppercase mb-6">
                {tx(group.heading)}
              </h2>
              {group.logos.length > 1 ? (
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
                  {group.logos.map((logo, i) => renderLogo(logo, group.size, i))}
                </div>
              ) : (
                group.logos.map((logo, i) => renderLogo(logo, group.size, i))
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
