
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
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-b border-neutral-100 dark:border-neutral-900">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div 
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => setView('GALLERY')}
          >
            <h1 className="font-serif text-xl md:text-2xl tracking-tighter font-bold text-neutral-900 dark:text-white group-hover:italic transition-all duration-700">
              GRAPHICO <span className="font-light text-[#c5a059]">GLOBAL</span>
            </h1>
          </div>

          <div className="flex items-center space-x-6 md:space-x-10">
            {/* Lang Toggle */}
            <button 
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#c5a059] px-2 py-1 border border-[#c5a059]/30 rounded"
            >
              {lang === 'bn' ? 'EN' : 'বাংলা'}
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-neutral-400 hover:text-black dark:hover:text-white">
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707M17.636 17.636l-.707-.707M6.364 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              )}
            </button>

            <button 
              onClick={() => setView('GALLERY')}
              className={`text-[10px] md:text-[11px] tracking-[0.3em] uppercase transition-all ${
                currentView === 'GALLERY' ? 'text-black dark:text-white font-bold underline decoration-[#c5a059]' : 'text-neutral-300'
              }`}
            >
              {t.gallery}
            </button>
            
            {!isAdmin ? (
              <button 
                onClick={() => setView('LOGIN')}
                className="p-2 text-neutral-300 hover:text-black dark:hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </button>
            ) : (
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setView('ADMIN')}
                  className="text-[11px] tracking-widest uppercase font-bold text-[#c5a059]"
                >
                  {t.dashboard}
                </button>
                <button onClick={logout} className="text-red-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
