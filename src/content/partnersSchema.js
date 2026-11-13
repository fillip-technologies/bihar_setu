// What the admin panel shows for each Partners page section, in page order (field types are listed in schemaFields.js).
import { heroSection, image, list, select, string, text } from './schemaFields';

export const PARTNERS_SECTIONS = [
  heroSection,
  {
    key: 'showcase',
    title: 'Partner Logos',
    fields: [
      list('groups', 'Groups', 'Group', [
        text('heading', 'Heading'),
        select('size', 'Logo size', [
          { value: 'regular', label: 'Regular' },
          { value: 'large', label: 'Large' },
        ]),
        list('logos', 'Logos', 'Logo', [
          image('image', 'Logo'),
          string('name', 'Name', 'Read out by screen readers in place of the logo'),
          string('link', 'Link', 'Optional. Makes the logo clickable.'),
        ]),
      ]),
    ],
  },
];
