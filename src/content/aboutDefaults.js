// Original About page content, built from the locale files like the Home page defaults;
// anything saved in the admin panel overrides these values section by section.
// The "First Edition" and "Get in Touch" sections on the About page are the Home page's, so they are not here.
import { L, range } from './localeText';

export const ABOUT_DEFAULTS = {
  hero: {
    image: 'asset:hero/heros-3.jpg',
    imageAlt: { en: 'About Bihar Setu', hi: '' },
    title: L('aboutPage.heroTitle'),
  },

  platform: {
    heading: L('aboutPage.platformHeading'),
    intro: L('aboutPage.platformIntro'),
    stats: range(3, (i) => ({ value: L(`aboutPage.stat${i}Value`), label: L(`aboutPage.stat${i}Label`) })),
    visionHeading: L('aboutPage.visionHeading'),
    visionIntro: L('aboutPage.visionIntro'),
    pillars: range(4, (i) => ({ title: L(`aboutPage.pillar${i}Title`), description: L(`aboutPage.pillar${i}Desc`) })),
    quote: L('aboutPage.quote'),
    quoteAuthor: L('aboutPage.quoteAuthor'),
  },

  transform: {
    heading: L('aboutPage.transformHeading'),
    subtitle: L('aboutPage.transformSubtitle'),
    dimensions: range(6, (i) => ({ title: L(`aboutPage.dim${i}Title`), description: L(`aboutPage.dim${i}Desc`) })),
    impactHeading: L('aboutPage.impactHeading'),
    impactDesc: L('aboutPage.impactDesc'),
  },
};
