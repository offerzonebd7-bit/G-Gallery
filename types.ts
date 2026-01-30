
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
  limitedFreeUntil?: number;
  createdAt: number;
}

export type ViewState = 'GALLERY' | 'ADMIN' | 'LOGIN';
export type Language = 'bn' | 'en';
export type Theme = 'light' | 'dark';

export const translations = {
  bn: {
    gallery: 'গ্যালারি',
    atelier: 'অ্যাটেলিয়ার',
    dashboard: 'ড্যাশবোর্ড',
    logout: 'লগআউট',
    premium: 'প্রিমিয়াম',
    free: 'ফ্রি',
    limitedOffer: 'সীমিত সময়ের অফার',
    search: 'ডিজাইন খুঁজুন...',
    all: 'সব',
    download: 'ডাউনলোড করুন',
    buyNow: 'কিনুন',
    payHeader: 'পেমেন্ট করুন (পার্সোনাল)',
    paySub: 'নিচের যেকোনো একটি মাধ্যমে সেন্ড মানি করুন',
    copy: 'নম্বর কপি করুন',
    copied: 'কপি হয়েছে!',
    whatsappConfirm: 'পেমেন্ট শেষে হোয়াটসঅ্যাপে জানান',
    rocketNotice: 'রকেটের ক্ষেত্রে শেষে ৪ যোগ করতে হবে',
    price: 'মূল্য',
    status: 'অবস্থা',
    noResults: 'কোন ডিজাইন পাওয়া যায়নি'
  },
  en: {
    gallery: 'Gallery',
    atelier: 'Atelier',
    dashboard: 'Dashboard',
    logout: 'Logout',
    premium: 'Premium',
    free: 'Free',
    limitedOffer: 'Limited Offer',
    search: 'Search designs...',
    all: 'All',
    download: 'Download Now',
    buyNow: 'Buy Now',
    payHeader: 'Make Payment (Personal)',
    paySub: 'Send money via any of these methods',
    copy: 'Copy Number',
    copied: 'Copied!',
    whatsappConfirm: 'Confirm on WhatsApp after payment',
    rocketNotice: 'For Rocket, add 4 at the end',
    price: 'Price',
    status: 'Status',
    noResults: 'No designs found'
  }
};
