import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone } from 'lucide-react';
import biharSetuLogo from '../assets/bihar-setu-navbar-logo.png';
import expLogo from '../assets/404-experiences-logo-light.png';
import biharTourismLogo from '../assets/bihar-tourism-logo.png';

function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { labelKey: 'footer.linkPolicy', href: '#policy' },
    { labelKey: 'footer.linkReport', href: '#report' },
    { labelKey: 'footer.linkAbout', href: '#about' },
    { labelKey: 'footer.linkBlogs', href: '#blogs' },
    { labelKey: 'footer.linkFaqs', href: '#faqs' },
  ];

  return (
    <footer className="bg-[#521810] text-white border-t border-[#3B0E07] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Column 1: Bihar Setu Branding, Social Links, Legal & Developer Credits (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Header Text */}
            <div className="mb-3">
              <span className="block text-white font-serif font-bold text-xl sm:text-2xl tracking-wider leading-none">
                {t('footer.titleLine1')}
              </span>
              <span className="block text-[#D6A33A] font-serif font-bold text-xl sm:text-2xl tracking-wider leading-tight mt-1">
                {t('footer.titleLine2')}
              </span>
            </div>

            {/* Logo */}
            <a href="#" className="inline-block mb-5 group">
              <img
                src={biharSetuLogo}
                alt="Bihar Setu Logo"
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-md border border-[#8C4A42] flex items-center justify-center text-white/80 hover:text-white hover:border-[#D6A33A] hover:bg-[#681E15] transition-all duration-200"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-md border border-[#8C4A42] flex items-center justify-center text-white/80 hover:text-white hover:border-[#D6A33A] hover:bg-[#681E15] transition-all duration-200"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-md border border-[#8C4A42] flex items-center justify-center text-white/80 hover:text-white hover:border-[#D6A33A] hover:bg-[#681E15] transition-all duration-200"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-md border border-[#8C4A42] flex items-center justify-center text-white/80 hover:text-white hover:border-[#D6A33A] hover:bg-[#681E15] transition-all duration-200"
              >
                <YoutubeIcon size={16} />
              </a>
            </div>

            {/* Copyright, Policies & Developer Credits */}
            <div className="space-y-1.5 text-xs text-white/70">
              <p className="font-normal">{t('footer.copyright')}</p>
              <div className="flex flex-wrap items-center gap-2 text-white/60">
                <a href="#privacy" className="hover:text-white transition-colors">
                  {t('footer.privacyPolicy')}
                </a>
                <span>|</span>
                <a href="#terms" className="hover:text-white transition-colors">
                  {t('footer.termsConditions')}
                </a>
                <span>|</span>
                <a href="#cookie" className="hover:text-white transition-colors">
                  {t('footer.cookiePolicy')}
                </a>
              </div>
              <p className="text-[11px] text-white/60 pt-1">
                Designed & Developed by{' '}
                <a
                  href="https://filliptechnologies.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D6A33A] hover:text-[#F7C568] font-medium transition-colors underline underline-offset-2"
                >
                  Fillip Technologies
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links & Partner Logos (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <h3 className="text-white font-medium text-base mb-3 sm:mb-4">
              {t('footer.quickLinks')}
            </h3>

            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#D6A33A] text-xs sm:text-sm transition-colors duration-200"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Partner Logos */}
            <div className="flex items-center gap-5 mt-6 pt-5 border-t border-[#6B241C]">
              <img
                src={expLogo}
                alt="404 Experiences"
                className="h-9 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
              <img
                src={biharTourismLogo}
                alt="Bihar Tourism"
                className="h-9 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Column 3: Organised by & Get in touch (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <span className="text-white/70 text-xs sm:text-sm mb-2">
              {t('footer.organisedBy')}
            </span>

            {/* 404 Experiences Organizer Info */}
            <div className="mb-2">
              <img
                src={expLogo}
                alt="404 Experiences"
                className="h-12 sm:h-14 w-auto object-contain mb-1"
              />
              <p className="text-white/60 text-[11px] italic">
                {t('footer.tagline404')}
              </p>
              <p className="text-white/85 text-xs sm:text-sm font-medium mt-1">
                {t('footer.summitEdition')}
              </p>
            </div>

            {/* Get in touch */}
            <div className="mt-5">
              <h4 className="text-white font-medium text-sm sm:text-base mb-2.5">
                {t('footer.getInTouch')}
              </h4>
              <div className="space-y-1.5">
                <a
                  href="mailto:info@biharsetu.in"
                  className="flex items-center gap-2 text-[#E5A93C] hover:text-[#F7C568] text-xs sm:text-sm transition-colors"
                >
                  <Mail size={14} className="shrink-0 text-[#E5A93C]" />
                  <span>info@biharsetu.in</span>
                </a>
                <a
                  href="tel:9153881025"
                  className="flex items-center gap-2 text-[#E5A93C] hover:text-[#F7C568] text-xs sm:text-sm transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-[#E5A93C]" />
                  <span>9153881025</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
