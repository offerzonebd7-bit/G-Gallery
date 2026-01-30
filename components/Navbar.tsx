
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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setView('GALLERY')}
          >
            <h1 className="font-serif text-2xl tracking-tight font-bold text-gray-900">
              GRAPHICO <span className="font-light text-gray-500">GLOBAL</span>
            </h1>
          </div>

          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setView('GALLERY')}
              className={`text-sm tracking-widest uppercase transition-colors ${
                currentView === 'GALLERY' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'
              }`}
            >
              Gallery
            </button>
            
            {!isAdmin ? (
              <button 
                onClick={() => setView('LOGIN')}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  currentView === 'LOGIN' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'
                }`}
              >
                Owner
              </button>
            ) : (
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setView('ADMIN')}
                  className={`text-sm tracking-widest uppercase transition-colors ${
                    currentView === 'ADMIN' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    logout();
                    setView('GALLERY');
                  }}
                  className="text-xs text-red-400 hover:text-red-600 uppercase tracking-widest"
                >
                  Logout
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
