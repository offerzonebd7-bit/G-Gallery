
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
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter(w => {
      const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || w.category === selectedCategory;
      const now = Date.now();
      const isActuallyFree = !w.isPremium || (w.limitedFreeUntil && now < w.limitedFreeUntil);
      
      let matchesFilter = true;
      if (filter === 'PREMIUM') matchesFilter = !isActuallyFree;
      if (filter === 'FREE') matchesFilter = isActuallyFree;

      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [wallpapers, filter, selectedCategory, search]);

  return (
    <div className="max-w-[1700px] mx-auto px-6 md:px-16 py-16 md:py-24">
      <div className="mb-20 max-w-4xl">
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#c5a059] font-bold block mb-4">Graphico Global Atelier</span>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl mb-8 text-neutral-900 dark:text-white tracking-tighter leading-none italic font-light">
          {lang === 'bn' ? 'স্মার্ট' : 'Smart'} <span className="font-bold not-italic">Visuals</span>
        </h2>
        <p className="text-neutral-400 dark:text-neutral-500 text-base md:text-xl leading-relaxed max-w-2xl font-light">
          {lang === 'bn' ? 'আপনার স্মার্টফোনের জন্য প্রিমিয়াম মানের ডিজিটাল আর্ট গ্যালারি।' : 'Premium quality digital art curations for your smartphone sanctuary.'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-20 border-b border-neutral-100 dark:border-neutral-900 pb-10">
        <div className="flex flex-wrap gap-8">
          {(['ALL', 'PREMIUM', 'FREE'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] tracking-[0.3em] uppercase transition-all relative py-2 ${
                filter === f ? 'text-black dark:text-white font-bold' : 'text-neutral-300'
              }`}
            >
              {t[f.toLowerCase() as keyof typeof t] || f}
              <div className={`h-[2px] bg-[#c5a059] absolute bottom-0 left-0 transition-all duration-500 ${filter === f ? 'w-full' : 'w-0'}`} />
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
          <input 
            type="text" 
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 bg-neutral-50 dark:bg-neutral-900 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 ring-[#c5a059]/20 transition-all border border-neutral-100 dark:border-neutral-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredWallpapers.map((w) => {
          const now = Date.now();
          const isFree = !w.isPremium || (w.limitedFreeUntil && now < w.limitedFreeUntil);
          const bdtPrice = Math.round(w.price * 115);

          return (
            <div 
              key={w.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedWallpaper(w)}
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-[2rem] shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={w.imageUrl} 
                  alt={w.name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                
                <div className="absolute top-6 left-6">
                  {isFree ? (
                    <div className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-[9px] uppercase font-bold tracking-widest shadow-xl">
                      {t.free}
                    </div>
                  ) : (
                    <div className="bg-black/80 backdrop-blur-md text-[#c5a059] px-4 py-2 rounded-full text-[9px] uppercase font-bold tracking-widest shadow-xl">
                      {t.premium}
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700 flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="bg-white/20 backdrop-blur-xl p-6 rounded-full border border-white/30">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                   </div>
                </div>
              </div>

              <div className="px-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-2xl text-neutral-900 dark:text-white italic">{w.name}</h3>
                  <p className={`text-xs font-bold ${isFree ? 'text-[#c5a059]' : 'text-neutral-400'}`}>
                    {isFree ? t.free : `৳${bdtPrice}`}
                  </p>
                </div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{w.category}</p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWallpapers.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-neutral-300 dark:text-neutral-700 font-serif text-4xl italic">{t.noResults}</p>
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
