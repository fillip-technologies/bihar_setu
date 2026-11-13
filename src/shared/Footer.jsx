import React from 'react';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { safeHref, useHomeSection, useLocalized } from '../content/siteContent';
import { resolveImage } from '../content/assets';
import { SOCIAL_PLATFORMS } from '../content/icons';
import CmsLink from '../content/CmsLink';
import navbarLogoDark from '../assets/bihar-setu-navbar-logo-dark.png';
import logo404Dark from '../assets/404-experiences-logo-dark.png';

// lucide-react has no brand icons, so these are drawn here in the same stroke style.
function StrokeIcon({ size = 16, className = '', children }) {
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
      {children}
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <StrokeIcon {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </StrokeIcon>
  );
}

function FacebookIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </StrokeIcon>
  );
}

function LinkedinIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </StrokeIcon>
  );
}

function YoutubeIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9" fill="currentColor" stroke="none" />
    </StrokeIcon>
  );
}

function XIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </StrokeIcon>
  );
}

function WhatsappIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
    </StrokeIcon>
  );
}

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  x: XIcon,
  whatsapp: WhatsappIcon,
  website: Globe,
};

const CONTACT_ICONS = { email: Mail, phone: Phone, whatsapp: WhatsappIcon, address: MapPin };

const listOf = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);
const trimmed = (value) => String(value ?? '').trim();

// wa.me needs the number with its country code; a bare 10-digit number is taken as Indian.
function whatsappHref(number) {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;
}
const isPhoneNumber = (value) => /^[+\d\s()-]+$/.test(value);

// Wraps children in a link only when the admin gave one.
function MaybeLink({ to, className, children }) {
  if (!trimmed(to)) return children;
  return (
    <CmsLink to={to} className={className}>
      {children}
    </CmsLink>
  );
}

function contactHref(type, value) {
  if (type === 'email') return `mailto:${value}`;
  if (type === 'phone') return `tel:${value.replace(/\s/g, '')}`;
  if (type === 'whatsapp') return whatsappHref(value);
  return null;
}

