
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
    atelier: 'কালেকশন',
    dashboard: 'ম্যানেজার',
    logout: 'লগআউট',
    premium: 'প্রিমিয়াম',
    free: 'ফ্রি',
    limitedOffer: 'অফার শেষ হবে',
    search: 'পছন্দের ডিজাইন খুঁজুন...',
    all: 'সবগুলো',
    download: 'ডাউনলোড করুন',
    buyNow: 'অর্ডার করতে এখানে ক্লিক করুন',
    payHeader: 'টাকা পাঠানোর মাধ্যম (পার্সোনাল)',
    paySub: 'যেকোনো একটি মাধ্যমে সেন্ড মানি করুন',
    copy: 'নম্বর কপি',
    copied: 'কপি হয়েছে',
    whatsappConfirm: 'পেমেন্ট করার পর হোয়াটসঅ্যাপে জানান',
    rocketNotice: 'রকেটে শেষে ৪ যোগ করা হয়েছে',
    price: 'মূল্য (টাকা)',
    status: 'ধরণ',
    noResults: 'ডিজাইন পাওয়া যায়নি',
    devBrand: 'ডেভলপড বাই গ্রাফিকো গ্লোবাল'
  },
  en: {
    gallery: 'Gallery',
    atelier: 'Collections',
    dashboard: 'Admin',
    logout: 'Exit',
    premium: 'Premium',
    free: 'Free',
    limitedOffer: 'Offer Ends In',
    search: 'Search for designs...',
    all: 'All',
    download: 'Download Now',
    buyNow: 'Order via WhatsApp',
    payHeader: 'Payment Methods (Personal)',
    paySub: 'Send money using any app below',
    copy: 'Copy Number',
    copied: 'Copied',
    whatsappConfirm: 'Confirm on WhatsApp after payment',
    rocketNotice: 'For Rocket, +4 is added',
    price: 'Price BDT',
    status: 'Type',
    noResults: 'No designs found',
    devBrand: 'Developed by Graphico Global'
  }
};
