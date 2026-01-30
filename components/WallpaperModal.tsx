
import React, { useEffect, useState } from 'react';
import { Wallpaper, Language, translations } from '../types';

interface WallpaperModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
  lang: Language;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ wallpaper, onClose, lang }) => {
  const t = translations[lang];
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const paymentNumber = '01930277399';

  useEffect(() => {
    setIsAnimating(true);
    if (!wallpaper.limitedFreeUntil) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = wallpaper.limitedFreeUntil! - now;
      if (diff <= 0) { setTimeLeft('00:00:00'); clearInterval(timer); }
      else {
        const h = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const s = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        setTimeLeft(`${h}:${m}:${s}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [wallpaper.limitedFreeUntil]);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleWhatsAppOrder = (method: string) => {
    const finalNumber = method === 'Rocket' ? paymentNumber + '4' : paymentNumber;
    const msg = encodeURIComponent(`অর্ডার: ${wallpaper.name}\nপেমেন্ট মেথড: ${method}\nডিজাইন আইডি: ${wallpaper.id}\nপেমেন্ট নম্বর: ${finalNumber}`);
    window.open(`https://wa.me/8801930277399?text=${msg}`, '_blank');
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(wallpaper.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${wallpaper.name}_Graphico.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch { window.open(wallpaper.imageUrl, '_blank'); }
  };

  const isFree = !wallpaper.isPremium || (wallpaper.limitedFreeUntil && Date.now() < wallpaper.limitedFreeUntil);

  const paymentMethods = [
    { name: 'bKash', color: 'bg-[#e2136e]', icon: 'https://img.icons8.com/color/48/000000/bkash.png' },
    { name: 'Nagad', color: 'bg-[#f7941d]', icon: 'https://img.icons8.com/color/48/000000/nagad.png' },
    { name: 'Rocket', color: 'bg-[#8c3494]', icon: 'https://img.icons8.com/color/48/000000/rocket.png' },
    { name: 'Tap', color: 'bg-[#00a651]', icon: 'https://img.icons8.com/color/48/000000/tap.png' },
    { name: 'Upay', color: 'bg-[#005ea1]', icon: 'https://img.icons8.com/color/48/000000/upay.png' },
    { name: 'mCash', color: 'bg-[#1b75bc]', icon: 'https://img.icons8.com/color/48/000000/mcash.png' },
  ];

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-[#050505] transition-opacity duration-700 overflow-y-auto ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <button onClick={onClose} className="fixed top-8 right-8 text-neutral-400 hover:text-black dark:hover:text-white z-[110]">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <div className="max-w-6xl w-full px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="flex justify-center sticky top-24">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-neutral-50 dark:border-neutral-900 max-w-[380px] w-full bg-neutral-100 dark:bg-neutral-800">
              <img src={wallpaper.imageUrl} alt={wallpaper.name} className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-[#c5a059] font-bold block mb-2">{wallpaper.category}</span>
              <h2 className="font-serif text-5xl md:text-6xl text-neutral-900 dark:text-white leading-tight italic">
                {wallpaper.name}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 mt-6 text-lg font-light leading-relaxed italic border-l-4 border-[#c5a059]/30 pl-6">
                "{wallpaper.description}"
              </p>
            </div>

            <div className="flex items-center gap-8 py-6 border-y border-neutral-100 dark:border-neutral-900">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{t.price}</p>
                <span className="text-4xl font-serif text-neutral-900 dark:text-white italic">
                  {isFree ? t.free : `৳ ${Math.round(wallpaper.price * 115)}`}
                </span>
              </div>
              {wallpaper.limitedFreeUntil && Date.now() < wallpaper.limitedFreeUntil && (
                <div className="bg-[#c5a059]/10 px-4 py-2 rounded-xl">
                  <p className="text-[9px] uppercase tracking-tighter text-[#c5a059] font-bold mb-1">{t.limitedOffer}</p>
                  <p className="text-xl font-bold tabular-nums text-[#c5a059]">{timeLeft}</p>
                </div>
              )}
            </div>

            {isFree ? (
              <button onClick={handleDownload} className="w-full bg-black dark:bg-white dark:text-black text-white py-6 rounded-2xl text-xs uppercase tracking-[0.4em] font-bold shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                {t.download}
              </button>
            ) : (
              <div className="space-y-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span> {t.payHeader}
                  </h4>
                  <p className="text-xs text-neutral-500 mb-6">{t.paySub}</p>
                  
                  <div className="flex items-center justify-between bg-white dark:bg-black p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 mb-8 group">
                    <span className="text-xl font-bold tracking-widest">{paymentNumber}</span>
                    <button onClick={handleCopy} className="text-[10px] uppercase font-bold text-[#c5a059] px-4 py-2 bg-[#c5a059]/10 rounded-lg hover:bg-[#c5a059] hover:text-white transition-all">
                      {copySuccess ? t.copied : t.copy}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {paymentMethods.map(m => (
                      <button 
                        key={m.name} 
                        onClick={() => handleWhatsAppOrder(m.name)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-transparent hover:border-black dark:hover:border-white bg-white dark:bg-black transition-all group overflow-hidden relative`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest mb-1">{m.name}</span>
                        <div className={`w-full h-1 absolute bottom-0 ${m.color}`} />
                        {m.name === 'Rocket' && <span className="text-[8px] text-[#c5a059] mt-1 font-bold italic">+4 Extra</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-center text-[10px] uppercase tracking-widest text-[#c5a059] font-bold animate-pulse">{t.whatsappConfirm}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperModal;
