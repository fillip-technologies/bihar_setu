// What the admin panel shows for each Enquire page section, in page order (field types are listed in schemaFields.js).
import { heroSection, text, textarea } from './schemaFields';

export const ENQUIRE_SECTIONS = [
  heroSection,
  {
    key: 'form',
    title: 'Enquiry Form Text',
    fields: [
      text('heading', 'Heading'),
      text('submitLabel', 'Submit button text'),
      text('successTitle', 'After sending: title'),
      textarea('successMessage', "After sending: message ({email} becomes the visitor's email address)"),
      text('emailFallback', 'After sending: used for {email} when the form has no email field'),
      text('refLabel', 'After sending: reference number label'),
      text('submitAnotherLabel', 'After sending: "submit another" button text'),
    ],
  },
];
