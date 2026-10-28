import React, { useState, useEffect } from 'react';
import {
  Compass,
  Map as MapIcon,
  BookOpen,
  ShieldCheck,
  UserCog,
  Bookmark,
  MoreVertical,
  LogIn,
  LogOut,
  ExternalLink,
  AlertCircle,
  Loader2,
  X,
  ScrollText,
  HeartHandshake,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PWAInstallButton } from './PWAInstallButton';
import { auth, googleProvider, isUserAdmin } from '../lib/firebase';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
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
  const [authErrorModal, setAuthErrorModal] = useState<{
    title: string;
    message: string;
    showOpenNewTab: boolean;
    showRedirectLogin: boolean;
    unauthorizedDomain?: string;
  } | null>(null);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';

  const handleAuthError = (error: any) => {
    console.error('Error signing in with Google', error);
    const errorCode = error?.code || '';

    if (errorCode === 'auth/unauthorized-domain') {
      setAuthErrorModal({
        title: 'Domain Belum Diizinkan di Firebase',
        message: `Domain "${currentHostname}" belum terdaftar di Firebase Authentication. Buka Firebase Console → Authentication → Settings → Authorized domains, lalu tambahkan "${currentHostname}".`,
        showOpenNewTab: false,
        showRedirectLogin: false,
        unauthorizedDomain: currentHostname,
      });
    } else if (errorCode === 'auth/network-request-failed') {
      setAuthErrorModal({
        title: 'Koneksi Autentikasi Dibatasi',
        message: isInIframe
          ? 'Pratinjau iframe membatasi akses kredensial ke Google Auth. Buka aplikasi di Tab Baru untuk login dengan akun Google Anda.'
          : 'Gagal menghubungi server Google Auth (auth/network-request-failed). Periksa koneksi internet atau matikan pemblokir iklan/ekstensi privasi untuk situs ini.',
        showOpenNewTab: isInIframe,
        showRedirectLogin: !isInIframe,
      });
    } else if (errorCode === 'auth/popup-blocked') {
      setAuthErrorModal({
        title: 'Jendela Pop-up Diblokir Browser',
        message: isInIframe
          ? 'Browser memblokir pop-up di dalam pratinjau. Silakan klik "Buka di Tab Baru" di bawah.'
          : 'Browser atau ekstensi Anda memblokir jendela pop-up Google Sign-In. Anda dapat langsung masuk tanpa pop-up dengan menekan tombol "Masuk Tanpa Pop-up (Redirect)" di bawah, atau izinkan pop-up pada ikon di ujung kanan address bar browser.',
        showOpenNewTab: isInIframe,
        showRedirectLogin: !isInIframe,
      });
    } else if (errorCode === 'auth/popup-closed-by-user' || errorCode === 'auth/cancelled-popup-request') {
      // User closed the popup
    } else {
      setAuthErrorModal({
        title: 'Gagal Masuk via Google',
        message: error?.message || 'Terjadi kendala saat menghubungkan ke akun Google Anda. Silakan coba lagi.',
        showOpenNewTab: isInIframe,
        showRedirectLogin: !isInIframe,
      });
    }
  };

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const timer = window.setTimeout(() => {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          setAuthErrorModal(null);
        }
      });

      getRedirectResult(auth).catch((error) => {
        if (error) handleAuthError(error);
      });
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setDropdownOpen(false);
      setAuthErrorModal(null);
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRedirectLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      setDropdownOpen(false);
      setAuthErrorModal(null);
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      handleAuthError(error);
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
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
    if (id === '/') return currentPath === '/' || currentPath === '/direktori';
    if (id === '/peta') return currentPath === '/peta' || currentPath.startsWith('/makam');
    return currentPath === id;
  };

  return (
    <>
      {/* Top Navbar following Clean 3-Zone Editorial Contract (Mobile, Tablet, Desktop) */}
      <nav
        aria-label="Navigasi Utama"
        className="w-full flex items-center justify-between gap-3 lg:gap-8 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3"
      >
        {/* Zone 1: Official Kubah Emas ZN Logo, Brand Wordmark & Editorial Tagline */}
        <Link to="/" className="group flex items-center gap-2.5 sm:gap-3 shrink-0">
          <img
            src="/favicon.svg"
            alt="Logo Resmi Ziarah Nusantara — Kubah Emas ZN"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-xs border border-emerald-900/15 shrink-0"
          />
          <div className="flex flex-col justify-center">
            <span className="font-serif font-bold tracking-tight text-stone-950 group-hover:text-emerald-950 transition-colors text-lg sm:text-xl leading-tight whitespace-nowrap">
              {APP_BRAND.name}
            </span>
            {APP_BRAND.tagline && (
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-stone-700 leading-tight whitespace-nowrap mt-0.5">
                {APP_BRAND.tagline}
              </span>
            )}
          </div>
        </Link>

        {/* Zone 2: Clean Editorial Text Navigation Links (Compact on Tablet md, Full on Desktop lg) */}
        <div className="hidden md:flex items-center gap-3.5 lg:gap-6 text-xs lg:text-sm font-semibold text-stone-700">
          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active ? 'text-stone-950 font-bold' : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                <span className="lg:hidden">{item.shortLabel}</span>
                <span className="hidden lg:inline">{item.label}</span>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-emerald-900 rounded-full" />
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
            className="px-3 sm:px-4 py-2 bg-stone-900 hover:bg-emerald-950 active:scale-[0.98] text-[#F9F8F4] rounded-lg font-semibold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="sm:hidden">+ Arsip</span>
            <span className="hidden sm:inline">Kontribusi Arsip</span>
          </button>

          {/* User Auth Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-label={user ? `Menu Akun ${user.displayName || ''}` : 'Menu Akun dan Pengaturan'}
              className={`p-2 rounded-lg transition-all flex items-center border cursor-pointer ${
                user
                  ? 'text-emerald-950 bg-emerald-50 border-emerald-300 hover:bg-emerald-100/70'
                  : 'text-stone-800 bg-stone-100 border-stone-300 hover:text-stone-950 hover:bg-stone-200/70'
              }`}
              title={user ? user.displayName || 'Akun Anda' : 'Masuk / Pengaturan'}
            >
              {user ? (
                <div className="flex items-center space-x-1.5">
                  <img
                    src={user.photoURL || ''}
                    alt={user.displayName || 'Profil Pengguna'}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-md object-cover"
                  />
                  <MoreVertical className="w-3.5 h-3.5 text-stone-700 hidden sm:block" aria-hidden="true" />
                </div>
              ) : (
                <MoreVertical className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 bg-[#FBF9F5] rounded-2xl shadow-xl border border-stone-300 z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150"
                >
                  {user && (
                    <div className="px-3 py-2.5 mb-1 bg-stone-100 rounded-xl border border-stone-200">
                      <p className="text-xs font-bold text-stone-950 truncate">{user.displayName}</p>
                      <p className="text-[11px] text-stone-700 truncate">{user.email}</p>
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <Link
                      to="/kurasi"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs sm:text-sm font-medium text-stone-800 hover:bg-stone-200/60 hover:text-stone-950 rounded-xl flex items-center transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2.5 text-emerald-900" aria-hidden="true" /> Standar Kurasi
                    </Link>
                    {isUserAdmin(user) && (
                      <Link
                        to="/admin"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center transition-colors"
                      >
                        <UserCog className="w-4 h-4 mr-2.5 text-emerald-900" aria-hidden="true" /> Panel Kurator
                      </Link>
                    )}

                    <div className="my-1 border-t border-stone-200" />

                    {user ? (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm font-semibold text-rose-800 hover:bg-rose-50 rounded-xl flex items-center transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2.5" aria-hidden="true" /> Keluar
                      </button>
                    ) : (
                      <button
                        type="button"
                        role="menuitem"
                        disabled={isLoggingIn}
                        onClick={handleLogin}
                        className="w-full text-left px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-950 hover:bg-emerald-50 rounded-xl flex items-center transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isLoggingIn ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2.5 animate-spin text-emerald-800" aria-hidden="true" />
                            <span>Menghubungkan...</span>
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2.5 text-emerald-800" aria-hidden="true" />
                            <span>Masuk via Google</span>
                          </>
                        )}
                      </button>
                    )}

                    {isInIframe && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          window.open(window.location.href, '_blank');
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-xl flex items-center transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-2.5 text-stone-600" aria-hidden="true" />
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
      <nav
        aria-label="Navigasi Bawah Mobile"
        className="md:hidden fixed bottom-2.5 left-2.5 right-2.5 z-[2500] pointer-events-none"
      >
        <div className="bg-[#FBF9F5]/95 backdrop-blur-md border border-stone-300 shadow-[0_10px_30px_rgba(28,25,23,0.12)] rounded-2xl p-1.5 flex items-center justify-around pointer-events-auto max-w-md mx-auto">
          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                aria-current={active ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-colors duration-150 ${
                  active
                    ? 'text-stone-950 font-bold bg-stone-200/90 border border-stone-300'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                <item.icon
                  aria-hidden="true"
                  className={`w-4 h-4 mb-0.5 transition-transform ${
                    active ? 'text-emerald-900 scale-105' : 'text-stone-700'
                  }`}
                />
                <span className="text-[10px] leading-tight font-semibold tracking-tight truncate max-w-[54px] whitespace-nowrap">
                  {item.shortLabel || item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Auth Error Modal */}
      {authErrorModal && (
        <div className="fixed inset-0 z-[3000] bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setAuthErrorModal(null)}
              className="absolute top-4 right-4 p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-800" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-950">{authErrorModal.title}</h3>
                <p className="text-xs text-stone-700 mt-0.5">Kendala Autentikasi Google</p>
              </div>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed mb-5">{authErrorModal.message}</p>

            {authErrorModal.unauthorizedDomain && (
              <div className="mb-5 p-3 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
                <code className="text-xs font-bold text-stone-950 truncate">{authErrorModal.unauthorizedDomain}</code>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(authErrorModal.unauthorizedDomain || '')}
                  className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-xs font-bold text-stone-900 shrink-0 cursor-pointer"
                >
                  Salin Domain
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5">
              {authErrorModal.showRedirectLogin && (
                <button
                  type="button"
                  onClick={handleRedirectLogin}
                  className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Masuk Tanpa Pop-up (Redirect)
                </button>
              )}
              {authErrorModal.showOpenNewTab && (
                <a
                  href={typeof window !== 'undefined' ? window.location.href : '/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setAuthErrorModal(null)}
                  className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buka di Tab Baru
                </a>
              )}
              <button
                type="button"
                disabled={isLoggingIn}
                onClick={handleLogin}
                className="py-2.5 px-4 bg-stone-200 hover:bg-stone-300 text-stone-900 text-sm font-semibold rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    <span>Mencoba...</span>
                  </>
                ) : (
                  <span>Coba Pop-up Lagi</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setAuthErrorModal(null)}
                className="py-2.5 px-3 text-stone-700 hover:text-stone-950 text-sm font-medium rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
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
