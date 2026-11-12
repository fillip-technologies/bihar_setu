import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone } from 'lucide-react';

export default function GetInTouch() {
  const { t } = useTranslation();

  const contacts = [
    {
      titleKey: 'contactSection.card1Title',
      type: 'email',
      value: 'info@biharsetu.in',
      href: 'mailto:info@biharsetu.in',
    },
    {
      titleKey: 'contactSection.card2Title',
      type: 'phone',
      value: '9153881025',
      href: 'tel:9153881025',
    },
    {
      titleKey: 'contactSection.card3Title',
      type: 'email',
      value: 'info@biharsetu.in',
      href: 'mailto:info@biharsetu.in',
    },
    {
      titleKey: 'contactSection.card4Title',
      type: 'email',
      value: 'info@biharsetu.in',
      href: 'mailto:info@biharsetu.in',
    },
    {
      titleKey: 'contactSection.card5Title',
      type: 'email',
      value: 'info@biharsetu.in',
      href: 'mailto:info@biharsetu.in',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#F0EBE3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight">
            {t('contactSection.heading')}
          </h2>
        </div>

        {/* 5 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {contacts.map((contact) => (
            <div
              key={contact.titleKey}
              className="bg-[#521810] rounded-lg sm:rounded-xl p-5 sm:p-6 flex flex-col justify-between min-h-[145px] shadow-md hover:bg-[#5E1B12] transition-colors duration-200"
            >
              {/* Card Title */}
              <h3 className="text-white text-sm sm:text-base font-normal sm:font-medium leading-snug">
                {t(contact.titleKey)}
              </h3>

              {/* Action / Value Link */}
              <a
                href={contact.href}
                className="flex items-center gap-2 text-[#E5A93C] hover:text-[#F7C568] text-xs sm:text-[13px] font-medium tracking-wide mt-6 transition-colors group"
              >
                {contact.type === 'phone' ? (
                  <Phone size={14} className="shrink-0 text-[#E5A93C]" />
                ) : (
                  <Mail size={14} className="shrink-0 text-[#E5A93C]" />
                )}
                <span className="truncate">{contact.value}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

