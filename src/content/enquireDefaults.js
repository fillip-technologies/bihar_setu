// Original Enquire page content, built from the locale files like the Home page defaults;
// anything saved in the admin panel overrides these values section by section.
// Text that was only ever in English has an empty Hindi value, so the Hindi site keeps showing the English.
import { L } from './localeText';

export const ENQUIRE_DEFAULTS = {
  hero: {
    image: 'asset:hero/hero-about.jpg',
    imageAlt: { en: 'Enquire Now - Bihar Setu', hi: '' },
    title: L('enquirePage.heroTitle'),
  },

  // Text around the enquiry form (the form's fields are edited under Enquire > Form fields).
  form: {
    heading: L('enquirePage.formHeading'),
    submitLabel: L('enquirePage.submitBtn'),
    successTitle: L('enquirePage.successMsg'),
    // {email} is replaced by the email address the visitor entered, or by emailFallback.
    successMessage: { en: 'Our team will review your enquiry and get back to you shortly at {email}.', hi: '' },
    emailFallback: { en: 'your email', hi: '' },
    refLabel: { en: 'Reference', hi: '' },
    submitAnotherLabel: { en: 'Submit Another Enquiry', hi: '' },
  },
};
