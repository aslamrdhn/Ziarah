import React, { useState, useEffect } from 'react';
import { Compass, Map as MapIcon, BookOpen, ShieldCheck, UserCog, Bookmark, MoreVertical, LogIn, LogOut, ExternalLink, AlertCircle, Loader2, X, ScrollText, HeartHandshake } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PWAInstallButton } from './PWAInstallButton';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { APP_BRAND } from '../config/brand';

interface NavbarProps {
  onOpenKontribusi: () => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({ onOpenKontribusi }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authErrorModal, setAuthErrorModal] = useState<{ title: string; message: string; isNetworkOrIframe: boolean } | null>(null);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  useEffect(() => {
    if (typeof document !== 'undefined' && APP_BRAND.documentTitle) {
      document.title = APP_BRAND.documentTitle;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setAuthErrorModal(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setDropdownOpen(false);
      setAuthErrorModal(null);
    } catch (error: any) {
      console.error("Error signing in with Google", error);
      const errorCode = error?.code || '';
      
      if (errorCode === 'auth/network-request-failed') {
        setAuthErrorModal({
          title: 'Koneksi Autentikasi Dibatasi',
          message: isInIframe 
            ? 'Browser Anda atau pratinjau iframe membatasi akses kredensial ke Google Auth. Buka aplikasi di Tab Baru untuk login dengan akun Google Anda.'
            : 'Gagal menghubungi server Google Auth (auth/network-request-failed). Periksa koneksi internet Anda atau buka aplikasi di tab baru.',
          isNetworkOrIframe: true
        });
      } else if (errorCode === 'auth/popup-blocked') {
        setAuthErrorModal({
          title: 'Jendela Pop-up Diblokir',
          message: 'Browser memblokir jendela pop-up Google Sign-In. Silakan izinkan pop-up untuk situs ini atau buka di tab baru.',
          isNetworkOrIframe: true
        });
      } else if (errorCode === 'auth/popup-closed-by-user' || errorCode === 'auth/cancelled-popup-request') {
        // User closed the popup
      } else {
        setAuthErrorModal({
          title: 'Gagal Masuk via Google',
          message: error?.message || 'Terjadi kendala saat menghubungkan ke akun Google Anda. Silakan coba lagi.',
          isNetworkOrIframe: false
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const navItems = [
    { id: '/', label: 'Arsip & Direktori', shortLabel: 'Direktori', icon: Compass },
    { id: '/peta', label: 'Peta Rute', shortLabel: 'Peta', icon: MapIcon },
    { id: '/panduan', label: 'Panduan', shortLabel: 'Panduan', icon: BookOpen },
    { id: '/rubrik', label: 'Rubrik', shortLabel: 'Rubrik', icon: ScrollText },
    { id: '/doa', label: 'Doa Khusus', shortLabel: 'Doa', icon: Bookmark },
    { id: '/infaq', label: 'Infaq', shortLabel: 'Infaq', icon: HeartHandshake },
  ];

  const isNavActive = (id: string) => {
    if (id === '/') return currentPath === '/';
    if (id === '/peta') return currentPath === '/peta' || currentPath.startsWith('/makam');
    return currentPath === id;
  };

  return (
    <>
      {/* Top Navbar following Clean 3-Zone Editorial Contract (Mobile, Tablet, Desktop) */}
      <nav className="w-full flex items-center justify-between gap-3 lg:gap-8 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Zone 1: Brand Wordmark & Editorial Tagline */}
        <Link to="/" className="group flex flex-col justify-center shrink-0">
          <span className="font-serif font-bold tracking-tight text-stone-900 group-hover:text-emerald-950 transition-colors text-lg sm:text-xl leading-tight whitespace-nowrap">
            {APP_BRAND.name}
          </span>
          {APP_BRAND.tagline && (
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-stone-500 leading-tight whitespace-nowrap mt-0.5">
              {APP_BRAND.tagline}
            </span>
          )}
        </Link>

        {/* Zone 2: Clean Editorial Text Navigation Links (Compact on Tablet md, Full on Desktop lg) */}
        <div className="hidden md:flex items-center gap-3.5 lg:gap-6 text-xs lg:text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <span className="lg:hidden">{item.shortLabel}</span>
                <span className="hidden lg:inline">{item.label}</span>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-emerald-800 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Zone 3: Primary Action & Account Menu */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <PWAInstallButton />
          
          <button
            type="button"
            onClick={onOpenKontribusi}
            className="px-3 sm:px-4 py-2 bg-stone-900 hover:bg-emerald-900 active:scale-[0.98] text-[#F9F8F4] rounded-lg font-semibold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="sm:hidden">+ Arsip</span>
            <span className="hidden sm:inline">Kontribusi Arsip</span>
          </button>
          
          {/* User Auth Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              className={`p-2 rounded-lg transition-all flex items-center border cursor-pointer ${
                user 
                  ? 'text-emerald-900 bg-emerald-50/80 border-emerald-200 hover:bg-emerald-100/60' 
                  : 'text-stone-600 bg-stone-100/80 border-stone-200/80 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
              title={user ? user.displayName || 'Akun Anda' : 'Masuk / Pengaturan'}
            >
              {user ? (
                <div className="flex items-center space-x-1.5">
                  <img 
                    src={user.photoURL || ''} 
                    alt="Avatar" 
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-md object-cover" 
                  />
                  <MoreVertical className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
                </div>
              ) : (
                <MoreVertical className="w-4 h-4" />
              )}
            </button>
            
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-56 bg-[#FBF9F5] rounded-2xl shadow-xl border border-stone-200/90 z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150">
                  {user && (
                    <div className="px-3 py-2.5 mb-1 bg-stone-100/80 rounded-xl border border-stone-200/60">
                      <p className="text-xs font-bold text-stone-900 truncate">{user.displayName}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <Link 
                      to="/kurasi" 
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-200/60 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2.5 text-emerald-800" /> Standar Kurasi
                    </Link>
                    <Link 
                      to="/admin" 
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-200/60 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <UserCog className="w-4 h-4 mr-2.5 text-emerald-800" /> Panel Kurator
                    </Link>
                    
                    <div className="my-1 border-t border-stone-200/80"></div>

                    {user ? (
                      <button 
                        onClick={() => { handleLogout(); setDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-rose-700 hover:bg-rose-50 rounded-xl flex items-center transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2.5" /> Keluar
                      </button>
                    ) : (
                      <button 
                        disabled={isLoggingIn}
                        onClick={handleLogin}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-900 hover:bg-emerald-50 rounded-xl flex items-center transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isLoggingIn ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2.5 animate-spin text-emerald-700" />
                            <span>Menghubungkan...</span>
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2.5 text-emerald-700" />
                            <span>Masuk via Google</span>
                          </>
                        )}
                      </button>
                    )}

                    {isInIframe && (
                      <button
                        onClick={() => { window.open(window.location.href, '_blank'); setDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl flex items-center transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-2.5 text-stone-400" />
                        <span>Buka di Tab Baru</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Bottom Nav for Mobile / Smartphone Users */}
      <div className="md:hidden fixed bottom-2.5 left-2.5 right-2.5 z-[2500] pointer-events-none">
        <div className="bg-[#FBF9F5]/95 backdrop-blur-md border border-stone-300/90 shadow-[0_10px_30px_rgba(28,25,23,0.12)] rounded-2xl p-1.5 flex items-center justify-around pointer-events-auto max-w-md mx-auto">
          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-colors duration-150 ${
                  active 
                    ? 'text-stone-950 font-bold bg-stone-200/80 border border-stone-300/70' 
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <item.icon className={`w-4 h-4 mb-0.5 transition-transform ${active ? 'text-emerald-800 scale-105' : 'text-stone-400'}`} />
                <span className="text-[10px] leading-tight font-medium tracking-tight truncate max-w-[54px] whitespace-nowrap">
                  {item.shortLabel || item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Auth Error Modal */}
      {authErrorModal && (
        <div className="fixed inset-0 z-[3000] bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setAuthErrorModal(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">{authErrorModal.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">Kendala Autentikasi Google</p>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed mb-5">
              {authErrorModal.message}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {authErrorModal.isNetworkOrIframe && (
                <button
                  onClick={() => {
                    window.open(window.location.href, '_blank');
                    setAuthErrorModal(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buka di Tab Baru
                </button>
              )}
              <button
                disabled={isLoggingIn}
                onClick={handleLogin}
                className="py-2.5 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 text-sm font-semibold rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    <span>Mencoba...</span>
                  </>
                ) : (
                  <span>Coba Lagi</span>
                )}
              </button>
              <button
                onClick={() => setAuthErrorModal(null)}
                className="py-2.5 px-3 text-stone-500 hover:text-stone-800 text-sm font-medium rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
