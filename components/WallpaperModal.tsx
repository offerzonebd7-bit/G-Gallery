
import React, { useEffect, useState } from 'react';
import { Wallpaper } from '../types';

interface WallpaperModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ wallpaper, onClose }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    if (!wallpaper.limitedFreeUntil) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = wallpaper.limitedFreeUntil! - now;
      if (diff <= 0) {
        setTimeLeft('EXPIRED');
        clearInterval(timer);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [wallpaper.limitedFreeUntil]);

  const handleWhatsAppOrder = () => {
    const phone = '8801930277399';
    const message = encodeURIComponent(`Hello Graphico Global, I want to purchase the "${wallpaper.name}" wallpaper from the "${wallpaper.category}" collection.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(wallpaper.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${wallpaper.name.replace(/\s+/g, '_')}_GraphicoGlobal.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback for cross-origin images
      window.open(wallpaper.imageUrl, '_blank');
    }
  };

  const isActuallyFree = !wallpaper.isPremium || (wallpaper.limitedFreeUntil && Date.now() < wallpaper.limitedFreeUntil);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-1000 overflow-y-auto ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <button 
        onClick={onClose}
        className="fixed top-10 right-10 text-neutral-300 hover:text-black transition-colors z-[110] group"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] mr-4 opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
        <svg className="w-8 h-8 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="max-w-7xl w-full px-8 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center">
            <div className="relative group rounded-none overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] max-w-[400px] w-full bg-neutral-50 animate-fadeIn">
              <img 
                src={wallpaper.imageUrl} 
                alt={wallpaper.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.5em] text-[#c5a059] font-bold block mb-4">{wallpaper.category}</span>
              <h2 className="font-serif text-5xl md:text-7xl text-neutral-900 leading-none mb-6 italic">
                {wallpaper.name}
              </h2>
              <p className="text-neutral-500 text-lg font-light italic border-l-2 border-neutral-100 pl-6 max-w-lg">
                "{wallpaper.description}"
              </p>
            </div>

            <div className="flex flex-wrap gap-8 items-end">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Status</p>
                <span className="text-3xl font-serif text-neutral-900 italic">
                  {isActuallyFree ? 'FREE' : `$${wallpaper.price.toFixed(2)}`}
                </span>
              </div>

              {wallpaper.limitedFreeUntil && timeLeft !== 'EXPIRED' && (
                <div className="bg-amber-50 px-4 py-2 border-l-2 border-amber-400">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-amber-700 font-bold mb-1">Offer Ends In</p>
                  <p className="text-xl font-serif tabular-nums">{timeLeft}</p>
                </div>
              )}
            </div>

            <div className="pt-6">
              {isActuallyFree ? (
                <button 
                  onClick={handleDownload}
                  className="w-full sm:w-auto bg-black text-white px-12 py-5 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-[#c5a059] transition-all duration-500 shadow-xl flex items-center justify-center gap-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download Wallpaper
                </button>
              ) : (
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full sm:w-auto bg-[#25D366] text-white px-12 py-5 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all duration-500 shadow-xl flex items-center justify-center gap-4"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.192-3.33.874.89-3.246-.211-.336a9.283 9.283 0 01-1.424-4.947c0-5.112 4.158-9.27 9.27-9.27 2.475 0 4.803.965 6.556 2.719a9.232 9.232 0 012.714 6.557c0 5.114-4.158 9.27-9.271 9.27m7.952-17.224a10.939 10.939 0 00-7.952-3.297c-6.044 0-10.962 4.918-10.962 10.962 0 1.93.499 3.817 1.448 5.483L2 22l5.636-1.479a10.927 10.927 0 00-5.32 1.373c6.042 0 10.96-4.919 10.96-10.962 0-2.92-1.139-5.666-3.21-7.734z"/></svg>
                  Order via WhatsApp
                </button>
              )}
            </div>
            
            <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em]">
              {isActuallyFree ? "Fast direct download to your phone gallery." : "Payment via bKash/Nagad available."}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default WallpaperModal;
