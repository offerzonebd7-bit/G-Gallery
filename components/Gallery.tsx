
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
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-16">
      <header className="mb-20 text-center relative">
        <div className="inline-block mb-6 relative">
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#c5a059] font-semibold">Exquisite Wallpapers</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-[#c5a059]/30" />
        </div>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 text-neutral-900 tracking-tighter leading-none italic">
          The <span className="font-light not-italic">Art</span> Collection
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto text-sm leading-relaxed font-light tracking-wide">
          A digital sanctuary of minimalist aesthetics, Islamic-inspired Sabr series, and curated floral elegance for the modern individual.
        </p>
      </header>

      {/* Advanced Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-20 border-y border-neutral-100 py-10">
        <div className="flex flex-wrap gap-10">
          {(['ALL', 'PREMIUM', 'FREE'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] tracking-[0.4em] uppercase transition-all duration-500 relative group py-2 ${
                filter === f ? 'text-black font-bold' : 'text-neutral-300 hover:text-black'
              }`}
            >
              {f}
              <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-transform duration-500 origin-left ${filter === f ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-8 items-center">
          <div className="relative min-w-[200px]">
             <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full bg-transparent border-none py-2 text-[10px] uppercase tracking-[0.3em] font-medium focus:ring-0 cursor-pointer appearance-none text-neutral-600 hover:text-black transition-colors"
            >
              <option value="ALL">Collections</option>
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-100" />
          </div>
          
          <div className="relative group min-w-[240px]">
            <input 
              type="text" 
              placeholder="Filter by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none border-b border-neutral-100 focus:ring-0 py-2 px-1 text-[11px] uppercase tracking-[0.2em] focus:outline-none bg-transparent placeholder-neutral-200"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-100 group-focus-within:bg-black transition-colors" />
          </div>
        </div>
      </div>

      {/* Grid - High Fashion Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
        {filteredWallpapers.map((w, idx) => {
          const now = Date.now();
          const isLimitedFree = w.limitedFreeUntil && now < w.limitedFreeUntil;
          const isFree = !w.isPremium || isLimitedFree;

          return (
            <div 
              key={w.id} 
              className={`group cursor-pointer transition-all duration-700 ${idx % 2 !== 0 ? 'lg:mt-12' : ''}`}
              onClick={() => setSelectedWallpaper(w)}
            >
              <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-neutral-50">
                <img 
                  src={w.imageUrl} 
                  alt={w.name}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                
                {/* Visual Indicators */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {isLimitedFree && (
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] uppercase font-bold tracking-[0.2em] shadow-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                      Limited Free
                    </div>
                  )}
                  {w.isPremium && !isLimitedFree && (
                    <div className="bg-black/80 text-white px-3 py-1 text-[9px] uppercase font-bold tracking-[0.2em]">
                      Premium
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-center">
                   <div className="bg-white px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-semibold shadow-xl">
                      View details
                   </div>
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-2xl text-neutral-900 group-hover:text-[#c5a059] transition-colors duration-500 italic lowercase tracking-tight">
                      {w.name}
                    </h3>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-light mt-1">{w.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-light tracking-widest ${isFree ? 'text-[#c5a059]' : 'text-neutral-900'}`}>
                      {isFree ? 'FREE' : `$${w.price.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWallpapers.length === 0 && (
        <div className="py-40 text-center border border-dashed border-neutral-100">
          <p className="text-neutral-300 font-serif text-3xl italic">no designs found in this realm.</p>
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
