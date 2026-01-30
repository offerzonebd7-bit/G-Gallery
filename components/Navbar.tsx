
import React from 'react';
import { ViewState, Language, Theme, translations } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isAdmin: boolean;
  logout: () => void;
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAdmin, logout, lang, setLang, theme, toggleTheme }) => {
  const t = translations[lang];

  return (
    <nav className="sticky top-0 z-[100] bg-offwhite/80 dark:bg-chocolate/80 backdrop-blur-2xl border-b border-chocolate/5 dark:border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 md:h-24 flex justify-between items-center">
        
        {/* Branding */}
        <div 
          className="cursor-pointer group flex items-center gap-4"
          onClick={() => setView('GALLERY')}
        >
          <div className="w-10 h-10 bg-chocolate dark:bg-offwhite rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
             <span className="text-offwhite dark:text-chocolate font-serif text-xl font-bold italic">G</span>
          </div>
          <div>
            <h1 className="font-serif text-xl md:text-2xl font-black text-chocolate dark:text-white uppercase tracking-tighter leading-none">
              GRAPHICO <span className="text-gold font-light italic">GLOBAL</span>
            </h1>
            <p className="text-[8px] uppercase tracking-[0.4em] text-chocolate/40 dark:text-white/40 mt-1">Premium Digital Atelier</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 md:gap-10">
          <button 
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="text-[10px] font-black uppercase tracking-widest text-chocolate dark:text-white hover:text-gold transition-colors"
          >
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>

          <button onClick={toggleTheme} className="text-chocolate dark:text-white opacity-40 hover:opacity-100 transition-opacity">
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707M17.636 17.636l-.707-.707M6.364 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )}
          </button>

          {isAdmin ? (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setView('ADMIN')} 
                className={`text-[10px] font-black uppercase tracking-widest ${currentView === 'ADMIN' ? 'text-gold' : 'text-chocolate dark:text-white opacity-40 hover:opacity-100'}`}
              >
                {t.dashboard}
              </button>
              <button onClick={logout} className="text-red-500/60 hover:text-red-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setView('LOGIN')} 
              className="w-10 h-10 bg-chocolate dark:bg-offwhite rounded-full flex items-center justify-center group hover:rotate-12 transition-all shadow-xl shadow-chocolate/10"
            >
              <svg className="w-4 h-4 text-offwhite dark:text-chocolate" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
