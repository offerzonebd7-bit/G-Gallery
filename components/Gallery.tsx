
import React, { useState, useMemo } from 'react';
import { Wallpaper, Category, Language, translations } from '../types';
import WallpaperModal from './WallpaperModal';

interface GalleryProps {
  wallpapers: Wallpaper[];
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ wallpapers, lang }) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<'ALL' | 'PREMIUM' | 'FREE'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter(w => {
      const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
      const now = Date.now();
      const isActuallyFree = !w.isPremium || (w.limitedFreeUntil && now < w.limitedFreeUntil);
      
      let matchesFilter = true;
      if (filter === 'PREMIUM') matchesFilter = !isActuallyFree;
      if (filter === 'FREE') matchesFilter = isActuallyFree;

      return matchesSearch && matchesFilter;
    });
  }, [wallpapers, filter, search]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-24">
      
      {/* Header Section */}
      <div className="mb-20 md:mb-32">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-[1px] w-12 bg-gold opacity-50" />
           <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">Curated for Excellence</span>
        </div>
        <h2 className="font-serif text-6xl md:text-9xl text-chocolate dark:text-white tracking-tighter leading-[0.85] italic font-light">
          Masterpiece <span className="not-italic font-black text-gold">Vault</span>
        </h2>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mt-16 pb-12 border-b border-chocolate/5 dark:border-white/5">
          <p className="text-chocolate/50 dark:text-white/50 max-w-xl text-lg md:text-xl font-light italic leading-relaxed">
            {lang === 'bn' 
              ? 'চকোলেট এবং অফ-হোয়াইট থিমের এক অসাধারণ ডিজিটাল কালেকশন, যা আপনার ফোনের স্ক্রিনকে দেবে এক আভিজাত্যের ছোঁয়া।' 
              : 'A revolutionary collection in Chocolate & Off-White tones, designed to bring supreme elegance to your digital interface.'}
          </p>
          
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex bg-chocolate/5 dark:bg-white/5 p-1 rounded-2xl">
               {(['ALL', 'PREMIUM', 'FREE'] as const).map(f => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-8 py-3 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
                     filter === f ? 'bg-chocolate dark:bg-white text-offwhite dark:text-chocolate shadow-xl' : 'text-chocolate/30 dark:text-white/30 hover:text-gold'
                   }`}
                 >
                   {t[f.toLowerCase() as keyof typeof t]}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
        {filteredWallpapers.map((w) => {
          const now = Date.now();
          const isActuallyFree = !w.isPremium || (w.limitedFreeUntil && now < w.limitedFreeUntil);
          const bdtPrice = Math.round(w.price * 115);

          return (
            <div 
              key={w.id} 
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedWallpaper(w)}
            >
              <div className="relative aspect-[3/4] mb-10 rounded-[3.5rem] overflow-hidden bg-chocolate/5 dark:bg-white/5 border border-chocolate/5 dark:border-white/5 shadow-sm group-hover:shadow-[0_50px_100px_-20px_rgba(45,27,19,0.2)] dark:group-hover:shadow-[0_50px_100px_-20px_rgba(255,255,255,0.1)] transition-all duration-700">
                <img 
                  src={w.imageUrl} 
                  alt={w.name}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 pointer-events-none"
                />
                
                {/* Overlay Tags */}
                <div className="absolute top-8 left-8">
                   <div className={`px-5 py-2 rounded-full text-[9px] uppercase font-black tracking-widest shadow-xl backdrop-blur-md ${isActuallyFree ? 'bg-offwhite/90 text-chocolate' : 'bg-chocolate/80 text-gold border border-gold/20'}`}>
                      {isActuallyFree ? t.free : t.premium}
                   </div>
                </div>

                {/* Quick View Hover */}
                <div className="absolute inset-0 bg-chocolate/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                   </div>
                </div>
              </div>

              <div className="px-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-3xl text-chocolate dark:text-white italic font-bold group-hover:text-gold transition-colors">{w.name}</h3>
                    <p className="text-[10px] text-chocolate/30 dark:text-white/30 uppercase tracking-[0.3em] font-medium mt-1">{w.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-serif italic font-black text-gold">
                      {isActuallyFree ? (lang === 'bn' ? 'ফ্রি' : 'FREE') : `৳${bdtPrice}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWallpapers.length === 0 && (
        <div className="py-60 text-center animate-in fade-in duration-1000">
          <p className="text-chocolate/20 dark:text-white/10 font-serif text-5xl italic font-light">{t.noResults}</p>
        </div>
      )}

      {selectedWallpaper && (
        <WallpaperModal 
          wallpaper={selectedWallpaper} 
          onClose={() => setSelectedWallpaper(null)} 
          lang={lang}
        />
      )}
    </div>
  );
};

export default Gallery;
