export interface RoomFeature {
  label: string;
}

export interface Room {
  id: string;
  refCode: string;
  title: string;
  category: 'master' | 'executive' | 'standard';
  categoryLabel: string;
  tagline: string;
  description: string;
  pricePerNightUsd: number;
  surfaceM2: number;
  bedType: string;
  badge?: string;
  image: string;
  gallery: string[];
  features: RoomFeature[];
  amenities: string[];
}

export type RealServiceCategory = 'desayuno' | 'seguridad' | 'peatonal' | 'conectividad';

export interface RealHotelService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: RealServiceCategory;
  iconName: 'Coffee' | 'ShieldCheck' | 'Footprints' | 'Wifi';
  badgeNote?: string;
}

export interface CityAttraction {
  name: string;
  distance: string;
  description: string;
  type: 'religioso' | 'cultural' | 'comercial';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  text: string;
}
