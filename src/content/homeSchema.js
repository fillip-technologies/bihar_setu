// What the admin panel shows for each Home page section, in page order (field types are listed in schemaFields.js).
import { CONTACT_TYPES, SECTOR_ICONS, SOCIAL_PLATFORMS } from './icons';
import { image, link, list, string, text, textarea } from './schemaFields';

export const HOME_SECTIONS = [
  {
    key: 'header',
    title: 'Header & Menu',
    fields: [
      image('logo', 'Logo'),
      text('navHome', 'Menu: Home'),
      text('navAbout', 'Menu: About'),
      text('navAgenda', 'Menu: Agenda'),
      text('navSpeakers', 'Menu: Speakers'),
      text('navPartners', 'Menu: Partners'),
      text('navGetInvolved', 'Menu: Get Involved'),
      text('passLabel', 'Gold button text'),
      link('passLink', 'Gold button link'),
      text('enquireLabel', 'Outline button text'),
      link('enquireLink', 'Outline button link'),
    ],
  },
  {
    key: 'dignitaries',
    title: 'Dignitaries Strip',
    fields: [list('items', 'Dignitaries', 'Dignitary', [text('name', 'Title / name'), image('image', 'Photo')])],
  },
  {
    key: 'hero',
    title: 'Hero Banner',
    fields: [
      list('slides', 'Background images', 'Slide', [image('image', 'Image')]),
      text('venue', 'Small line above the title'),
      text('titleLine1', 'Title line 1'),
      text('titleLine2', 'Title line 2'),
      text('subheading', 'Gold subheading'),
      textarea('description', 'Description'),
      text('dates', 'Dates'),
      text('location', 'Location'),
      text('primaryLabel', 'Gold button text'),
      link('primaryLink', 'Gold button link'),
      text('secondaryLabel', 'Outline button text'),
      link('secondaryLink', 'Outline button link'),
      text('organizedBy', 'Organised by line'),
    ],
  },
  {
    key: 'impact',
    title: 'Scale of Impact',
    fields: [text('heading', 'Heading'), list('stats', 'Numbers', 'Number', [text('value', 'Number'), text('label', 'Label')])],
  },
  {
    key: 'about',
    title: 'About (First Edition)',
    fields: [
      text('heading', 'Heading'),
      textarea('intro', 'Intro paragraph'),
      list('points', 'Key points', 'Point', [text('title', 'Bold title'), textarea('text', 'Text')]),
      image('image', 'Image'),
      text('imageAlt', 'Image description'),
    ],
  },
  {
    key: 'explore',
    title: 'Explore the Summit',
    fields: [
      text('heading', 'Heading'),
      list('cards', 'Cards', 'Card', [image('image', 'Image'), text('title', 'Title'), textarea('description', 'Description')]),
      text('buttonLabel', 'Button text'),
      link('buttonLink', 'Button link'),
    ],
  },
  {
    key: 'connect',
    title: 'Connect with the Chain',
    fields: [
      text('heading', 'Heading'),
      text('subheading', 'Subheading'),
      list('cards', 'Cards', 'Card', [image('image', 'Image'), text('title', 'Title')]),
    ],
  },
  {
    key: 'attend',
    title: 'Who Should Attend',
    fields: [
      text('heading', 'Heading'),
      text('subheading', 'Subheading'),
      list('roles', 'Attendee groups', 'Group', [text('title', 'Title'), textarea('description', 'Description')]),
      text('buttonLabel', 'Button text'),
      link('buttonLink', 'Button link'),
      image('image', 'Image'),
    ],
  },
  {
    key: 'tracks',
    title: 'Thematic Tracks',
    fields: [
      text('heading', 'Heading'),
      text('subheading', 'Subheading'),
      list('tracks', 'Tracks', 'Track', [image('image', 'Image'), text('title', 'Title'), textarea('description', 'Description')]),
    ],
  },
  {
    key: 'sectors',
    title: 'Sectors Represented',
    fields: [
      text('heading', 'Heading'),
      list('sectors', 'Sectors', 'Sector', [
        { key: 'icon', label: 'Icon', type: 'icon', options: Object.keys(SECTOR_ICONS) },
        text('label', 'Name'),
      ]),
    ],
  },
  {
    key: 'activation',
    title: 'Activation Ecosystem',
    fields: [
      text('heading', 'Heading'),
      list('columns', 'Columns', 'Column', [text('title', 'Title'), textarea('description', 'Description')]),
      text('buttonLabel', 'Button text'),
      link('buttonLink', 'Button link'),
    ],
  },
  {
    key: 'faq',
    title: 'FAQs',
    fields: [
      text('heading', 'Heading'),
      list('items', 'Questions', 'Question', [text('question', 'Question'), textarea('answer', 'Answer (email addresses become links)')]),
    ],
  },
  {
    key: 'contact',
    title: 'Get in Touch',
    fields: [
      text('heading', 'Heading'),
      list('cards', 'Contact cards', 'Card', [
        text('title', 'Title'),
        {
          key: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
          ],
        },
        string('value', 'Email or phone number'),
      ]),
    ],
  },
  {
    key: 'footer',
    title: 'Footer',
    fields: [
      text('titleLine1', 'Title line 1'),
      text('titleLine2', 'Title line 2 (gold)'),
      image('logo', 'Logo'),
      link('logoLink', 'Logo link'),
      list('socialLinks', 'Social media icons', 'Icon', [
        { key: 'platform', label: 'Platform', type: 'select', options: SOCIAL_PLATFORMS },
        string('link', 'Link', 'Full link, e.g. https://instagram.com/yourpage. For WhatsApp, the number is enough.'),
      ]),
      text('copyright', 'Copyright line'),
      list('legalLinks', 'Policy links (below the copyright)', 'Link', [text('label', 'Text'), link('link', 'Link')]),
      text('creditText', 'Credit line'),
      text('creditName', 'Credit name (gold)'),
      string('creditLink', 'Credit link', 'Leave empty to show the name without a link'),
      text('quickLinksHeading', 'Quick links heading'),
      list('quickLinks', 'Quick links', 'Link', [text('label', 'Text'), link('link', 'Link')]),
      list('partnerLogos', 'Partner logos', 'Logo', [
        image('image', 'Logo'),
        string('name', 'Name'),
        string('link', 'Link', 'Optional. Makes the logo clickable.'),
      ]),
      text('organisedByLabel', '"Organised by" text'),
      image('organiserLogo', 'Organiser logo'),
      string('organiserName', 'Organiser name', 'Read out by screen readers in place of the logo'),
      string('organiserLink', 'Organiser link', 'Optional. Makes the logo clickable.'),
      text('organiserTagline', 'Organiser tagline'),
      text('summitEdition', 'Summit edition line'),
      text('getInTouchHeading', '"Get in touch" heading'),
      list('contacts', 'Contact details', 'Contact', [
        { key: 'type', label: 'Type', type: 'select', options: CONTACT_TYPES },
        string('value', 'Email, number or address'),
      ]),
    ],
  },
];

