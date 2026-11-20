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
  LogOut,
  ExternalLink,
  ScrollText,
  HeartHandshake,
  PlusCircle,
  Download,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePWAInstall } from '../hooks/usePWAInstall';
import type { User as FirebaseUser } from 'firebase/auth';
import { APP_BRAND } from '../config/brand';
import { useSiteCopy } from '../lib/siteCopy';

const DEFAULT_ADMIN_EMAILS = ['aslamramadhan08@gmail.com', 'agoraruangsemesta@gmail.com'];

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
  const { copy } = useSiteCopy();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;
    let initialized = false;
    let cancelIdle: (() => void) | null = null;

    const hasAdminSessionFlag = (): boolean => {
      try {
        return localStorage.getItem('zn_has_admin_session') === '1';
      } catch {}
      return false;
    };

    const loadAuthSession = async () => {
      if (initialized || cancelled) return;
      initialized = true;
      try {
        const [{ onAuthStateChanged }, { auth, isUserAdmin, ensureAdminUidRegistered }] =
          await Promise.all([import('firebase/auth'), import('../lib/firebase')]);
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (currentUser && (isUserAdmin(currentUser) || checkIsUserAdmin(currentUser))) {
            try {
              localStorage.setItem('zn_has_admin_session', '1');
            } catch {}
            ensureAdminUidRegistered(currentUser).catch(() => {});
          }
        });
      } catch {}
    };

    const isAdminRoute =
      currentPath.startsWith('/admin') ||
      currentPath.startsWith('/kurator');

    if (isAdminRoute) {
      void loadAuthSession();
    } else if (hasAdminSessionFlag() && typeof window !== 'undefined') {
      const w = window as Window & {
        requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (typeof w.requestIdleCallback === 'function') {
        const id = w.requestIdleCallback(() => void loadAuthSession(), { timeout: 2500 });
        cancelIdle = () => w.cancelIdleCallback?.(id);
      } else {
        const timer = window.setTimeout(() => void loadAuthSession(), 1800);
        cancelIdle = () => window.clearTimeout(timer);
      }
    }

    return () => {
      cancelled = true;
      if (cancelIdle) cancelIdle();
      if (unsubscribe) unsubscribe();
    };
  }, [currentPath]);

  const handleLogout = async () => {
    try {
      try {
        localStorage.removeItem('zn_has_admin_session');
      } catch {}
      const [{ signOut }, { auth }] = await Promise.all([
        import('firebase/auth'),
        import('../lib/firebase'),
      ]);
      await signOut(auth);
    } catch {
      // Ignore sign-out errors
    }
  };

  const isAdminLoggedIn = Boolean(user && checkIsUserAdmin(user));

  // Unified Core Navigation Items across Desktop, Mobile Web & Installed PWA
  const desktopNavItems = [
    { id: '/', label: copy.navHomeLabel, shortLabel: copy.navHomeLabel, icon: Compass },
    { id: '/rubrik', label: copy.navRubrikLabel, shortLabel: copy.navRubrikLabel, icon: ScrollText },
    { id: '/peta', label: copy.navMapLabel, shortLabel: copy.navMapLabel, icon: MapIcon },
    { id: '/panduan', label: copy.navPrayerLabel, shortLabel: copy.navPrayerLabel, icon: BookOpen },
    { id: '/artikel', label: 'Artikel', shortLabel: 'Artikel', icon: BookOpen },
  ];

  const isNavActive = (id: string) => {
    if (id === '/') return currentPath === '/' || currentPath === '/direktori';
    if (id === '/peta') return currentPath === '/peta' || currentPath.startsWith('/makam') || currentPath.startsWith('/situs');
    if (id === '/panduan') return currentPath === '/panduan' || currentPath === '/doa';
    if (id === '/artikel') return currentPath === '/artikel' || currentPath.startsWith('/artikel/');
    if (id === '/infaq' || id === '/donasi') return currentPath === '/infaq' || currentPath === '/donasi';
    return currentPath === id;
  };

  return (
    <>
      {/* Top Navbar: Thin 48px Apple Indonesia Glass Navbar (apple.com/id) */}
      <nav
        aria-label="Navigasi Utama"
        style={{
          backgroundColor: 'rgba(251, 251, 253, 0.82)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        }}
        className="w-full h-12 apple-glass-nav border-b border-black/[0.06] sticky top-0 z-50 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Zone 1: Official Kubah Emas ZN Logo & Brand Wordmark */}
        <Link to="/" className="group flex items-center gap-2 sm:gap-2.5 min-w-0 shrink-0">
          <img
            src="/favicon.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="w-7 h-7 rounded-lg shadow-2xs border border-black/[0.08] shrink-0"
          />
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-sans font-semibold tracking-tight text-[#1D1D1F] group-hover:text-[#1E6B47] transition-colors text-sm sm:text-[15px] leading-tight whitespace-nowrap">
              {copy.brandName || APP_BRAND.name}
            </span>
          </div>
        </Link>

        {/* Zone 2: Core Editorial Text Navigation Links (Desktop & Tablet) */}
        <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
          {desktopNavItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 text-[12px] tracking-tight transition-colors duration-150 ${
                  active
                    ? 'text-[#1D1D1F] font-semibold'
                    : 'font-medium text-[#1D1D1F]/80 hover:text-[#1D1D1F]'
                }`}
              >
                <span className="lg:hidden">{item.shortLabel}</span>
                <span className="hidden lg:inline">{item.label}</span>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-[#1D1D1F] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Zone 3: 1 Primary Action Button (Infaq & Munajat) + Secondary Menu Icon */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/donasi"
            aria-current={isNavActive('/donasi') ? 'page' : undefined}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium text-[12px] tracking-tight transition-all whitespace-nowrap shrink-0 ${
              isNavActive('/donasi')
                ? 'bg-[#175639] text-white shadow-2xs'
                : 'bg-[#1E6B47] hover:bg-[#175639] text-white'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.navDonateCtaLabel}</span>
          </Link>

          {/* Secondary Menu Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-label={isAdminLoggedIn ? `Menu Kurator ${user?.displayName || ''}` : 'Menu Sekunder, Donasi & Pengaturan'}
              className={`min-w-[34px] min-h-[34px] p-1.5 rounded-full transition-all flex items-center justify-center border cursor-pointer ${
                isAdminLoggedIn
                  ? 'text-[#1E6B47] bg-white border-[#1E6B47]/30 shadow-2xs'
                  : 'text-[#1D1D1F]/80 bg-white/80 border-black/[0.08] hover:text-[#1D1D1F] hover:border-black/20'
              }`}
              title="Menu Informasi & Donasi"
            >
              {isAdminLoggedIn && user ? (
                <div className="flex items-center space-x-1.5">
                  <img
                    src={user.photoURL || ''}
                    alt={user.displayName || 'Profil Kurator'}
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
                  {isAdminLoggedIn && user && (
                    <div className="px-3 py-2.5 mb-1 bg-stone-50 rounded-xl border border-stone-200/70">
                      <p className="text-xs font-semibold text-stone-900 truncate">{user.displayName}</p>
                      <p className="text-[11px] text-stone-600 truncate">{user.email}</p>
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenKontribusi();
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(
                            new CustomEvent('open-contribution-modal', { detail: { tab: 'baru' } })
                          );
                        }
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 mr-2.5 text-emerald-800" aria-hidden="true" />
                      <span>Kontribusi Riwayat / Makam</span>
                    </button>

                    <Link
                      to="/artikel"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <BookOpen className="w-4 h-4 mr-2.5 text-emerald-800" aria-hidden="true" />
                      <span>Artikel Panduan &amp; Rute Ziarah</span>
                    </Link>

                    <Link
                      to="/doa"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <Bookmark className="w-4 h-4 mr-2.5 text-stone-600" aria-hidden="true" />
                      <span>Wirid &amp; Doa Khusus Para Wali</span>
                    </Link>

                    <Link
                      to="/donasi"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <HeartHandshake className="w-4 h-4 mr-2.5 text-emerald-700" aria-hidden="true" />
                      <span>Infaq &amp; Dinding Munajat</span>
                    </Link>

                    <Link
                      to="/kurasi"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2.5 text-stone-600" aria-hidden="true" />
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

                    {isAdminLoggedIn && (
                      <>
                        <div className="my-1 border-t border-stone-200/70" />
                        <Link
                          to="/admin"
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full text-left px-3 py-2 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center transition-colors"
                        >
                          <UserCog className="w-4 h-4 mr-2.5 text-emerald-800" aria-hidden="true" />
                          <span>Panel Kurator</span>
                        </Link>
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
                      </>
                    )}

                    {isInIframe && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          window.open(window.location.href, '_blank');
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl flex items-center transition-colors cursor-pointer"
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

      {/* Unified Floating Bottom Navigation Bar for Mobile (5-Column Vertical Grid for 320px-390px Precision) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <nav
            aria-label="Navigasi Utama Mobile"
            className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] inset-x-0 z-[2500] md:hidden px-3 pointer-events-none"
          >
            <div className="grid grid-cols-5 items-center w-full max-w-[420px] mx-auto px-1.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-t border-black/[0.08] text-[#1D1D1F] shadow-[0_12px_32px_rgba(0,0,0,0.12)] pointer-events-auto">
              <Link
                to="/"
                aria-current={isNavActive('/') ? 'page' : undefined}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl gap-1 min-h-[50px] transition-all ${
                  isNavActive('/')
                    ? 'bg-[#1D1D1F] text-white shadow-2xs'
                    : 'text-[#1D1D1F]/80 hover:text-[#1D1D1F]'
                }`}
              >
                <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-semibold leading-none tracking-tight truncate max-w-full">
                  Beranda
                </span>
              </Link>

              <Link
                to="/rubrik"
                aria-current={isNavActive('/rubrik') ? 'page' : undefined}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl gap-1 min-h-[50px] transition-all ${
                  isNavActive('/rubrik')
                    ? 'bg-[#1D1D1F] text-white shadow-2xs'
                    : 'text-[#1D1D1F]/80 hover:text-[#1D1D1F]'
                }`}
              >
                <ScrollText className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-semibold leading-none tracking-tight truncate max-w-full">
                  Kisah
                </span>
              </Link>

              <Link
                to="/peta"
                aria-current={isNavActive('/peta') ? 'page' : undefined}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl gap-1 min-h-[50px] transition-all ${
                  isNavActive('/peta')
                    ? 'bg-[#1D1D1F] text-white shadow-2xs'
                    : 'text-[#1D1D1F]/80 hover:text-[#1D1D1F]'
                }`}
              >
                <MapIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-semibold leading-none tracking-tight truncate max-w-full">
                  Peta
                </span>
              </Link>

              <Link
                to="/panduan"
                aria-current={isNavActive('/panduan') ? 'page' : undefined}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl gap-1 min-h-[50px] transition-all ${
                  isNavActive('/panduan')
                    ? 'bg-[#1D1D1F] text-white shadow-2xs'
                    : 'text-[#1D1D1F]/80 hover:text-[#1D1D1F]'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-semibold leading-none tracking-tight truncate max-w-full">
                  Amalan
                </span>
              </Link>

              <Link
                to="/donasi"
                aria-current={isNavActive('/donasi') ? 'page' : undefined}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl gap-1 min-h-[50px] transition-all ${
                  isNavActive('/donasi')
                    ? 'bg-[#1E6B47] text-white shadow-2xs'
                    : 'text-[#1E6B47] bg-[#F2F7F4] hover:bg-[#E1EFE7]'
                }`}
              >
                <HeartHandshake
                  className={`w-4 h-4 shrink-0 ${isNavActive('/donasi') ? 'text-white' : 'text-[#1E6B47]'}`}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-semibold leading-none tracking-tight truncate max-w-full">
                  Infaq
                </span>
              </Link>
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
    </>
  );
});
