// What the admin panel shows for each Agenda page section, in page order (field types are listed in schemaFields.js).
import { heroSection, icon, list, text, textarea } from './schemaFields';

export const AGENDA_SECTIONS = [
  heroSection,
  {
    key: 'schedule',
    title: 'Schedule',
    fields: [
      list('days', 'Days (tabs)', 'Day', [
        text('tab', 'Tab text'),
        text('date', 'Date shown on the evening programme'),
        list('panels', 'Panels', 'Panel', [icon('icon', 'Icon'), text('title', 'Title'), text('duration', 'Duration')]),
        list('evening', 'Evening programme', 'Item', [icon('icon', 'Icon'), text('title', 'Title'), text('speaker', 'Speaker')]),
      ]),
      text('searchPlaceholder', 'Search box placeholder'),
      text('venue', 'Venue'),
      textarea('timingNote', 'Timing note'),
      text('highlightsHeading', 'Panels heading'),
      text('panelLabel', 'Word before each panel number'),
      text('noResults', 'Message when the search finds no panels'),
      text('eveningHeading', 'Evening programme heading'),
    ],
  },
  {
    key: 'register',
    title: 'Registration Text',
    fields: [
      text('badge', 'Small label above the heading'),
      text('heading', 'Heading (also in the box below the schedule)'),
      textarea('subtitle', 'Subheading (also in the box below the schedule)'),
      text('submitLabel', 'Register button text (also in the box below the schedule)'),
      text('submitNote', 'Note next to the register button'),
      text('successTitle', 'After registering: title'),
      textarea('successMessage', 'After registering: message'),
      text('refLabel', 'After registering: reference number label'),
      text('venueLabel', 'After registering: venue label'),
      text('venueValue', 'After registering: venue'),
      textarea('nextStepNote', 'After registering: next steps note'),
      text('registerAnotherLabel', 'After registering: "register another" button text'),
    ],
  },
];
