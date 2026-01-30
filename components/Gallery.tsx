
import React, { useState, useMemo } from 'react';
import { Wallpaper, Category } from '../types';
import WallpaperModal from './WallpaperModal';

interface GalleryProps {
  wallpapers: Wallpaper[];
}

const Gallery: React.FC<GalleryProps> = ({ wallpapers }) => {
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
    <div className="max-w-[1700px] mx-auto px-6 md:px-16 py-24">
      <div className="mb-32 max-w-4xl">
        <span className="text-[11px] uppercase tracking-[0.6em] text-[#c5a059] font-bold block mb-6 animate-pulse">Est. 2025</span>
        <h2 className="font-serif text-6xl md:text-8xl lg:text-[120px] mb-12 text-neutral-900 tracking-tighter leading-[0.85] italic">
          Digital <span className="font-light not-italic text-neutral-200">Elegance</span>
        </h2>
        <div className="flex items-center gap-12">
           <div className="h-[1px] w-24 bg-neutral-100" />
           <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-md">
            A curated sanctuary of artisanal mobile canvases. From the spiritual patience of the Sabr series to high-fashion minimalist abstractions.
          </p>
        </div>
      </div>

      {/* Modern Refined Navigation */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-24 border-b border-neutral-50 pb-12">
        <div className="flex flex-wrap gap-12">
          {(['ALL', 'PREMIUM', 'FREE'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] tracking-[0.5em] uppercase transition-all duration-700 relative py-2 ${
                filter === f ? 'text-black font-bold' : 'text-neutral-200 hover:text-black'
              }`}
            >
              {f}
              <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-700 ${filter === f ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-12 items-center w-full lg:w-auto">
          <div className="relative group w-full sm:w-64">
             <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full bg-transparent border-none py-3 text-[10px] uppercase tracking-[0.4em] font-semibold focus:ring-0 cursor-pointer appearance-none text-neutral-400 hover:text-black transition-colors"
            >
              <option value="ALL">All Curations</option>
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          
          <div className="relative group w-full sm:w-72">
            <input 
              type="text" 
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none border-b border-neutral-100 focus:border-black focus:ring-0 py-3 text-[11px] uppercase tracking-[0.3em] focus:outline-none bg-transparent placeholder-neutral-200"
            />
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
        {filteredWallpapers.map((w, idx) => {
          const now = Date.now();
          const isLimitedFree = w.limitedFreeUntil && now < w.limitedFreeUntil;
          const isFree = !w.isPremium || isLimitedFree;

          return (
            <div 
              key={w.id} 
              className={`group cursor-pointer transition-all duration-1000 ${idx % 2 !== 0 ? 'lg:mt-20' : ''}`}
              onClick={() => setSelectedWallpaper(w)}
            >
              <div className="relative aspect-[4/5] mb-10 overflow-hidden bg-[#f7f7f7] editorial-shadow">
                <img 
                  src={w.imageUrl} 
                  alt={w.name}
                  className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-1000" />
                
                {/* Visual Indicators */}
                <div className="absolute top-8 left-8 flex flex-col gap-4">
                  {isLimitedFree && (
                    <div className="bg-white px-4 py-2 text-[9px] uppercase font-bold tracking-[0.3em] shadow-xl animate-bounce">
                      Free Now
                    </div>
                  )}
                  {w.isPremium && !isLimitedFree && (
                    <div className="bg-black text-white px-4 py-2 text-[9px] uppercase font-bold tracking-[0.3em] shadow-xl">
                      Premium
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                   <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" /></svg>
                   </div>
                </div>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-3xl text-neutral-900 group-hover:text-[#c5a059] transition-colors duration-700 italic font-light lowercase">
                      {w.name}
                    </h3>
                    <p className="text-[10px] text-neutral-300 uppercase tracking-[0.4em] font-medium mt-2">{w.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium tracking-[0.2em] ${isFree ? 'text-[#c5a059]' : 'text-neutral-900'}`}>
                      {isFree ? 'COMPLIMENTARY' : `$${w.price.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWallpapers.length === 0 && (
        <div className="py-60 text-center">
          <p className="text-neutral-200 font-serif text-4xl italic font-light tracking-tighter">no artistic remains found.</p>
        </div>
      )}

      {selectedWallpaper && (
        <WallpaperModal 
          wallpaper={selectedWallpaper} 
          onClose={() => setSelectedWallpaper(null)} 
        />
      )}
    </div>
  );
};

export default Gallery;
