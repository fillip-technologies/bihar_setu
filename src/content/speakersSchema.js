// What the admin panel shows for each Speakers page section, in page order (field types are listed in schemaFields.js).
import { heroSection, image, list, text } from './schemaFields';

export const SPEAKERS_SECTIONS = [
  heroSection,
  {
    key: 'speakers',
    title: 'Speakers',
    fields: [list('items', 'Speakers', 'Speaker', [image('image', 'Photo'), text('name', 'Name / title'), text('organisation', 'Organisation')])],
  },
];
