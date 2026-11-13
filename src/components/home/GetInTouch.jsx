import React from 'react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import { Mail, Phone } from 'lucide-react';

export default function GetInTouch() {
  const c = useHomeSection('contact');
  const tx = useLocalized();

  const contacts = c.cards.map((card) => ({
    ...card,
    href: card.type === 'phone' ? `tel:${String(card.value).replace(/\s/g, '')}` : `mailto:${card.value}`,
  }));

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#F0EBE3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight">
            {tx(c.heading)}
          </h2>
        </div>

        {/* 5 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {contacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-[#052E67] rounded-lg sm:rounded-xl p-5 sm:p-6 flex flex-col justify-between min-h-[145px] shadow-md hover:bg-[#07387B] transition-colors duration-200"
            >
              {/* Card Title */}
              <h3 className="text-white text-sm sm:text-base font-normal sm:font-medium leading-snug">
                {tx(contact.title)}
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

