
export enum Category {
  SABR = 'Sabr Series',
  MINIMALIST = 'Minimalist',
  FLORAL = 'Floral',
  GEOMETRIC = 'Geometric',
  ABSTRACT = 'Abstract'
}

export interface Wallpaper {
  id: string;
  name: string;
  category: Category;
  price: number;
  imageUrl: string;
  description: string;
  isActive: boolean;
  isPremium: boolean;
  limitedFreeUntil?: number; // Timestamp
  createdAt: number;
}

export type ViewState = 'GALLERY' | 'ADMIN' | 'LOGIN';
