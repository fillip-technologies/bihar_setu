import {
  Award, BookOpen, Briefcase, Building, Building2, Bus, Calendar, Camera, Car, Church, Coffee, Compass, Globe,
  Handshake, Heart, Home, Hotel, Landmark, Leaf, Map, Megaphone, Mountain, Music, Palette, Plane, Ship,
  ShoppingBag, Sparkles, Star, Sun, Tent, Train, TreePine, Trees, Users, Utensils, UtensilsCrossed, Waves,
} from 'lucide-react';

// Icons the admin can pick for the "Sectors represented" badges, stored by name.
export const SECTOR_ICONS = {
  Landmark, Compass, Sparkles, Home, Building2, UtensilsCrossed, Palette, Trees, Bus, Plane, Calendar, Globe,
  Hotel, Building, Mountain, TreePine, Leaf, Sun, Waves, Tent, Camera, Music, ShoppingBag, Coffee, Utensils,
  Ship, Train, Car, Map, Users, Briefcase, Handshake, Megaphone, BookOpen, Award, Heart, Star, Church,
};

// Platforms the admin can pick for the footer's social icons (the icons themselves are drawn in Footer.jsx).
export const SOCIAL_PLATFORMS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'website', label: 'Website' },
];

// Kinds of line in the footer's "Get in touch" list.
export const CONTACT_TYPES = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'address', label: 'Address' },
];
