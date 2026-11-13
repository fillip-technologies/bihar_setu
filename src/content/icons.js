import {
  Award, Binoculars, BookOpen, Briefcase, Building, Building2, Bus, Calendar, Camera, Car, Church, ClipboardCheck,
  Coffee, Compass, Drama, Flower2, Globe, Handshake, Heart, Home, Hotel, Landmark, Laptop, Leaf, Map, MapPin,
  Megaphone, Mountain, Music, Palette, Plane, ShieldCheck, Ship, ShoppingBag, Sparkles, Sprout, Star, Sun, Tent,
  Train, TreePine, Trees, TrendingUp, Trophy, Users, Utensils, UtensilsCrossed, Waves,
} from 'lucide-react';

// Icons the admin can pick (Sectors represented badges, Agenda panels and evening items), stored by name.
export const CONTENT_ICONS = {
  Landmark, Compass, Sparkles, Home, Building2, UtensilsCrossed, Palette, Trees, Bus, Plane, Calendar, Globe,
  Hotel, Building, Mountain, TreePine, Leaf, Sun, Waves, Tent, Camera, Music, ShoppingBag, Coffee, Utensils,
  Ship, Train, Car, Map, Users, Briefcase, Handshake, Megaphone, BookOpen, Award, Heart, Star, Church,
  ClipboardCheck, MapPin, TrendingUp, ShieldCheck, Laptop, Binoculars, Drama, Flower2, Trophy, Sprout,
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
