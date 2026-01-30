
import { Wallpaper, Category } from './types';

const STORAGE_KEY = 'graphico_global_wallpapers';

const INITIAL_DATA: Wallpaper[] = [
  {
    id: '1',
    name: 'Eternal Sabr',
    category: Category.SABR,
    price: 15.00,
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000',
    description: 'A serene journey through patience and light.',
    isActive: true,
    isPremium: true,
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'Desert Bloom',
    category: Category.FLORAL,
    price: 0,
    imageUrl: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1000',
    description: 'Delicate textures meets minimalist desert aesthetics.',
    isActive: true,
    isPremium: false,
    createdAt: Date.now(),
  },
  {
    id: '3',
    name: 'Midnight Bloom',
    category: Category.MINIMALIST,
    price: 12.00,
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
    description: 'Sophisticated dark floral patterns for a premium look.',
    isActive: true,
    isPremium: true,
    limitedFreeUntil: Date.now() + (6 * 60 * 60 * 1000), // 6 hours from now
    createdAt: Date.now(),
  }
];

export const getWallpapers = (): Wallpaper[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : INITIAL_DATA;
};

export const saveWallpapers = (wallpapers: Wallpaper[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wallpapers));
};
