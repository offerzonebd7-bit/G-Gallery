
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
    const priceText = !isFree ? `৳${Math.round(wallpaper.price * 115)}` : 'Free';
    const msg = encodeURIComponent(`আসসালামু আলাইকুম, গ্রাফিকো গ্লোবাল!\n\nআমি এই প্রিমিয়াম ওয়ালপেপারটি অর্ডার করতে চাই:\n\nডিজাইন: ${wallpaper.name}\nমূল্য: ${priceText}\nপেমেন্ট মেথড: ${method}\n\nধন্যবাদ!`);
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
    { name: 'bKash', color: 'bg-[#e2136e]', icon: 'https://img.icons8.com/color/48/bkash.png' },
    { name: 'Nagad', color: 'bg-[#f7941d]', icon: 'https://img.icons8.com/color/48/nagad.png' },
    { name: 'Rocket', color: 'bg-[#8c3494]', icon: 'https://img.icons8.com/color/48/rocket.png' },
    { name: 'Tap', color: 'bg-[#00a651]', icon: 'https://img.icons8.com/color/48/tap.png' },
    { name: 'Upay', color: 'bg-[#005ea1]', icon: 'https://img.icons8.com/color/48/upay.png' },
    { name: 'mCash', color: 'bg-[#1b75bc]', icon: 'https://img.icons8.com/color/48/mcash.png' },
  ];

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center bg-offwhite/98 dark:bg-chocolate/98 transition-all duration-700 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <button 
        onClick={onClose} 
        className="fixed top-8 right-8 text-chocolate/40 dark:text-white/40 hover:text-gold hover:rotate-90 transition-all z-[210]"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={1.5} /></svg>
      </button>

      <div className="max-w-7xl w-full px-6 py-10 flex flex-col lg:flex-row gap-16 items-center lg:items-start overflow-y-auto max-h-screen">
        
        {/* Gallery View */}
        <div className="lg:w-1/2 flex justify-center sticky lg:top-0">
          <div className="relative rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(45,27,19,0.3)] border-[6px] border-white dark:border-white/10 max-w-[420px] w-full bg-chocolate/5">
            <img src={wallpaper.imageUrl} alt={wallpaper.name} className="w-full h-auto pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:w-1/2 space-y-12 pb-20 pt-4">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.5em] text-gold font-black">{wallpaper.category}</span>
            <h2 className="font-serif text-6xl md:text-8xl text-chocolate dark:text-white leading-[0.9] font-bold italic tracking-tighter">
              {wallpaper.name}
            </h2>
            <div className="h-px w-20 bg-gold/30 mt-8" />
            <p className="text-chocolate/60 dark:text-white/60 text-xl font-light italic leading-relaxed max-w-lg mt-6">
              "{wallpaper.description}"
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-12 py-10 border-y border-chocolate/5 dark:border-white/5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-chocolate/30 dark:text-white/30 mb-2 font-bold">{t.price}</p>
              <span className="text-5xl font-serif text-chocolate dark:text-white font-black italic">
                {isFree ? t.free : `৳${Math.round(wallpaper.price * 115)}`}
              </span>
            </div>
            {wallpaper.limitedFreeUntil && Date.now() < wallpaper.limitedFreeUntil && (
              <div className="bg-gold/5 dark:bg-gold/10 px-8 py-4 rounded-[2rem] border border-gold/20">
                <p className="text-[10px] uppercase font-black text-gold mb-1 tracking-tighter">{t.limitedOffer}</p>
                <p className="text-3xl font-bold tabular-nums text-gold">{timeLeft}</p>
              </div>
            )}
          </div>

          {isFree ? (
            <button 
              onClick={handleDownload} 
              className="w-full bg-chocolate dark:bg-offwhite text-offwhite dark:text-chocolate py-8 rounded-[2.5rem] text-[12px] uppercase tracking-[0.6em] font-black shadow-2xl hover:bg-gold dark:hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-5 group"
            >
              <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth={2} /></svg>
              {t.download}
            </button>
          ) : (
            <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-1000">
              <div className="bg-chocolate/5 dark:bg-white/5 p-10 rounded-[3.5rem] border border-chocolate/5 dark:border-white/5 shadow-inner">
                <div className="flex items-center justify-between mb-8">
                   <h4 className="text-2xl font-serif italic font-black text-chocolate dark:text-white">{t.payHeader}</h4>
                   <div className="bg-gold/20 p-3 rounded-full">
                     <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth={2}/></svg>
                   </div>
                </div>
                
                <div className="flex items-center justify-between bg-white dark:bg-chocolate px-8 py-6 rounded-3xl border border-chocolate/5 dark:border-white/10 mb-10 group">
                  <span className="text-3xl font-bold tracking-[0.2em] text-chocolate dark:text-white">{paymentNumber}</span>
                  <button 
                    onClick={handleCopy} 
                    className="text-[10px] uppercase font-black text-gold px-6 py-3 border border-gold/30 hover:bg-gold hover:text-white rounded-2xl transition-all"
                  >
                    {copySuccess ? t.copied : t.copy}
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {paymentMethods.map(m => (
                    <button 
                      key={m.name} 
                      onClick={() => handleWhatsAppOrder(m.name)}
                      className={`flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white dark:bg-chocolate border-2 border-transparent hover:border-gold transition-all group shadow-sm hover:-translate-y-2`}
                    >
                      <img src={m.icon} alt={m.name} className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-chocolate dark:text-white">{m.name}</span>
                      {m.name === 'Rocket' && <span className="text-[8px] text-gold font-bold mt-1 italic">+4 EXTRA</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-center space-y-4">
                <p className="text-[11px] uppercase tracking-[0.5em] text-gold font-black animate-pulse">{t.whatsappConfirm}</p>
                <div className="flex justify-center gap-3 opacity-20">
                  <div className="w-1 h-1 rounded-full bg-gold" />
                  <div className="w-1 h-1 rounded-full bg-gold" />
                  <div className="w-1 h-1 rounded-full bg-gold" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WallpaperModal;
