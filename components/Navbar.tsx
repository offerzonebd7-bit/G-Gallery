
import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isAdmin: boolean;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAdmin, logout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-neutral-50/50">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-24">
          <div 
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => setView('GALLERY')}
          >
            <h1 className="font-serif text-2xl md:text-3xl tracking-tighter font-bold text-neutral-900 group-hover:italic transition-all duration-700">
              GRAPHICO <span className="font-light text-neutral-300">GLOBAL</span>
            </h1>
          </div>

          <div className="flex items-center space-x-12">
            <button 
              onClick={() => setView('GALLERY')}
              className={`text-[10px] tracking-[0.4em] uppercase transition-all duration-500 relative ${
                currentView === 'GALLERY' ? 'text-black font-bold' : 'text-neutral-300 hover:text-black'
              }`}
            >
              Gallery
              {currentView === 'GALLERY' && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#c5a059]" />}
            </button>
            
            {!isAdmin ? (
              <button 
                onClick={() => setView('LOGIN')}
                className={`text-[10px] tracking-[0.4em] uppercase transition-all duration-500 border border-neutral-100 px-6 py-3 hover:bg-black hover:text-white ${
                  currentView === 'LOGIN' ? 'bg-black text-white' : 'text-neutral-400'
                }`}
              >
                Atelier
              </button>
            ) : (
              <div className="flex items-center space-x-10">
                <button 
                  onClick={() => setView('ADMIN')}
                  className={`text-[10px] tracking-[0.4em] uppercase transition-all duration-500 ${
                    currentView === 'ADMIN' ? 'text-black font-bold' : 'text-neutral-300 hover:text-black'
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    logout();
                    setView('GALLERY');
                  }}
                  className="text-[9px] text-red-300 hover:text-red-500 uppercase tracking-[0.3em] font-medium transition-colors"
                >
                  Sign Out
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
