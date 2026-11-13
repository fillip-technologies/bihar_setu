// What the admin panel shows for each Get Involved page section, in page order (field types are listed in schemaFields.js).
import { checklist, heroSection, id, link, list, select, text } from './schemaFields';

export const GET_INVOLVED_SECTIONS = [
  heroSection,
  {
    key: 'pricing',
    title: 'Pass Pricing Table',
    fields: [
      text('heading', 'Heading'),
      text('featureHeading', 'First column heading'),
      list('passes', 'Passes (table columns)', 'Pass', [
        id('id'),
        text('name', 'Name'),
        text('price', 'Price'),
        select('status', 'Status (a sold-out pass shows a greyed-out button)', [
          { value: 'open', label: 'Open' },
          { value: 'soldOut', label: 'Sold out' },
        ]),
        text('buttonLabel', 'Button text'),
        link('buttonLink', 'Button link'),
      ]),
      text('priceLabel', 'Price row label'),
      list('features', 'Features (table rows)', 'Feature', [text('label', 'Feature'), checklist('passes', 'Included in', 'passes')]),
      text('soldOutLabel', 'Sold-out button text'),
    ],
  },
];