export default function Footer() {
  const f = useHomeSection('footer');
  const tx = useLocalized();

  // Items the admin left empty are skipped rather than shown blank.
  const socialLinks = listOf(f.socialLinks).filter((s) => trimmed(s.link));
  const legalLinks = listOf(f.legalLinks).filter((l) => tx(l.label));
  const quickLinks = listOf(f.quickLinks).filter((l) => tx(l.label));
  const partnerLogos = listOf(f.partnerLogos)
    .map((p) => {
      let img = resolveImage(p.image);
      if (p.name === '404 Experiences' || (typeof img === 'string' && img.includes('404-experiences-logo-light'))) {
        img = logo404Dark;
      }
      return { ...p, image: img };
    })
    .filter((p) => p.image);
  const contacts = listOf(f.contacts).filter((c) => trimmed(c.value));
  const rawLogo = resolveImage(f.logo);
  const logoSrc = (rawLogo && !rawLogo.includes('white') && !rawLogo.includes('navbar-logo-DFoosasL'))
    ? rawLogo
    : navbarLogoDark;
  const rawOrganiserLogo = resolveImage(f.organiserLogo);
  const organiserLogoSrc = (rawOrganiserLogo && !rawOrganiserLogo.includes('light'))
    ? rawOrganiserLogo
    : logo404Dark;

  return (
    <footer className="bg-[#FAF7F2] text-[#1F0E0A] border-t border-[#E8DEC8] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Column 1: Bihar Setu Branding, Social Links, Legal & Developer Credits (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Header Text */}
            <div className="mb-3">
              <span className="block text-[#1F0E0A] font-serif font-bold text-xl sm:text-2xl tracking-wider leading-none">
                {tx(f.titleLine1)}
              </span>
              <span className="block text-[#96681E] font-serif font-bold text-xl sm:text-2xl tracking-wider leading-tight mt-1">
                {tx(f.titleLine2)}
              </span>
            </div>

            {/* Logo */}
            {logoSrc && (
              <CmsLink to={trimmed(f.logoLink) || '/'} className="inline-block mb-5 group">
                <img
                  src={logoSrc}
                  alt={tx(f.titleLine1) || 'Logo'}
                  className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </CmsLink>
            )}

            {/* Social Icons */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mb-5">
                {socialLinks.map((social, idx) => {
                  const Icon = SOCIAL_ICONS[social.platform] || Globe;
                  const link = trimmed(social.link);
                  const href = social.platform === 'whatsapp' && isPhoneNumber(link) ? whatsappHref(link) : safeHref(link);
                  return (
                    <a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={SOCIAL_PLATFORMS.find((p) => p.value === social.platform)?.label || 'Social media'}
                      className="w-9 h-9 rounded-md border border-[#E8DEC8] bg-white flex items-center justify-center text-[#5C443C] hover:text-[#1F0E0A] hover:border-[#D6A33A] hover:bg-[#FFF9EE] shadow-2xs transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            )}

            {/* Copyright, Policies & Developer Credits */}
            <div className="space-y-1.5 text-xs text-[#5C443C]">
              {tx(f.copyright) && <p className="font-normal">{tx(f.copyright)}</p>}
              {legalLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-[#6B5A52]">
                  {legalLinks.map((link, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-[#C4B3A3]">|</span>}
                      <CmsLink to={link.link} className="hover:text-[#1F0E0A] transition-colors">
                        {tx(link.label)}
                      </CmsLink>
                    </React.Fragment>
                  ))}
                </div>
              )}
              {tx(f.creditName) && (
                <p className="text-[11px] text-[#6B5A52] pt-1">
                  {tx(f.creditText)}{' '}
                  {trimmed(f.creditLink) ? (
                    <CmsLink
                      to={f.creditLink}
                      className="text-[#8C291D] hover:text-[#651B12] font-semibold transition-colors underline underline-offset-2"
                    >
                      {tx(f.creditName)}
                    </CmsLink>
                  ) : (
                    <span className="text-[#8C291D] font-semibold">{tx(f.creditName)}</span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links & Partner Logos (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            {tx(f.quickLinksHeading) && (
              <h3 className="text-[#1F0E0A] font-medium text-base mb-3 sm:mb-4">
                {tx(f.quickLinksHeading)}
              </h3>
            )}

            {quickLinks.length > 0 && (
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <CmsLink
                      to={link.link}
                      className="text-[#5C443C] hover:text-[#8C291D] text-xs sm:text-sm font-normal transition-colors duration-200"
                    >
                      {tx(link.label)}
                    </CmsLink>
                  </li>
                ))}
              </ul>
            )}

            {/* Partner Logos */}
            {partnerLogos.length > 0 && (
              <div className="flex items-center gap-5 mt-6 pt-5 border-t border-[#E8DEC8]">
                {partnerLogos.map((logo, idx) => (
                  <MaybeLink key={idx} to={logo.link}>
                    <img
                      src={resolveImage(logo.image) || logo.image}
                      alt={logo.name}
                      className="h-9 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </MaybeLink>
                ))}
              </div>
            )}
          </div>

          {/* Column 3: Organised by & Get in touch (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            {tx(f.organisedByLabel) && (
              <span className="text-[#6B5A52] text-xs sm:text-sm mb-2 font-medium">
                {tx(f.organisedByLabel)}
              </span>
            )}

            {/* Organiser Info */}
            <div className="mb-2">
              {organiserLogoSrc && (
                <MaybeLink to={f.organiserLink} className="inline-block">
                  <img
                    src={organiserLogoSrc}
                    alt={f.organiserName || tx(f.organisedByLabel)}
                    className="h-12 sm:h-14 w-auto object-contain mb-1"
                  />
                </MaybeLink>
              )}
              {tx(f.organiserTagline) && (
                <p className="text-[#5C443C] text-[11px] italic">
                  {tx(f.organiserTagline)}
                </p>
              )}
              {tx(f.summitEdition) && (
                <p className="text-[#1F0E0A] text-xs sm:text-sm font-medium mt-1">
                  {tx(f.summitEdition)}
                </p>
              )}
            </div>

            {/* Get in touch */}
            {(tx(f.getInTouchHeading) || contacts.length > 0) && (
              <div className="mt-5">
                {tx(f.getInTouchHeading) && (
                  <h4 className="text-[#1F0E0A] font-medium text-sm sm:text-base mb-2.5">
                    {tx(f.getInTouchHeading)}
                  </h4>
                )}
                <div className="space-y-1.5">
                  {contacts.map((contact, idx) => {
                    const Icon = CONTACT_ICONS[contact.type] || Mail;
                    const value = trimmed(contact.value);
                    const href = contactHref(contact.type, value);
                    if (!href) {
                      return (
                        <p key={idx} className="flex items-start gap-2 text-[#8C291D] text-xs sm:text-sm font-medium">
                          <Icon size={14} className="shrink-0 mt-0.5 text-[#D6A33A]" />
                          <span>{value}</span>
                        </p>
                      );
                    }
                    return (
                      <a
                        key={idx}
                        href={href}
                        {...(contact.type === 'whatsapp' ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="flex items-center gap-2 text-[#8C291D] hover:text-[#651B12] text-xs sm:text-sm font-medium transition-colors"
                      >
                        <Icon size={14} className="shrink-0 text-[#D6A33A]" />
                        <span>{value}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
