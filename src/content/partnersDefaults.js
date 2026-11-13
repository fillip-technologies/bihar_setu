// Original Partners page content, built from the locale files like the Home page defaults;
// anything saved in the admin panel overrides these values section by section.
import { L } from './localeText';

export const PARTNERS_DEFAULTS = {
  hero: {
    image: 'asset:hero/hero-about.jpg',
    imageAlt: { en: 'Partners 2026 - Bihar Setu', hi: '' },
    title: L('partnersPage.heroTitle'),
  },

  showcase: {
    groups: [
      {
        heading: L('partnersPage.organisedBy'),
        size: 'regular',
        logos: [{ image: 'asset:404-experiences-logo-dark.png', name: '404 Experiences', link: '' }],
      },
      {
        heading: L('partnersPage.inAssociationWith'),
        size: 'large',
        logos: [{ image: 'asset:bihar-tourism-logo.png', name: 'Bihar Tourism - Blissful Bihar', link: '' }],
      },
    ],
  },
};
