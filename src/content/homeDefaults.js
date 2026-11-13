// Original Home page content. Text comes from the locale files so English and Hindi stay in sync;
// anything saved in the admin panel overrides these values section by section.
import { L, range } from './localeText';

export const HOME_DEFAULTS = {
  header: {
    logo: 'asset:bihar-setu-navbar-logo-dark.png',
    navHome: L('nav.home'),
    navAbout: L('nav.about'),
    navAgenda: L('nav.agenda'),
    navSpeakers: L('nav.speakers'),
    navPartners: L('nav.partners'),
    navGetInvolved: L('nav.getInvolved'),
    passLabel: L('nav.getPass'),
    passLink: '/get-involved',
    enquireLabel: L('nav.enquireNow'),
    enquireLink: '/enquire',
  },

  dignitaries: {
    items: [
      { name: L('dignitaries.cm'), image: 'asset:cm.jpg' },
      { name: L('dignitaries.tourismMinister'), image: 'asset:tourism-minister.jpg' },
      { name: L('dignitaries.chiefSecretary'), image: 'asset:secretary-bihar.avif' },
      { name: L('dignitaries.tourismSecretary'), image: 'asset:tourism-seceraty.jpg' },
    ],
  },

  hero: {
    slides: [{ image: 'asset:hero/heros-1.jpg' }, { image: 'asset:hero/heros-2.jpg' }, { image: 'asset:hero/heros-3.jpg' }],
    venue: L('hero.venue'),
    titleLine1: L('hero.titleLine1'),
    titleLine2: L('hero.titleLine2'),
    subheading: L('hero.subheading'),
    description: L('hero.description'),
    dates: L('hero.dates'),
    location: L('hero.location'),
    primaryLabel: L('hero.getPass'),
    primaryLink: '/get-involved',
    secondaryLabel: L('hero.enquireNow'),
    secondaryLink: '/enquire',
    organizedBy: L('hero.organizedBy'),
  },

  impact: {
    heading: L('impact.heading'),
    stats: range(4, (i) => ({ value: L(`impact.stat${i}Value`), label: L(`impact.stat${i}Label`) })),
  },

  about: {
    heading: L('aboutSection.heading'),
    intro: L('aboutSection.intro'),
    points: range(4, (i) => ({ title: L(`aboutSection.point${i}Title`), text: L(`aboutSection.point${i}Text`) })),
    image: 'asset:hero/summit-5.png',
    imageAlt: { en: 'Mahabodhi Temple, Bodh Gaya at Sunset', hi: '' },
  },

  explore: {
    heading: L('exploreSection.heading'),
    cards: ['hero/heros-1.jpg', 'hero/heros-3.jpg', 'hero/hero-about.jpg', 'hero/masterclass.jpg', 'hero/investors.jpg'].map((img, i) => ({
      image: `asset:${img}`,
      title: L(`exploreSection.card${i + 1}Title`),
      description: L(`exploreSection.card${i + 1}Desc`),
    })),
    buttonLabel: L('exploreSection.registerBtn'),
    buttonLink: '/agenda#register-form',
  },

  connect: {
    heading: L('connectSection.heading'),
    subheading: L('connectSection.subheading'),
    cards: [
      'attend/summit-attendees.jpg',
      'hero/travel-agencies.avif',
      'hero/dmcs.jpg',
      'hero/heros-1.jpg',
      'hero/heros-3.jpg',
      'hero/investors.jpg',
      'hero/institue-images.jpg',
      'hero/media.jpg',
    ].map((img, i) => ({ image: `asset:${img}`, title: L(`connectSection.card${i + 1}Title`) })),
  },

  attend: {
    heading: L('attendSection.heading'),
    subheading: L('attendSection.subheading'),
    roles: range(4, (i) => ({ title: L(`attendSection.role${i}Title`), description: L(`attendSection.role${i}Desc`) })),
    buttonLabel: L('attendSection.registerBtn'),
    buttonLink: '/agenda#register-form',
    image: 'asset:attend/summit-attendees.jpg',
  },

  tracks: {
    heading: L('tracksSection.heading'),
    subheading: L('tracksSection.subheading'),
    tracks: ['hero/hero-about.jpg', 'tracks/hospitality-readiness.jpg', 'hero/heros-3.jpg', 'tracks/storytelling-promotion.jpg'].map((img, i) => ({
      image: `asset:${img}`,
      title: L(`tracksSection.track${i + 1}Title`),
      description: L(`tracksSection.track${i + 1}Desc`),
    })),
  },

  sectors: {
    heading: L('sectorsSection.heading'),
    sectors: ['Landmark', 'Compass', 'Sparkles', 'Home', 'Building2', 'UtensilsCrossed', 'Palette', 'Trees', 'Bus', 'Plane', 'Calendar', 'Globe'].map(
      (icon, i) => ({ icon, label: L(`sectorsSection.sector${i + 1}`) }),
    ),
  },

  activation: {
    heading: L('activationSection.heading'),
    columns: range(4, (i) => ({ title: L(`activationSection.col${i}Title`), description: L(`activationSection.col${i}Desc`) })),
    buttonLabel: L('activationSection.registerBtn'),
    buttonLink: '/agenda#register-form',
  },

  faq: {
    heading: L('faqSection.heading'),
    items: range(5, (i) => ({ question: L(`faqSection.q${i}`), answer: L(`faqSection.a${i}`) })),
  },

  contact: {
    heading: L('contactSection.heading'),
    cards: [
      { type: 'email', value: 'info@biharsetu.in' },
      { type: 'phone', value: '9153881025' },
      { type: 'email', value: 'info@biharsetu.in' },
      { type: 'email', value: 'info@biharsetu.in' },
      { type: 'email', value: 'info@biharsetu.in' },
    ].map((card, i) => ({ title: L(`contactSection.card${i + 1}Title`), ...card })),
  },

  footer: {
    titleLine1: L('footer.titleLine1'),
    titleLine2: L('footer.titleLine2'),
    logo: 'asset:bihar-setu-navbar-logo-dark.png',
    logoLink: '/',
    socialLinks: [
      { platform: 'instagram', link: 'https://instagram.com' },
      { platform: 'facebook', link: 'https://facebook.com' },
      { platform: 'linkedin', link: 'https://linkedin.com' },
      { platform: 'youtube', link: 'https://youtube.com' },
    ],
    copyright: L('footer.copyright'),
    legalLinks: [
      ['footer.privacyPolicy', '#privacy'],
      ['footer.termsConditions', '#terms'],
      ['footer.cookiePolicy', '#cookie'],
    ].map(([key, link]) => ({ label: L(key), link })),
    // The credit line has always shown in English on the Hindi site too, so Hindi falls back to it.
    creditText: { en: 'Designed & Developed by', hi: '' },
    creditName: { en: 'Fillip Technologies', hi: '' },
    creditLink: 'https://filliptechnologies.com',
    quickLinksHeading: L('footer.quickLinks'),
    quickLinks: [
      ['footer.linkPolicy', '#policy'],
      ['footer.linkReport', '#report'],
      ['footer.linkAbout', '#about'],
      ['footer.linkBlogs', '#blogs'],
      ['footer.linkFaqs', '#faqs'],
    ].map(([key, link]) => ({ label: L(key), link })),
    partnerLogos: [
      { image: 'asset:404-experiences-logo-dark.png', name: '404 Experiences', link: '' },
      { image: 'asset:bihar-tourism-logo.png', name: 'Bihar Tourism', link: '' },
    ],
    organisedByLabel: L('footer.organisedBy'),
    organiserLogo: 'asset:404-experiences-logo-dark.png',
    organiserName: '404 Experiences',
    organiserLink: '',
    organiserTagline: L('footer.tagline404'),
    summitEdition: L('footer.summitEdition'),
    getInTouchHeading: L('footer.getInTouch'),
    contacts: [
      { type: 'email', value: 'info@biharsetu.in' },
      { type: 'phone', value: '9153881025' },
    ],
  },
};
