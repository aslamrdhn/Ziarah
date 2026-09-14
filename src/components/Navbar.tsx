import React from 'react';
import { Compass, Map as MapIcon, BookOpen, ShieldCheck, UserCog, Send, Bookmark, MoreVertical } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenKontribusi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenKontribusi }) => {
  const navItems = [
    { id: 'peta', label: 'Peta', icon: MapIcon },
    { id: 'daftar', label: 'Direktori', icon: Compass },
    { id: 'bacaan', label: 'Panduan', icon: BookOpen },
    { id: 'doa-karomah', label: 'Koleksi Doa', icon: Bookmark },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2 cursor-pointer shrink-0" onClick={() => onNavigate('daftar')}>
        <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center shadow-sm">
          <Compass className="w-5 h-5 text-gold-300" />
        </div>
        <span className="font-serif font-bold tracking-tight hidden sm:block text-brand-900 text-xl">
          Ziarah<span className="text-gold-600">Nusantara</span>
        </span>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              currentView === item.id 
                ? 'bg-brand-50 text-brand-800 border border-brand-100' 
                : 'text-stone-500 hover:text-brand-800 hover:bg-stone-50'
            }`}
          >
            <item.icon className={`w-4 h-4 md:mr-2 ${currentView === item.id ? 'text-brand-600' : ''}`} />
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenKontribusi}
          className="hidden md:flex items-center bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-md border border-gold-400"
        >
          <Send className="w-4 h-4 mr-2" />
          Kontribusi
        </button>
        
        {/* Discrete Admin/Settings Dropdown Trigger */}
        <div className="relative group hidden sm:block">
          <button className="p-2 text-stone-400 hover:text-brand-800 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2 space-y-1">
              <button onClick={() => onNavigate('kurasi')} className="w-full text-left px-3 py-2 text-sm text-stone-600 hover:bg-brand-50 hover:text-brand-800 rounded-lg flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2" /> Kurasi Kontribusi
              </button>
              <button onClick={() => onNavigate('admin')} className="w-full text-left px-3 py-2 text-sm text-stone-600 hover:bg-brand-50 hover:text-brand-800 rounded-lg flex items-center">
                <UserCog className="w-4 h-4 mr-2" /> Panel Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
