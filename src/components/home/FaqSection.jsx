import React, { useState } from 'react';
import { useHomeSection, useLocalized } from '../../content/siteContent';
import LinkifiedText from '../../content/LinkifiedText';

export default function FaqSection() {
  const c = useHomeSection('faq');
  const tx = useLocalized();

  // Track which FAQs are expanded; initialize with the first two open
  const [openIndices, setOpenIndices] = useState({ 0: true, 1: true });

  const faqs = c.items;

  const toggleFaq = (index) => {
    setOpenIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 w-full border-t border-[#EFE8DC]">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-[#1F0E0A] text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight">
            {tx(c.heading)}
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-[#E8DEC8]">
          {faqs.map((faq, index) => {
            const isOpen = !!openIndices[index];

            return (
              <div
                key={index}
                className="border-b border-[#E8DEC8] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left focus:outline-hidden group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-[#1F0E0A] text-base sm:text-[17px] font-medium group-hover:text-[#7A2217] transition-colors pr-4">
                    {tx(faq.question)}
                  </span>
                  <span className="text-[#6B5A52] group-hover:text-[#7A2217] text-2xl font-light select-none transition-transform duration-200">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-6 text-[#6B5A52] text-sm sm:text-[15px] leading-relaxed">
                    <p>
                      <LinkifiedText
                        text={tx(faq.answer)}
                        linkClassName="text-[#96681E] hover:text-[#7A2217] underline font-medium"
                      />
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

