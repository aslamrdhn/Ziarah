import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  PlusCircle,
  Download,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePWAInstall } from '../hooks/usePWAInstall';
import type { User as FirebaseUser } from 'firebase/auth';
import { APP_BRAND } from '../config/brand';

const DEFAULT_ADMIN_EMAILS = ['aslamramadhan08@gmail.com'];

function checkIsUserAdmin(user: FirebaseUser | null): boolean {
  if (!user || !user.email) return false;
  const rawEnv = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_ADMIN_EMAILS || '';
  const envEmails = rawEnv
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .filter(Boolean);
  const allowed = new Set([...DEFAULT_ADMIN_EMAILS.map((e) => e.toLowerCase()), ...envEmails]);
  return allowed.has(user.email.toLowerCase());
}

interface NavbarProps {
  onOpenKontribusi: () => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({ onOpenKontribusi }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
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
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const [{ auth }, { onAuthStateChanged, getRedirectResult }] = await Promise.all([
          import('../lib/firebase'),
          import('firebase/auth'),
        ]);
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
            setAuthErrorModal(null);
          }
        });

        getRedirectResult(auth).catch((error) => {
          if (error) handleAuthError(error);
        });
      } catch {}
    }, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      const [{ auth, googleProvider }, { signInWithPopup }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/auth'),
      ]);
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
      const [{ auth, googleProvider }, { signInWithRedirect }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/auth'),
      ]);
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      handleAuthError(error);
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const [{ auth }, { signOut }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/auth'),
      ]);
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  // Desktop navigation items
  const desktopNavItems = [
    { id: '/', label: 'Eksplor Direktori', shortLabel: 'Eksplor', icon: Compass },
    { id: '/peta', label: 'Peta Rute', shortLabel: 'Peta', icon: MapIcon },
    { id: '/panduan', label: 'Panduan Doa', shortLabel: 'Panduan', icon: BookOpen },
    { id: '/rubrik', label: 'Rubrik Sejarah', shortLabel: 'Rubrik', icon: ScrollText },
    { id: '/doa', label: 'Doa Khusus', shortLabel: 'Doa', icon: Bookmark },
  ];

  const isNavActive = (id: string) => {
    if (id === '/') return currentPath === '/' || currentPath === '/direktori';
    if (id === '/peta') return currentPath === '/peta' || currentPath.startsWith('/makam') || currentPath.startsWith('/situs');
    if (id === '/infaq') return currentPath === '/infaq' || currentPath === '/donasi';
    return currentPath === id;
  };

  return (
    <>
      {/* Top Navbar: Clean 3-Zone Editorial Contract (Zero Clutter) */}
      <nav
        aria-label="Navigasi Utama"
        className="w-full h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Zone 1: Official Kubah Emas ZN Logo & Brand Wordmark */}
        <Link to="/" className="group flex items-center gap-2.5 sm:gap-3 min-w-0 shrink-0">
          <img
            src="/favicon.svg"
            alt="Logo Resmi Ziarah Nusantara — Kubah Emas ZN"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-xs border border-stone-200/80 shrink-0"
          />
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-serif font-semibold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors text-base sm:text-lg lg:text-xl leading-tight whitespace-nowrap">
              {APP_BRAND.name}
            </span>
            {APP_BRAND.tagline && (
              <span className="hidden xl:block text-[10px] font-medium tracking-wider uppercase text-stone-500 leading-tight truncate mt-0.5">
                {APP_BRAND.tagline}
              </span>
            )}
          </div>
        </Link>

        {/* Zone 2: Clean Editorial Text Navigation Links (Desktop & Tablet) */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 text-xs lg:text-sm font-medium tracking-tight text-stone-500">
          {desktopNavItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <span className="lg:hidden">{item.shortLabel}</span>
                <span className="hidden lg:inline">{item.label}</span>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-emerald-700 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Zone 3: Single Desktop CTA + Secondary Menu Icon (Consolidates Donasi, PWA Install, Rubrik, Account) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenKontribusi}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-emerald-800 active:scale-[0.98] text-white rounded-full font-medium text-xs tracking-tight transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Kontribusi Arsip</span>
          </button>

          {/* Secondary Menu Dropdown (Consolidates Donasi, Install PWA, Rubrik, Doa, Kurasi, Auth) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-label={user ? `Menu Akun ${user.displayName || ''}` : 'Menu Sekunder, Donasi & Pengaturan'}
              className={`p-2 rounded-full transition-all flex items-center border cursor-pointer ${
                user
                  ? 'text-emerald-900 bg-white border-emerald-300 shadow-xs'
                  : 'text-stone-700 bg-white border-stone-200/80 hover:text-stone-900 hover:border-stone-300 shadow-2xs'
              }`}
              title="Menu Informasi, Donasi & Akun"
            >
              {user ? (
                <div className="flex items-center space-x-1.5">
                  <img
                    src={user.photoURL || ''}
                    alt={user.displayName || 'Profil Pengguna'}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <MoreVertical className="w-3.5 h-3.5 text-stone-600" aria-hidden="true" />
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
                  className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-stone-200/80 z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150"
                >
                  {user && (
                    <div className="px-3 py-2.5 mb-1 bg-stone-50 rounded-xl border border-stone-200/70">
                      <p className="text-xs font-semibold text-stone-900 truncate">{user.displayName}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <Link
                      to="/rubrik"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <ScrollText className="w-4 h-4 mr-2.5 text-stone-500" aria-hidden="true" />
                      <span>Rubrik &amp; Manuskrip Sejarah</span>
                    </Link>

                    <Link
                      to="/doa"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <Bookmark className="w-4 h-4 mr-2.5 text-stone-500" aria-hidden="true" />
                      <span>Kumpulan Doa Khusus</span>
                    </Link>

                    <Link
                      to="/donasi"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <HeartHandshake className="w-4 h-4 mr-2.5 text-emerald-700" aria-hidden="true" />
                      <span>Donasi &amp; Pelestarian Arsip</span>
                    </Link>

                    <Link
                      to="/kurasi"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2.5 text-stone-500" aria-hidden="true" />
                      <span>Standar Kurasi &amp; Referensi</span>
                    </Link>

                    {/* Consolidated PWA Install inside Secondary Menu */}
                    {!isInstalled && (isInstallable || isIOS) && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setDropdownOpen(false);
                          if (isInstallable) {
                            install();
                          } else if (isIOS) {
                            setShowIOSGuide(true);
                          }
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/80 rounded-xl flex items-center transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4 mr-2.5 text-emerald-700" aria-hidden="true" />
                        <span>Pasang Aplikasi (Mode Offline)</span>
                      </button>
                    )}

                    {checkIsUserAdmin(user) && (
                      <Link
                        to="/admin"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center transition-colors"
                      >
                        <UserCog className="w-4 h-4 mr-2.5 text-emerald-800" aria-hidden="true" />
                        <span>Panel Kurator</span>
                      </Link>
                    )}

                    <div className="my-1 border-t border-stone-200/70" />

                    {user ? (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-xl flex items-center transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2.5" aria-hidden="true" />
                        <span>Keluar Akun</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        role="menuitem"
                        disabled={isLoggingIn}
                        onClick={handleLogin}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-stone-900 hover:bg-stone-100 rounded-xl flex items-center transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isLoggingIn ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2.5 animate-spin text-emerald-700" aria-hidden="true" />
                            <span>Menghubungkan...</span>
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2.5 text-emerald-700" aria-hidden="true" />
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
                        className="w-full text-left px-3 py-1.5 text-xs text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl flex items-center transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-2.5 text-stone-400" aria-hidden="true" />
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

      {/* Rule 4: Floating Pill Dock for Mobile (Max 4 Menus: Eksplor, Peta, Panduan Doa, Kontribusi) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <nav
            aria-label="Navigasi Utama Mobile"
            className="fixed bottom-5 inset-x-0 mx-auto w-fit z-[2500] md:hidden px-3 pointer-events-none"
          >
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-xl bg-white/85 shadow-lg border border-stone-200/60 pointer-events-auto">
              <Link
                to="/"
                aria-current={isNavActive('/') ? 'page' : undefined}
                className={`px-3.5 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isNavActive('/')
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Eksplor</span>
              </Link>

              <Link
                to="/peta"
                aria-current={isNavActive('/peta') ? 'page' : undefined}
                className={`px-3.5 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isNavActive('/peta')
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Peta</span>
              </Link>

              <Link
                to="/panduan"
                aria-current={isNavActive('/panduan') ? 'page' : undefined}
                className={`px-3.5 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isNavActive('/panduan')
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Panduan Doa</span>
              </Link>

              <button
                type="button"
                onClick={onOpenKontribusi}
                className="px-3.5 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-all cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                <span>Kontribusi</span>
              </button>
            </div>
          </nav>,
          document.body
        )}

      {/* iOS PWA Install Guide Modal */}
      {showIOSGuide &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-stone-950/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-stone-200/80">
              <h3 className="text-lg font-serif font-semibold text-stone-900">Pasang di iPhone / iPad</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                1. Ketuk tombol <strong>Bagikan (Share)</strong> di bilah bawah Safari.
                <br />
                2. Geser ke bawah lalu pilih <strong>Tambahkan ke Layar Utama (Add to Home Screen)</strong>.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-stone-900 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>,
          document.body
        )}

      {/* Auth Error Modal (Portaled to document.body) */}
      {authErrorModal &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[3000] bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200/80 relative animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => setAuthErrorModal(null)}
                className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start space-x-3 mb-4">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
                  <AlertCircle className="w-6 h-6 text-amber-800" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">{authErrorModal.title}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Kendala Autentikasi Google</p>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed mb-5">{authErrorModal.message}</p>

              {authErrorModal.unauthorizedDomain && (
                <div className="mb-5 p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
                  <code className="text-xs font-bold text-stone-900 truncate">{authErrorModal.unauthorizedDomain}</code>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(authErrorModal.unauthorizedDomain || '')}
                    className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold text-stone-900 shrink-0 cursor-pointer"
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
                    className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center transition-colors shadow-xs cursor-pointer"
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
                    className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buka di Tab Baru
                  </a>
                )}
                <button
                  type="button"
                  disabled={isLoggingIn}
                  onClick={handleLogin}
                  className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
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
                  className="py-2.5 px-3 text-stone-500 hover:text-stone-900 text-xs font-medium rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
});
