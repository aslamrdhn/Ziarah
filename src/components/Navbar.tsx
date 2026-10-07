import React, { useState, useEffect } from 'react';
import { Compass, Map as MapIcon, BookOpen, ShieldCheck, UserCog, Bookmark, MoreVertical, LogIn, LogOut, ExternalLink, AlertCircle, Loader2, X, ScrollText, HeartHandshake, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { PWAInstallButton } from './PWAInstallButton';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  onOpenKontribusi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenKontribusi }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authErrorModal, setAuthErrorModal] = useState<{ title: string; message: string; isNetworkOrIframe: boolean } | null>(null);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

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
        // User closed the popup, no intrusive error modal needed
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
    { id: '/', label: 'Direktori', icon: Compass },
    { id: '/peta', label: 'Peta Interaktif', shortLabel: 'Peta', icon: MapIcon },
    { id: '/panduan', label: 'Panduan', shortLabel: 'Panduan', icon: BookOpen },
    { id: '/rubrik', label: 'Rubrik', shortLabel: 'Rubrik', icon: ScrollText },
    { id: '/doa', label: 'Doa Khusus', shortLabel: 'Doa', icon: Bookmark },
    { id: '/infaq', label: 'Infaq Digital', shortLabel: 'Infaq', icon: HeartHandshake },
  ];

  const isNavActive = (id: string) => {
    if (id === '/') return currentPath === '/';
    if (id === '/peta') return currentPath === '/peta' || currentPath.startsWith('/makam');
    return currentPath === id;
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 transition-all">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-900 via-brand-800 to-emerald-700 flex items-center justify-center shadow-md shadow-brand-950/10 group-hover:scale-105 transition-transform duration-200 border border-emerald-600/30">
            <Compass className="w-5 h-5 text-gold-300 animate-[spin_12s_linear_infinite]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black tracking-tight text-slate-900 text-lg leading-none">
              Ziarah<span className="text-emerald-700">Nusantara</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5 hidden sm:block">
              Spiritual & Heritage Guide
            </span>
          </div>
        </Link>

        {/* Desktop Nav Pills */}
        <div className="hidden md:flex items-center bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80 shadow-xs backdrop-blur-md">
          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`relative flex items-center px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-semibold transition-colors duration-150 ${
                  active
                    ? 'text-emerald-950 font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="desktop-nav-pill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-white rounded-xl shadow-xs -z-10 border border-slate-200/60"
                  />
                )}
                <item.icon className={`w-4 h-4 mr-1.5 shrink-0 transition-transform ${active ? 'text-emerald-700 scale-105' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <PWAInstallButton />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={onOpenKontribusi}
            className="flex items-center bg-gradient-to-r from-emerald-700 via-emerald-800 to-brand-900 hover:from-emerald-800 hover:to-brand-950 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md border border-emerald-600/30 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-gold-300" />
            <span className="hidden sm:inline">Kontribusi</span>
            <span className="sm:hidden">Kirim</span>
          </motion.button>
          
          {/* User Auth Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              className={`p-1.5 sm:p-2 rounded-xl transition-all flex items-center border ${
                user 
                  ? 'text-emerald-800 bg-emerald-50/80 border-emerald-200 hover:bg-emerald-100/60' 
                  : 'text-slate-500 bg-slate-100/80 border-slate-200/80 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title={user ? user.displayName || 'Akun Anda' : 'Masuk / Pengaturan'}
            >
              {user ? (
                <div className="flex items-center space-x-1.5">
                  <img 
                    src={user.photoURL || ''} 
                    alt="Avatar" 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg object-cover ring-1 ring-emerald-500/30" 
                  />
                  <MoreVertical className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </div>
              ) : (
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150">
                  {user && (
                    <div className="px-3 py-2.5 mb-1 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.displayName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <Link 
                      to="/kurasi" 
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl flex items-center transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2.5 text-emerald-600" /> Kurasi Kontribusi
                    </Link>
                    <Link 
                      to="/admin" 
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl flex items-center transition-colors"
                    >
                      <UserCog className="w-4 h-4 mr-2.5 text-emerald-600" /> Panel Kurator
                    </Link>
                    
                    <div className="my-1 border-t border-slate-100"></div>

                    {user ? (
                      <button 
                        onClick={() => { handleLogout(); setDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl flex items-center transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2.5" /> Keluar
                      </button>
                    ) : (
                      <button 
                        disabled={isLoggingIn}
                        onClick={handleLogin}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-800 hover:bg-emerald-50 rounded-xl flex items-center transition-colors disabled:opacity-50"
                      >
                        {isLoggingIn ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2.5 animate-spin text-emerald-600" />
                            <span>Menghubungkan...</span>
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2.5 text-emerald-600" />
                            <span>Masuk via Google</span>
                          </>
                        )}
                      </button>
                    )}

                    {isInIframe && (
                      <button
                        onClick={() => { window.open(window.location.href, '_blank'); setDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-500 hover:text-emerald-800 hover:bg-slate-50 rounded-xl flex items-center transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-2.5 text-slate-400" />
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
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-[2500] pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.12)] rounded-2xl p-1.5 flex items-center justify-around pointer-events-auto max-w-md mx-auto">
          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-colors duration-150 ${
                  active 
                    ? 'text-emerald-800 font-bold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-nav-pill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-emerald-50/90 rounded-xl -z-10 shadow-2xs border border-emerald-200/60"
                  />
                )}
                <motion.div whileTap={{ scale: 0.8 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                  <item.icon className={`w-4 h-4 mb-0.5 transition-transform ${active ? 'text-emerald-700 scale-110' : 'text-slate-400'}`} />
                </motion.div>
                <span className="text-[10px] leading-tight font-medium tracking-tight truncate max-w-[54px]">
                  {item.shortLabel || item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Auth Error Modal */}
      {authErrorModal && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setAuthErrorModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{authErrorModal.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Kendala Autentikasi Google</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {authErrorModal.message}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {authErrorModal.isNetworkOrIframe && (
                <button
                  onClick={() => {
                    window.open(window.location.href, '_blank');
                    setAuthErrorModal(null);
                  }}
                  className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-colors shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buka di Tab Baru
                </button>
              )}
              <button
                disabled={isLoggingIn}
                onClick={handleLogin}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
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
                className="py-2.5 px-3 text-slate-500 hover:text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
