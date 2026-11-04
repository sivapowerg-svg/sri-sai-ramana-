export type MenuCategory = 
  | 'all'
  | 'breakfast'
  | 'specials'
  | 'meals'
  | 'rice'
  | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  teluguName: string;
  category: 'breakfast' | 'specials' | 'meals' | 'rice' | 'beverages';
  description: string;
  price: number;
  isVegetarian: boolean;
  isVerified: boolean; // Only Puri Bhaji & Chola Poori are initially verified
  isAvailable: boolean;
  imageUrl: string;
  badge?: string;
  spiciness?: 'mild' | 'medium' | 'spicy';
  servesCount?: string;
  customOrderingUrl?: string;
}

export interface RestaurantSettings {
  name: string;
  teluguName: string;
  tagline: string;
  teluguTagline: string;
  description: string;
  phone: string;
  whatsappPhone: string;
  whatsappEnabled: boolean;
  address: string;
  openingHours: string;
  closingTime: string;
  googleRating: number;
  googleReviewsCount: number;
  priceRange: string;
  googleMapsUrl: string;
  googleReviewsUrl: string;
  swiggyUrl: string;
  swiggyEnabled: boolean;
  zomatoUrl: string;
  zomatoEnabled: boolean;
  trainServiceEnabled: boolean;
  trainDeliveryNotice: string;
  adminPasscode: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'breakfast' | 'meals' | 'atmosphere' | 'service';
  imageUrl: string;
  caption: string;
}

export interface VerifiedReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  theme: string;
  comment: string;
  avatarLetter: string;
}
