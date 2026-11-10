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

    const hasStoredSession = (): boolean => {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('firebase:authUser:')) {
            return true;
          }
        }
      } catch {}
      return false;
    };

    const loadAuthSession = async () => {
      if (initialized || cancelled) return;
      initialized = true;
      try {
        const [{ auth, isUserAdmin, ensureAdminUidRegistered }, { onAuthStateChanged }] = await Promise.all([
          import('../lib/firebase'),
          import('firebase/auth'),
        ]);
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (currentUser && (isUserAdmin(currentUser) || checkIsUserAdmin(currentUser))) {
            ensureAdminUidRegistered(currentUser).catch(() => {});
          }
        });
      } catch {}
    };

    if (
      currentPath.startsWith('/admin') ||
      currentPath.startsWith('/kurator') ||
      hasStoredSession()
    ) {
      loadAuthSession();
    }

    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, [currentPath]);

  const handleLogout = async () => {
    try {
      const [{ auth }, { signOut }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/auth'),
      ]);
      await signOut(auth);
    } catch {
      // Ignore sign-out errors
    }
  };

  const isAdminLoggedIn = Boolean(user && checkIsUserAdmin(user));

  // Unified 4 Core Navigation Items across Desktop, Mobile Web & Installed PWA
  const desktopNavItems = [
    { id: '/', label: copy.navHomeLabel, shortLabel: copy.navHomeLabel, icon: Compass },
    { id: '/rubrik', label: copy.navRubrikLabel, shortLabel: copy.navRubrikLabel, icon: ScrollText },
    { id: '/peta', label: copy.navMapLabel, shortLabel: copy.navMapLabel, icon: MapIcon },
    { id: '/panduan', label: copy.navPrayerLabel, shortLabel: copy.navPrayerLabel, icon: BookOpen },
  ];

  const isNavActive = (id: string) => {
    if (id === '/') return currentPath === '/' || currentPath === '/direktori';
    if (id === '/peta') return currentPath === '/peta' || currentPath.startsWith('/makam') || currentPath.startsWith('/situs');
    if (id === '/panduan') return currentPath === '/panduan' || currentPath === '/doa';
    if (id === '/infaq' || id === '/donasi') return currentPath === '/infaq' || currentPath === '/donasi';
    return currentPath === id;
  };

  return (
    <>
      {/* Top Navbar: Clean 3-Zone Single-Row Editorial Contract (4 Core Menus + 1 Action Button) */}
      <nav
        aria-label="Navigasi Utama"
        className="w-full h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Zone 1: Official Kubah Emas ZN Logo & Brand Wordmark */}
        <Link to="/" className="group flex items-center gap-2.5 sm:gap-3 min-w-0 shrink-0">
          <img
            src="/favicon.svg"
            alt={`Logo Resmi ${copy.brandName || APP_BRAND.name} — Kubah Emas ZN`}
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-xs border border-stone-200/80 shrink-0"
          />
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-serif font-semibold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors text-base sm:text-lg lg:text-xl leading-tight whitespace-nowrap">
              {copy.brandName || APP_BRAND.name}
            </span>
            {(copy.brandSubtitle || APP_BRAND.tagline) && (
              <span className="hidden xl:block text-[10px] font-medium tracking-wider uppercase text-stone-600 leading-tight truncate mt-0.5">
                {copy.brandSubtitle || APP_BRAND.tagline}
              </span>
            )}
          </div>
        </Link>

        {/* Zone 2: 4 Core Editorial Text Navigation Links (Desktop & Tablet) */}
        <div className="hidden md:flex items-center justify-center gap-5 lg:gap-7 text-xs lg:text-sm font-medium tracking-tight text-stone-600">
          {desktopNavItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <Link
                key={item.id}
                to={item.id}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active ? 'text-stone-900 font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="lg:hidden">{item.shortLabel}</span>
                <span className="hidden lg:inline">{item.label}</span>
                {active && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-emerald-800 rounded-full" />
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
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs tracking-tight transition-all whitespace-nowrap shrink-0 ${
              isNavActive('/donasi')
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-stone-900 hover:bg-emerald-900 text-white'
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
              className={`min-w-[38px] min-h-[38px] p-2 rounded-full transition-all flex items-center justify-center border cursor-pointer ${
                isAdminLoggedIn
                  ? 'text-emerald-900 bg-white border-emerald-300 shadow-xs'
                  : 'text-stone-700 bg-white border-stone-200/80 hover:text-stone-900 hover:border-stone-300 shadow-2xs'
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
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-xl flex items-center transition-colors cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 mr-2.5 text-emerald-800" aria-hidden="true" />
                      <span>Kontribusi Riwayat / Makam</span>
                    </button>

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
                        className="w-full text-left px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl flex items-center transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-2.5 text-stone-500" aria-hidden="true" />
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

      {/* Unified Floating Pill Dock for Mobile (4 Core Menus + Infaq & Munajat) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <nav
            aria-label="Navigasi Utama Mobile"
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-0 mx-auto w-fit max-w-[calc(100vw-1rem)] z-[2500] md:hidden px-2 pointer-events-none"
          >
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-xl bg-white/95 shadow-lg border border-stone-200/80 pointer-events-auto overflow-x-auto no-scrollbar max-w-full">
              <Link
                to="/"
                aria-current={isNavActive('/') ? 'page' : undefined}
                className={`px-3 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  isNavActive('/')
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Beranda</span>
              </Link>

              <Link
                to="/rubrik"
                aria-current={isNavActive('/rubrik') ? 'page' : undefined}
                className={`px-3 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  isNavActive('/rubrik')
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <ScrollText className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kisah</span>
              </Link>

              <Link
                to="/peta"
                aria-current={isNavActive('/peta') ? 'page' : undefined}
                className={`px-3 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  isNavActive('/peta')
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Peta</span>
              </Link>

              <Link
                to="/panduan"
                aria-current={isNavActive('/panduan') ? 'page' : undefined}
                className={`px-3 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  isNavActive('/panduan')
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Amalan</span>
              </Link>

              <Link
                to="/donasi"
                aria-current={isNavActive('/donasi') ? 'page' : undefined}
                className={`px-3 py-2 rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  isNavActive('/donasi')
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-emerald-900 bg-emerald-50/80 hover:bg-emerald-100'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                <span>Infaq</span>
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
