
import React, { useState, useEffect } from 'react';
import { ViewState, Wallpaper } from './types';
import { getWallpapers, saveWallpapers } from './store';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('GALLERY');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    setWallpapers(getWallpapers());
  }, []);

  const handleSaveWallpapers = (updated: Wallpaper[]) => {
    setWallpapers(updated);
    saveWallpapers(updated);
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setView('ADMIN');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <Navbar 
        currentView={view} 
        setView={setView} 
        isAdmin={isAdminAuthenticated}
        logout={() => setIsAdminAuthenticated(false)}
      />

      <main className="flex-grow">
        {view === 'GALLERY' && (
          <Gallery wallpapers={wallpapers.filter(w => w.isActive)} />
        )}
        
        {view === 'LOGIN' && (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}

        {view === 'ADMIN' && isAdminAuthenticated && (
          <AdminPanel 
            wallpapers={wallpapers} 
            onSave={handleSaveWallpapers} 
          />
        )}
      </main>

      <footer className="bg-white border-t border-neutral-100 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h3 className="font-serif text-2xl mb-6 italic tracking-tight text-neutral-900">Graphico Global</h3>
          
          <div className="flex gap-8 mb-10">
            <a href="https://www.facebook.com/graphicoglobal" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 group-hover:text-black">Facebook</span>
            </a>
            
            <a href="https://t.me/GraphicoGlobal" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-[#0088cc] group-hover:text-white transition-all duration-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 3.99-1.73 6.66-2.87 8.01-3.41 3.81-1.54 4.6-1.8 5.12-1.81.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.02.15z"/></svg>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 group-hover:text-black">Telegram</span>
            </a>
          </div>

          <div className="text-center">
            <p className="text-neutral-400 text-xs font-light">© {new Date().getFullYear()} Graphico Global. Elegance in Every Pixel.</p>
            <p className="mt-2 text-[9px] tracking-[0.3em] uppercase text-neutral-200">Crafting Visual Stories in Bangladesh</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
