import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Database, UploadCloud, LogIn, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ziarahSites as localSites } from '../data/sites';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';

export const AdminKurator: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Validasi Email Admin
      if (currentUser && currentUser.email === 'aslamramadhan08@gmail.com') {
        setIsAdmin(true);
        setLoginError(null);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Error signing in with Google", error);
      const errorCode = error?.code || '';
      if (errorCode === 'auth/network-request-failed') {
        setLoginError(
          isInIframe 
            ? 'Koneksi Google Auth dibatasi oleh sandbox iframe. Silakan klik "Buka di Tab Baru" di bawah untuk login langsung.' 
            : 'Koneksi ke Google Auth gagal (auth/network-request-failed). Silakan periksa jaringan Anda atau coba buka di tab baru.'
        );
      } else if (errorCode === 'auth/popup-blocked') {
        setLoginError('Pop-up Google Sign-In diblokir oleh browser. Izinkan pop-up atau buka aplikasi di tab baru.');
      } else if (errorCode === 'auth/popup-closed-by-user' || errorCode === 'auth/cancelled-popup-request') {
        // User closed popup
      } else {
        setLoginError(error?.message || 'Gagal masuk via Google. Silakan coba lagi.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!isAdmin) return;
    setIsSeeding(true);
    setSeedMessage('Memulai sinkronisasi data...');
    try {
      for (const site of localSites) {
        await setDoc(doc(db, 'sites', site.id), site);
      }
      setSeedMessage('Berhasil mensinkronisasi ' + localSites.length + ' data makam ke Firestore.');
    } catch (e: any) {
      setSeedMessage('Gagal: ' + e.message);
      try {
        handleFirestoreError(e, OperationType.WRITE, 'sites');
      } catch {
        // Logged via handleFirestoreError
      }
    }
    setIsSeeding(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20 pt-4 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xs border border-slate-200/90 relative overflow-hidden"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${isAdmin ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            {isAdmin ? (
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-rose-600" />
            )}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight">Panel Admin Kurator</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {isAdmin ? 'Akses Penuh (Super Admin)' : 'Preview Mode - Read Only'}
            </p>
          </div>
        </div>

        {isAdmin ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8">
            <p className="text-sm font-bold text-emerald-950">Akses Diterima: Selamat Datang, Admin</p>
            <p className="text-xs text-emerald-800 mt-1">Sistem mengenali Anda ({user?.email}). Anda memiliki hak akses penuh ke sistem ini. Anda dapat mengelola dan memigrasi data direktori makam ke database utama.</p>
          </div>
        ) : (
          <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-5 mb-8 space-y-4">
            <div>
              <p className="text-sm font-bold text-rose-950">Akses Terbatas (Bukan Akun Admin)</p>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                {user ? `Akun Anda (${user.email}) tidak memiliki kredensial admin.` : 'Silakan login menggunakan akun Google admin (aslamramadhan08@gmail.com).'} Sistem manajemen dan pembaruan database dikunci untuk keamanan data.
              </p>
            </div>

            {loginError && (
              <div className="bg-white/90 border border-rose-300 rounded-xl p-3 flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-800 leading-relaxed">{loginError}</p>
              </div>
            )}

            {!isAdmin && (
              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  disabled={isLoggingIn}
                  onClick={handleLogin}
                  className="py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      <span>Menghubungkan...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-3.5 h-3.5 mr-1.5" />
                      <span>Masuk dengan Google</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => window.open(window.location.href, '_blank')}
                  className="py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl flex items-center transition-colors shadow-2xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                  <span>Buka di Tab Baru</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div className={`border rounded-2xl p-5 relative overflow-hidden ${isAdmin ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200 opacity-70 grayscale'}`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <UploadCloud className={`w-24 h-24 ${isAdmin ? 'text-emerald-950' : 'text-slate-900'}`} />
          </div>
          <div className="flex items-center space-x-4 mb-4 relative z-10">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isAdmin ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Migrasi Database Server</h3>
              <p className={`text-xs sm:text-sm ${isAdmin ? 'text-emerald-700 font-medium' : 'text-slate-500'}`}>Sinkronisasi data statis ke Firestore</p>
            </div>
          </div>
          <button 
            onClick={handleSeedDatabase} 
            disabled={!isAdmin || isSeeding}
            className={`mt-2 w-full py-3 px-4 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center relative z-10 cursor-pointer ${isAdmin ? 'bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-300 text-white shadow-xs' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
          >
            {isSeeding ? 'Memproses...' : 'Jalankan Migrasi Database'}
          </button>
          {seedMessage && (
            <p className={`mt-3 text-xs font-semibold relative z-10 ${seedMessage.includes('Gagal') ? 'text-rose-600' : 'text-emerald-800'}`}>
              {seedMessage}
            </p>
          )}
        </div>

      </motion.div>
    </div>
  );
};
