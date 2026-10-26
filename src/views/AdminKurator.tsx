import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Database, 
  UploadCloud, 
  LogIn, 
  ExternalLink, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Plus,
  Edit3,
  Inbox,
  HeartHandshake,
  MapPin,
  Save
} from 'lucide-react';
import { motion } from 'motion/react';
import { ziarahSites as localSites, ZiarahSite } from '../data/sites';
import { useSites } from '../context/SiteContext';
import { auth, db, googleProvider, handleFirestoreError, OperationType, isUserAdmin } from '../lib/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';

interface ContributionItem {
  id: string;
  type: 'baru' | 'karomah' | 'doa';
  contributorName: string;
  contributorContact?: string;
  targetName: string;
  category?: string;
  city?: string;
  province?: string;
  mapsUrl?: string;
  content: string;
  translation?: string;
  status: 'pending' | 'approved' | 'rejected';
  authorUid?: string;
  createdAtMs: number;
}

export const AdminKurator: React.FC = () => {
  const { sites, isSeededInCloud, cloudSiteCount } = useSites();
  const [activeTab, setActiveTab] = useState<'kontribusi' | 'makam' | 'infaq'>('kontribusi');
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Contributions state
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Site CRUD state
  const [isSiteFormOpen, setIsSiteFormOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Partial<ZiarahSite>>({
    id: '',
    name: '',
    title: '',
    category: 'Ulama Nusantara',
    description: '',
    history: '',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
    openingHours: 'Buka 24 Jam',
    facilities: ['Masjid / Musholla', 'Area Parkir', 'Tempat Wudhu'],
    location: {
      lat: -6.9,
      lng: 110.4,
      address: '',
      city: '',
      province: ''
    }
  });
  const [isSavingSite, setIsSavingSite] = useState(false);
  const [siteStatusMsg, setSiteStatusMsg] = useState('');

  // Infaq settings & donations state
  const [bankName, setBankName] = useState('Bank Syariah Indonesia (BSI)');
  const [accountNumber, setAccountNumber] = useState('7123-4567-8901');
  const [accountHolder, setAccountHolder] = useState('Yayasan Makam Aulia Nusantara');
  const [qrisImageUrl, setQrisImageUrl] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');
  const [donations, setDonations] = useState<any[]>([]);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (isUserAdmin(currentUser)) {
        setIsAdmin(true);
        setLoginError(null);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to contributions & donations & settings when Admin is logged in
  useEffect(() => {
    if (!isAdmin) return;

    const unsubContrib = onSnapshot(
      collection(db, 'contributions'),
      (snap) => {
        const list: ContributionItem[] = snap.docs.map(d => {
          const data = d.data();
          return {
            id: d.id,
            type: data.type || 'baru',
            contributorName: data.contributorName || 'Hamba Allah',
            contributorContact: data.contributorContact || '',
            targetName: data.targetName || '',
            category: data.category || 'Ulama Nusantara',
            city: data.city || '',
            province: data.province || '',
            mapsUrl: data.mapsUrl || '',
            content: data.content || '',
            translation: data.translation || '',
            status: data.status || 'pending',
            authorUid: data.authorUid || '',
            createdAtMs: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
          };
        });
        list.sort((a, b) => b.createdAtMs - a.createdAtMs);
        setContributions(list);
      },
      (err) => console.error('Error loading contributions:', err)
    );

    const unsubDonations = onSnapshot(
      collection(db, 'donations'),
      (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setDonations(list);
      },
      (err) => console.error('Error loading donations:', err)
    );

    getDoc(doc(db, 'settings', 'infaq'))
      .then((snap) => {
        if (snap.exists()) {
          const d = snap.data();
          if (d.bankName) setBankName(d.bankName);
          if (d.accountNumber) setAccountNumber(d.accountNumber);
          if (d.accountHolder) setAccountHolder(d.accountHolder);
          if (d.qrisImageUrl !== undefined) setQrisImageUrl(d.qrisImageUrl);
        }
      })
      .catch(() => {});

    return () => {
      unsubContrib();
      unsubDonations();
    };
  }, [isAdmin]);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Error signing in with Google', error);
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
    setSeedMessage('Memulai sinkronisasi data ke Cloud Firestore...');
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

  const handleApproveContribution = async (item: ContributionItem) => {
    if (!isAdmin || processingId) return;
    setProcessingId(item.id);
    try {
      // If it's a new site proposal, also create a site entry in /sites if desired
      if (item.type === 'baru') {
        const slug = item.targetName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 60) || `makam-${Date.now()}`;

        const newSite: ZiarahSite = {
          id: slug,
          name: item.targetName,
          title: item.targetName.startsWith('Makam') ? item.targetName : `Makam ${item.targetName}`,
          category: (item.category as any) || 'Ulama Nusantara',
          description: item.content.slice(0, 220),
          history: item.content,
          imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
          openingHours: 'Buka 24 Jam',
          facilities: ['Masjid / Musholla', 'Tempat Wudhu', 'Area Parkir'],
          location: {
            lat: -6.95,
            lng: 110.42,
            address: item.mapsUrl || `${item.city || 'Nusantara'}`,
            city: item.city || 'Nusantara',
            province: item.province || 'Indonesia',
          }
        };
        await setDoc(doc(db, 'sites', slug), newSite, { merge: true });
      }

      await updateDoc(doc(db, 'contributions', item.id), {
        status: 'approved',
      });
    } catch (error) {
      console.error('Failed to approve contribution:', error);
      try {
        handleFirestoreError(error, OperationType.UPDATE, `contributions/${item.id}`);
      } catch {}
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectContribution = async (item: ContributionItem) => {
    if (!isAdmin || processingId) return;
    setProcessingId(item.id);
    try {
      await updateDoc(doc(db, 'contributions', item.id), {
        status: 'rejected',
      });
    } catch (error) {
      console.error('Failed to reject contribution:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteContribution = async (id: string) => {
    if (!isAdmin || processingId) return;
    setProcessingId(id);
    try {
      await deleteDoc(doc(db, 'contributions', id));
    } catch (error) {
      console.error('Failed to delete contribution:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleSaveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || isSavingSite) return;
    setIsSavingSite(true);
    setSiteStatusMsg('');

    const slug = (editingSite.id?.trim() || editingSite.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `site-${Date.now()}`).slice(0, 80);
    const payload: ZiarahSite = {
      id: slug,
      name: editingSite.name || 'Tokoh Ulama',
      title: editingSite.title || `Makam ${editingSite.name}`,
      category: (editingSite.category as any) || 'Ulama Nusantara',
      description: editingSite.description || '',
      history: editingSite.history || editingSite.description || '',
      imageUrl: editingSite.imageUrl || 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
      openingHours: editingSite.openingHours || 'Buka 24 Jam',
      facilities: editingSite.facilities || ['Masjid / Musholla', 'Area Parkir'],
      location: {
        lat: Number(editingSite.location?.lat) || -6.9,
        lng: Number(editingSite.location?.lng) || 110.4,
        address: editingSite.location?.address || '',
        city: editingSite.location?.city || '',
        province: editingSite.location?.province || '',
      },
      karomah: editingSite.karomah || [],
      doaKhusus: editingSite.doaKhusus || [],
      untoldStory: editingSite.untoldStory || '',
    };

    try {
      await setDoc(doc(db, 'sites', slug), payload, { merge: true });
      setSiteStatusMsg(`Berhasil menyimpan data "${payload.name}" ke Firestore.`);
      setIsSiteFormOpen(false);
    } catch (error: any) {
      setSiteStatusMsg(`Gagal menyimpan: ${error.message}`);
      try {
        handleFirestoreError(error, OperationType.WRITE, `sites/${slug}`);
      } catch {}
    } finally {
      setIsSavingSite(false);
    }
  };

  const handleDeleteSite = async (siteId: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'sites', siteId));
      setSiteStatusMsg(`Data makam (${siteId}) dihapus dari Cloud Firestore.`);
    } catch (error: any) {
      setSiteStatusMsg(`Gagal menghapus: ${error.message}`);
    }
  };

  const handleSaveInfaqSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || isSavingSettings) return;
    setIsSavingSettings(true);
    setSettingsMsg('');
    try {
      await setDoc(doc(db, 'settings', 'infaq'), {
        bankName: bankName.trim().slice(0, 100),
        accountNumber: accountNumber.trim().slice(0, 60),
        accountHolder: accountHolder.trim().slice(0, 120),
        qrisImageUrl: qrisImageUrl.trim().slice(0, 1000),
        updatedAt: serverTimestamp(),
      });
      setSettingsMsg('Berhasil menyimpan pengaturan rekening & QRIS. Halaman Infaq Digital telah diperbarui.');
    } catch (error: any) {
      setSettingsMsg('Gagal menyimpan pengaturan: ' + error.message);
      try {
        handleFirestoreError(error, OperationType.WRITE, 'settings/infaq');
      } catch {}
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleDeleteDonation = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'donations', id));
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  const pendingCount = contributions.filter(c => c.status === 'pending').length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20 pt-4 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xs border border-slate-200/90 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
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
                {isAdmin ? 'Akses Penuh (Super Admin & Dewan Kurator)' : 'Preview Mode - Read Only'}
              </p>
            </div>
          </div>

          {isAdmin && (
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('kontribusi')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'kontribusi' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Inbox className="w-3.5 h-3.5 mr-1.5" />
                Kontribusi {pendingCount > 0 && <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px]">{pendingCount}</span>}
              </button>
              <button
                onClick={() => setActiveTab('makam')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'makam' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-3.5 h-3.5 mr-1.5" />
                Direktori ({sites.length})
              </button>
              <button
                onClick={() => setActiveTab('infaq')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'infaq' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 mr-1.5" />
                Infaq & QRIS
              </button>
            </div>
          )}
        </div>

        {!isAdmin ? (
          <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-sm font-bold text-rose-950">Akses Terbatas (Khusus Akun Kurator)</p>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                {user ? `Akun Anda (${user.email}) tidak terdaftar sebagai admin.` : 'Silakan login menggunakan akun Google Admin Kurator.'} Untuk self-hosting, Anda dapat menambahkan email admin melalui variabel environment <code className="bg-white px-1.5 py-0.5 rounded border border-rose-200">VITE_ADMIN_EMAILS</code>.
              </p>
            </div>

            {loginError && (
              <div className="bg-white/90 border border-rose-300 rounded-xl p-3 flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-800 leading-relaxed">{loginError}</p>
              </div>
            )}

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
          </div>
        ) : (
          <div className="space-y-6">
            {/* TAB 1: ANTREAN KONTRIBUSI KOMUNITAS */}
            {activeTab === 'kontribusi' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Antrean Usulan & Kontribusi Peziarah</h2>
                    <p className="text-xs text-slate-500">Setujui usulan makam baru, naskah rubrik karomah, atau doa khusus dari pengguna.</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Total: {contributions.length} Usulan
                  </span>
                </div>

                {contributions.length === 0 ? (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-10 text-center">
                    <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700">Belum Ada Usulan Masuk</p>
                    <p className="text-xs text-slate-500 mt-1">Setiap usulan yang dikirim pengguna melalui tombol "Kontribusi" akan tampil secara real-time di sini.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {contributions.map((item) => (
                      <div key={item.id} className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-lg border ${
                              item.type === 'baru'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : item.type === 'karomah'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-sky-50 text-sky-800 border-sky-200'
                            }`}>
                              {item.type === 'baru' ? 'Lokasi Makam Baru' : item.type === 'karomah' ? 'Rubrik & Karomah' : 'Doa Khusus'}
                            </span>
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-lg border ${
                              item.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : item.status === 'rejected'
                                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                                  : 'bg-amber-100 text-amber-900 border-amber-300'
                            }`}>
                              {item.status === 'approved' ? 'Disetujui' : item.status === 'rejected' ? 'Ditolak' : 'Menunggu Kurasi'}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            Pengusul: <strong className="text-slate-800">{item.contributorName}</strong> {item.contributorContact ? `(${item.contributorContact})` : ''}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.targetName}</h3>
                          {(item.city || item.province) && (
                            <p className="text-xs text-emerald-700 font-medium flex items-center mt-0.5">
                              <MapPin className="w-3.5 h-3.5 mr-1" /> {item.city}{item.province ? `, ${item.province}` : ''} ({item.category})
                            </p>
                          )}
                          {item.mapsUrl && (
                            <p className="text-xs text-slate-500 mt-0.5 truncate">Maps/Alamat: {item.mapsUrl}</p>
                          )}
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                          {item.content}
                          {item.translation && (
                            <p className="mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500 italic">
                              Arti / Fadhilah: {item.translation}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                          {item.status !== 'approved' && (
                            <button
                              onClick={() => handleApproveContribution(item)}
                              disabled={processingId === item.id}
                              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                              Setujui & Publikasikan
                            </button>
                          )}
                          {item.status !== 'rejected' && (
                            <button
                              onClick={() => handleRejectContribution(item)}
                              disabled={processingId === item.id}
                              className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl flex items-center transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5 mr-1.5" />
                              Tolak
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteContribution(item.id)}
                            disabled={processingId === item.id}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            title="Hapus permanen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MANAJEMEN DIREKTORI MAKAM */}
            {activeTab === 'makam' && (
              <div className="space-y-6">
                {/* Sinkronisasi Cloud */}
                <div className="border rounded-2xl p-5 bg-emerald-50/50 border-emerald-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <UploadCloud className="w-24 h-24 text-emerald-950" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white text-emerald-800 border border-emerald-200 mb-2">
                        Status Cloud: {isSeededInCloud ? `Tersinkronisasi (${cloudSiteCount} Makam di Firestore)` : 'Menggunakan Fallback Lokal (Belum Di-seed)'}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">Sinkronisasi Data Bawaan ke Firestore</h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Salin seluruh {localSites.length} data makam utama ke koleksi <code className="bg-white px-1 rounded">sites</code> di Cloud Firestore Anda.
                      </p>
                    </div>
                    <button 
                      onClick={handleSeedDatabase} 
                      disabled={isSeeding}
                      className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-300 text-white font-bold rounded-xl text-xs transition-all shrink-0 cursor-pointer shadow-xs"
                    >
                      {isSeeding ? 'Memproses...' : 'Sinkronkan 33 Makam Bawaan'}
                    </button>
                  </div>
                  {seedMessage && (
                    <p className={`mt-3 text-xs font-semibold relative z-10 ${seedMessage.includes('Gagal') ? 'text-rose-600' : 'text-emerald-800'}`}>
                      {seedMessage}
                    </p>
                  )}
                </div>

                {/* Header & Tombol Tambah Makam */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Kelola Daftar Makam ({sites.length})</h3>
                    <p className="text-xs text-slate-500">Tambah makam baru atau perbarui informasi makam yang sudah ada.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingSite({
                        id: '',
                        name: '',
                        title: '',
                        category: 'Ulama Nusantara',
                        description: '',
                        history: '',
                        imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
                        openingHours: 'Buka 24 Jam',
                        facilities: ['Masjid / Musholla', 'Area Parkir', 'Tempat Wudhu'],
                        location: { lat: -6.9, lng: 110.4, address: '', city: '', province: '' }
                      });
                      setIsSiteFormOpen(!isSiteFormOpen);
                    }}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Tambah Makam Baru
                  </button>
                </div>

                {siteStatusMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl">
                    {siteStatusMsg}
                  </div>
                )}

                {/* Form Tambah / Edit Makam */}
                {isSiteFormOpen && (
                  <form onSubmit={handleSaveSite} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm">Formulir Data Makam</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Tokoh / Wali *</label>
                        <input
                          required
                          type="text"
                          value={editingSite.name || ''}
                          onChange={(e) => setEditingSite({ ...editingSite, name: e.target.value })}
                          placeholder="Contoh: Syekh Nawawi Al-Bantani"
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Judul Lengkap Makam *</label>
                        <input
                          required
                          type="text"
                          value={editingSite.title || ''}
                          onChange={(e) => setEditingSite({ ...editingSite, title: e.target.value })}
                          placeholder="Contoh: Makam Syekh Nawawi Al-Bantani"
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                        <select
                          value={editingSite.category || 'Ulama Nusantara'}
                          onChange={(e) => setEditingSite({ ...editingSite, category: e.target.value as any })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        >
                          <option value="Walisongo">Walisongo</option>
                          <option value="Ulama Nusantara">Ulama Nusantara</option>
                          <option value="Habaib">Habaib</option>
                          <option value="Auliya Nusantara">Auliya Nusantara</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">URL Foto Makam</label>
                        <input
                          type="text"
                          value={editingSite.imageUrl || ''}
                          onChange={(e) => setEditingSite({ ...editingSite, imageUrl: e.target.value })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Kota / Kabupaten *</label>
                        <input
                          required
                          type="text"
                          value={editingSite.location?.city || ''}
                          onChange={(e) => setEditingSite({ ...editingSite, location: { ...editingSite.location!, city: e.target.value } })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Provinsi *</label>
                        <input
                          required
                          type="text"
                          value={editingSite.location?.province || ''}
                          onChange={(e) => setEditingSite({ ...editingSite, location: { ...editingSite.location!, province: e.target.value } })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Latitude (Koordinat)</label>
                        <input
                          type="number"
                          step="any"
                          value={editingSite.location?.lat ?? -6.9}
                          onChange={(e) => setEditingSite({ ...editingSite, location: { ...editingSite.location!, lat: parseFloat(e.target.value) } })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Longitude (Koordinat)</label>
                        <input
                          type="number"
                          step="any"
                          value={editingSite.location?.lng ?? 110.4}
                          onChange={(e) => setEditingSite({ ...editingSite, location: { ...editingSite.location!, lng: parseFloat(e.target.value) } })}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap</label>
                      <input
                        type="text"
                        value={editingSite.location?.address || ''}
                        onChange={(e) => setEditingSite({ ...editingSite, location: { ...editingSite.location!, address: e.target.value } })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat *</label>
                      <textarea
                        required
                        rows={2}
                        value={editingSite.description || ''}
                        onChange={(e) => setEditingSite({ ...editingSite, description: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sejarah Lengkap</label>
                      <textarea
                        rows={3}
                        value={editingSite.history || ''}
                        onChange={(e) => setEditingSite({ ...editingSite, history: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsSiteFormOpen(false)}
                        className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingSite}
                        className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        {isSavingSite ? 'Menyimpan...' : 'Simpan ke Firestore'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Daftar Ringkas Makam */}
                <div className="max-h-96 overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100">
                  {sites.map((s) => (
                    <div key={s.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50">
                      <div className="min-w-0 pr-3">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{s.name}</p>
                        <p className="text-[11px] text-slate-500">{s.location.city}, {s.location.province} • {s.category}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setEditingSite(s);
                            setIsSiteFormOpen(true);
                          }}
                          className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Makam"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {isSeededInCloud && (
                          <button
                            onClick={() => handleDeleteSite(s.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus dari Firestore"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PENGATURAN REKENING, QRIS & RIWAYAT INFAQ */}
            {activeTab === 'infaq' && (
              <div className="space-y-6">
                <form onSubmit={handleSaveInfaqSettings} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Konfigurasi Rekening & Gambar QRIS Resmi</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ubah nomor rekening yayasan dan URL gambar QRIS statis resmi Anda di sini agar siap digunakan untuk transaksi nyata saat self-hosting.
                    </p>
                  </div>

                  {settingsMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl">
                      {settingsMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nama Bank Syariah / Umum</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Rekening</label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Atas Nama (Yayasan / Pengurus)</label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Gambar QRIS Statis Resmi (Opsional)</label>
                    <input
                      type="url"
                      placeholder="https://domain-anda.com/qris-yayasan.png (Kosongkan untuk QR standar)"
                      value={qrisImageUrl}
                      onChange={(e) => setQrisImageUrl(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5 mr-1.5" />
                      {isSavingSettings ? 'Menyimpan...' : 'Simpan Pengaturan Infaq'}
                    </button>
                  </div>
                </form>

                {/* Daftar Konfirmasi Infaq */}
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-3">Riwayat Konfirmasi Infaq Masuk ({donations.length})</h3>
                  {donations.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">Belum ada data konfirmasi infaq di database.</p>
                  ) : (
                    <div className="max-h-80 overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100">
                      {donations.map((d) => (
                        <div key={d.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50">
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              {d.donorName} — <span className="text-emerald-700">Rp {Number(d.amount || 0).toLocaleString('id-ID')}</span>
                            </p>
                            <p className="text-[11px] text-slate-500">{d.programTitle} • {d.siteName}</p>
                            {d.doaHajat && <p className="text-[11px] text-slate-600 italic mt-0.5">"{d.doaHajat}"</p>}
                          </div>
                          <button
                            onClick={() => handleDeleteDonation(d.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                            title="Hapus catatan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
};
