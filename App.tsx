
import React, { useState, useEffect } from 'react';
import { ViewState, Wallpaper, Language, Theme, translations } from './types';
import { getWallpapers, saveWallpapers } from './store';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('GALLERY');
  const [lang, setLang] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>('light');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    setWallpapers(getWallpapers());
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handleSaveWallpapers = (updated: Wallpaper[]) => {
    setWallpapers(updated);
    saveWallpapers(updated);
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setView('ADMIN');
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setView('GALLERY');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-700">
      <Navbar 
        currentView={view} 
        setView={setView} 
        isAdmin={isAdminAuthenticated}
        logout={handleLogout}
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-grow">
        {view === 'GALLERY' && (
          <Gallery wallpapers={wallpapers.filter(w => w.isActive)} lang={lang} />
        )}
        
        {view === 'LOGIN' && (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}

        {view === 'ADMIN' && isAdminAuthenticated && (
          <AdminPanel 
            wallpapers={wallpapers} 
            onSave={handleSaveWallpapers} 
            onLogout={handleLogout}
            onBack={() => setView('GALLERY')}
          />
        )}
      </main>

      <footer className="py-32 px-6 border-t border-chocolate/5 dark:border-white/5 bg-offwhite dark:bg-chocolate">
        <div className="max-w-[1600px] mx-auto flex flex-col items-center">
          
          <div className="text-center mb-24">
             <h2 className="font-serif text-7xl md:text-[12rem] font-black text-chocolate dark:text-white opacity-[0.03] leading-none select-none">
               GRAPHICO
             </h2>
             <div className="flex flex-col items-center -mt-10 md:-mt-20">
                <span className="text-gold font-serif text-3xl md:text-5xl italic font-light tracking-tighter">Graphico Global</span>
                <p className="text-[10px] md:text-[12px] uppercase tracking-[0.8em] text-chocolate dark:text-white mt-6 opacity-40 font-black">Luxury Digital Goods Atelier</p>
             </div>
          </div>

          <div className="flex gap-12 mb-16">
             <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-chocolate/10 dark:border-white/10 hover:bg-gold hover:border-gold hover:text-white transition-all">
               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
             </a>
             <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-chocolate/10 dark:border-white/10 hover:bg-gold hover:border-gold hover:text-white transition-all">
               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 3.99-1.73 6.66-2.87 8.01-3.41 3.81-1.54 4.6-1.8 5.12-1.81.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.02.15z"/></svg>
             </a>
          </div>

          <div className="text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-chocolate/20 dark:text-white/20 font-bold italic">Designed & Crafted by</p>
            <p className="text-gold font-serif text-2xl font-black italic tracking-tighter uppercase">Graphico Global</p>
            <p className="text-[9px] text-chocolate/30 dark:text-white/30 uppercase tracking-[0.3em] mt-8">© {new Date().getFullYear()} All Masterpieces Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
