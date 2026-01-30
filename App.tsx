
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
    <div className="min-h-screen flex flex-col">
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

      <footer className="bg-white border-t py-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Graphico Global. All Rights Reserved.</p>
        <p className="mt-2 text-[10px] tracking-widest uppercase">Elegance in Every Pixel</p>
      </footer>
    </div>
  );
};

export default App;
