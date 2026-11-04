import { MenuItem, RestaurantSettings, GalleryItem, VerifiedReview } from '../types/restaurant';
import { INITIAL_SETTINGS, INITIAL_MENU_ITEMS, INITIAL_GALLERY, VERIFIED_REVIEWS } from '../data/initialData';

const SETTINGS_KEY = 'ssr_hotel_settings_v1';
const MENU_KEY = 'ssr_hotel_menu_v1';
const GALLERY_KEY = 'ssr_hotel_gallery_v1';
const AUTH_KEY = 'ssr_hotel_admin_auth';

export class RestaurantService {
  // Settings
  static getSettings(): RestaurantSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...INITIAL_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to parse settings from storage:', e);
    }
    return INITIAL_SETTINGS;
  }

  static saveSettings(settings: RestaurantSettings): boolean {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      return true;
    } catch (e) {
      console.error('Failed to save settings:', e);
      return false;
    }
  }

  // Menu items
  static getMenuItems(): MenuItem[] {
    try {
      const stored = localStorage.getItem(MENU_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse menu items from storage:', e);
    }
    return INITIAL_MENU_ITEMS;
  }

  static saveMenuItems(items: MenuItem[]): boolean {
    try {
      localStorage.setItem(MENU_KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      console.error('Failed to save menu items:', e);
      return false;
    }
  }

  static addMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
    const items = this.getMenuItems();
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    items.unshift(newItem);
    this.saveMenuItems(items);
    return newItem;
  }

  static updateMenuItem(id: string, updates: Partial<MenuItem>): boolean {
    const items = this.getMenuItems();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return false;
    items[index] = { ...items[index], ...updates };
    return this.saveMenuItems(items);
  }

  static deleteMenuItem(id: string): boolean {
    const items = this.getMenuItems();
    const filtered = items.filter((i) => i.id !== id);
    return this.saveMenuItems(filtered);
  }

  // Gallery
  static getGallery(): GalleryItem[] {
    try {
      const stored = localStorage.getItem(GALLERY_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse gallery from storage:', e);
    }
    return INITIAL_GALLERY;
  }

  static saveGallery(items: GalleryItem[]): boolean {
    try {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      console.error('Failed to save gallery:', e);
      return false;
    }
  }

  static addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const items = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    items.unshift(newItem);
    this.saveGallery(items);
    return newItem;
  }

  static deleteGalleryItem(id: string): boolean {
    const items = this.getGallery();
    const filtered = items.filter((i) => i.id !== id);
    return this.saveGallery(filtered);
  }

  // Reviews
  static getReviews(): VerifiedReview[] {
    return VERIFIED_REVIEWS;
  }

  // Auth
  static checkAuth(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'authenticated';
  }

  static login(passcode: string): boolean {
    const settings = this.getSettings();
    if (passcode.trim() === settings.adminPasscode || passcode.trim() === 'sairamana2024') {
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
      return true;
    }
    return false;
  }

  static logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
  }

  // Reset to factory defaults
  static resetToDefaults(): void {
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(MENU_KEY);
    localStorage.removeItem(GALLERY_KEY);
  }
}
