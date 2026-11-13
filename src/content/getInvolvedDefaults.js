// Original Get Involved page content, built from the locale files like the Home page defaults;
// anything saved in the admin panel overrides these values section by section.
import { L } from './localeText';

const P = (key) => L(`getInvolvedPage.${key}`);

export const GET_INVOLVED_DEFAULTS = {
  hero: {
    image: 'asset:hero/heros-3.jpg',
    imageAlt: { en: 'Get Your Pass - Bihar Setu', hi: '' },
    title: P('heroTitle'),
  },

  // Passes are the table's columns and features its rows. A feature lists the ids of the passes that include it,
  // so passes can be renamed or reordered without losing their ticks.
  pricing: {
    heading: P('tableHeading'),
    featureHeading: P('colFeature'),
    priceLabel: P('rowPrice'),
    soldOutLabel: P('btnSoldOut'),
    passes: [
      ['conference', 'colConference', 'open'],
      ['student', 'colStudent', 'open'],
      ['expo', 'colExpo', 'soldOut'],
    ].map(([id, nameKey, status]) => ({
      id,
      name: P(nameKey),
      price: P('priceValue'),
      status,
      buttonLabel: P('btnRegister'),
      buttonLink: '/agenda#register-form',
    })),
    features: [
      ['rowConferenceSessions', ['conference', 'student']],
      ['rowExpoAccess', ['conference', 'student', 'expo']],
      ['rowLunchNetworking', ['conference']],
    ].map(([labelKey, passes]) => ({ label: P(labelKey), passes })),
  },
};
