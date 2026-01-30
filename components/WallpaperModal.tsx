
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
    const phone = '01930277399';
    const message = encodeURIComponent(`I want to get the [${wallpaper.name}] wallpaper.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
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
          
          {/* Cinematic Image Container */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center">
            <div className="relative group rounded-none overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] max-w-[450px] w-full bg-neutral-50 animate-fadeIn">
              <img 
                src={wallpaper.imageUrl} 
                alt={wallpaper.name}
                className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
              />
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#c5a059]/40" />
                <span className="text-[11px] uppercase tracking-[0.5em] text-[#c5a059] font-medium">{wallpaper.category}</span>
              </div>
              <h2 className="font-serif text-6xl md:text-8xl text-neutral-900 leading-[0.9] mb-8 tracking-tighter italic">
                {wallpaper.name.split(' ').map((word, i) => (
                   <span key={i} className={i % 2 === 0 ? 'not-italic font-light' : ''}>{word} </span>
                ))}
              </h2>
            </div>

            <div className="max-w-lg">
              <p className="text-neutral-500 text-xl leading-relaxed font-light italic border-l-2 border-neutral-100 pl-8">
                "{wallpaper.description}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-end max-w-xl">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 mb-2">Acquisition Cost</p>
                <span className="text-4xl font-serif text-neutral-900 italic">
                  {isActuallyFree ? (
                    <span className="text-[#c5a059]">Complimentary</span>
                  ) : (
                    `$${wallpaper.price.toFixed(2)}`
                  )}
                </span>
              </div>

              {wallpaper.limitedFreeUntil && timeLeft !== 'EXPIRED' && (
                <div className="bg-neutral-50 p-6 border-l-2 border-amber-400">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-amber-700 font-bold mb-3">Limited Exposure Opportunity</p>
                  <p className="text-2xl font-serif text-neutral-900 tracking-tighter tabular-nums">{timeLeft}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center max-w-lg">
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full relative group bg-black text-white px-10 py-6 text-[11px] uppercase tracking-[0.4em] font-bold overflow-hidden transition-all duration-700"
              >
                <span className="relative z-10 group-hover:tracking-[0.6em] transition-all duration-700">{isActuallyFree ? 'Acquire for Free' : 'Secure Design'}</span>
                <div className="absolute inset-0 bg-[#c5a059] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
              </button>
              
              <div className="flex flex-col items-center sm:items-start">
                 <p className="text-[9px] text-neutral-300 uppercase tracking-[0.2em] mb-1">Authenticated via</p>
                 <span className="text-[10px] text-neutral-600 font-bold tracking-[0.1em]">WhatsApp Messenger</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default WallpaperModal;
