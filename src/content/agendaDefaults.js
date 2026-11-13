// Original Agenda page content, built from the locale files like the Home page defaults;
// anything saved in the admin panel overrides these values section by section.
// Text that was only ever in English has an empty Hindi value, so the Hindi site keeps showing the English.
import { L } from './localeText';

const A = (key) => L(`agendaPage.${key}`);

// [icon, title key] for each day's panels and evening items.
const DAYS = [
  {
    panels: ['ClipboardCheck', 'MapPin', 'TrendingUp'],
    evening: ['Binoculars', 'Drama', 'Bus', 'Flower2'],
  },
  {
    panels: ['ShieldCheck', 'Landmark', 'Handshake', 'Laptop'],
    evening: ['Trophy', 'Sprout', 'Users', 'BookOpen'],
  },
];

export const AGENDA_DEFAULTS = {
  hero: {
    image: 'asset:hero/hero-about.jpg',
    imageAlt: { en: 'Bihar Setu Agenda 2026', hi: '' },
    title: A('heroTitle'),
  },

  schedule: {
    days: DAYS.map(({ panels, evening }, d) => ({
      tab: A(`day${d + 1}Tab`),
      date: A(`day${d + 1}.dayDate`),
      panels: panels.map((icon, i) => ({ icon, title: A(`day${d + 1}.panel${i + 1}Title`), duration: A('panelDuration') })),
      evening: evening.map((icon, i) => ({
        icon,
        title: A(`day${d + 1}.evening${i + 1}Title`),
        speaker: A(`day${d + 1}.evening${i + 1}Speaker`),
      })),
    })),
    searchPlaceholder: A('searchPlaceholder'),
    venue: A('stageVenue'),
    timingNote: A('timingNote'),
    highlightsHeading: A('highlightsHeading'),
    panelLabel: { en: 'Panel', hi: '' },
    noResults: { en: 'No panels found matching your search.', hi: '' },
    eveningHeading: A('eveningHeading'),
  },

  // Text around the registration form (the form's fields are edited under Agenda > Form fields).
  // The heading, subtitle and button text also appear in the box at the end of the schedule.
  register: {
    badge: { en: 'Delegate Registration', hi: '' },
    heading: A('registerForm.heading'),
    subtitle: A('registerForm.subtitle'),
    submitLabel: A('registerForm.submitBtn'),
    submitNote: { en: 'Complimentary pass for registered industry delegates', hi: '' },
    successTitle: A('registerForm.successTitle'),
    successMessage: A('registerForm.successMessage'),
    refLabel: A('registerForm.regIdLabel'),
    venueLabel: A('registerForm.venueLabel'),
    venueValue: A('registerForm.venueValue'),
    nextStepNote: A('registerForm.nextStepNote'),
    registerAnotherLabel: A('registerForm.registerAnother'),
  },
};
