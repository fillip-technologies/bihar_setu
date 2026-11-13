// Original Speakers page content, built from the locale files like the Home page defaults;
// anything saved in the admin panel overrides these values section by section.
import { L } from './localeText';

export const SPEAKERS_DEFAULTS = {
  hero: {
    image: 'asset:hero/heros-1.jpg',
    imageAlt: { en: 'Speakers 2026 - Bihar Setu', hi: '' },
    title: L('speakersPage.heroTitle'),
  },

  // Starts as the same people as the Home page's dignitaries strip, but is edited separately.
  speakers: {
    items: [
      ['dignitaries.cm', 'cm.jpg'],
      ['dignitaries.tourismMinister', 'tourism-minister.jpg'],
      ['dignitaries.chiefSecretary', 'secretary-bihar.avif'],
      ['dignitaries.tourismSecretary', 'tourism-seceraty.jpg'],
    ].map(([key, img]) => ({ image: `asset:${img}`, name: L(key), organisation: L('speakersPage.govOfBihar') })),
  },
};
