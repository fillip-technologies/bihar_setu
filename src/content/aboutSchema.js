// What the admin panel shows for each About page section, in page order (field types are listed in schemaFields.js).
import { heroSection, list, text, textarea } from './schemaFields';

export const ABOUT_SECTIONS = [
  heroSection,
  {
    key: 'platform',
    title: 'About the Platform',
    fields: [
      text('heading', 'Heading'),
      textarea('intro', 'Intro paragraph'),
      list('stats', 'Numbers', 'Number', [text('value', 'Number'), text('label', 'Label')]),
      text('visionHeading', 'Vision heading'),
      textarea('visionIntro', 'Vision paragraph'),
      list('pillars', 'Vision pillars', 'Pillar', [text('title', 'Title'), textarea('description', 'Description')]),
      textarea('quote', 'Quote banner text'),
      text('quoteAuthor', 'Quote banner credit (gold)'),
    ],
  },
  {
    key: 'transform',
    title: 'Transforming Bihar',
    fields: [
      text('heading', 'Heading'),
      text('subtitle', 'Subheading'),
      list('dimensions', 'Dimensions', 'Dimension', [text('title', 'Title'), textarea('description', 'Description')]),
      text('impactHeading', 'Closing heading'),
      textarea('impactDesc', 'Closing paragraph'),
    ],
  },
];
