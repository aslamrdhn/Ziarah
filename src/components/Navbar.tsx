import React, { useState } from 'react';
import { Compass, Map as MapIcon, BookOpen, ShieldCheck, UserCog, Send, Bookmark, MoreVertical } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  onOpenKontribusi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenKontribusi }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // State for mobile-friendly dropdown (Priority 4 partial fix)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: '/peta', label: 'Peta', icon: MapIcon },
    { id: '/', label: 'Direktori', icon: Compass },
    { id: '/panduan', label: 'Panduan', icon: BookOpen },
    { id: '/doa', label: 'Koleksi Doa', icon: Bookmark },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3">
      <Link to="/" className="flex items-center space-x-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center shadow-sm">
          <Compass className="w-5 h-5 text-gold-300" />
        </div>
        <span className="font-serif font-bold tracking-tight hidden sm:block text-brand-900 text-xl">
          Ziarah<span className="text-gold-600">Nusantara</span>
        </span>
      </Link>

      <div className="flex items-center space-x-1 md:space-x-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            className={`relative flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              currentPath === item.id || (currentPath.startsWith('/makam') && item.id === '/peta')
                ? 'bg-brand-50 text-brand-800 border border-brand-100' 
                : 'text-stone-500 hover:text-brand-800 hover:bg-stone-50'
            }`}
          >
            <item.icon className={`w-4 h-4 md:mr-2 ${currentPath === item.id || (currentPath.startsWith('/makam') && item.id === '/peta') ? 'text-brand-600' : ''}`} />
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <PWAInstallButton />
        
        <button
          onClick={onOpenKontribusi}
          className="hidden md:flex items-center bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-md border border-gold-400"
        >
          <Send className="w-4 h-4 mr-2" />
          Kontribusi
        </button>
        
        {/* Discrete Admin/Settings Dropdown Trigger - Now Click-based */}
        <div className="relative hidden sm:block">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            className="p-2 text-stone-400 hover:text-brand-800 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-100 z-50">
                <div className="p-2 space-y-1">
                  <Link 
                    to="/kurasi" 
                    onClick={() => setDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 text-sm text-stone-600 hover:bg-brand-50 hover:text-brand-800 rounded-lg flex items-center"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" /> Kurasi Kontribusi
                  </Link>
                  <Link 
                    to="/admin" 
                    onClick={() => setDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 text-sm text-stone-600 hover:bg-brand-50 hover:text-brand-800 rounded-lg flex items-center"
                  >
                    <UserCog className="w-4 h-4 mr-2" /> Panel Admin
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
