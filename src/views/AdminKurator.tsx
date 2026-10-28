import React, { useState, useEffect } from 'react';
import { 
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
  Save,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  ScrollText,
  Lock,
  Unlock,
  Globe,
  Copy,
  Check,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ziarahSites as localSites, ZiarahSite } from '../data/sites';
import { DEFAULT_INFAQ_PROGRAMS, InfaqProgramItem } from './InfaqDigital';
import { DEFAULT_RUBRIK_GATE_SETTINGS, RubrikGateSettings, RubrikItem } from './RubrikKisah';
import { useSites } from '../context/SiteContext';
import { auth, db, googleProvider, handleFirestoreError, OperationType, isUserAdmin } from '../lib/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, User } from 'firebase/auth';
import { OFFICIAL_QRIS_STATIC_PAYLOAD } from '../lib/qris';
import { QrisPaymentCard } from '../components/QrisPaymentCard';

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
  const [activeTab, setActiveTab] = useState<'kontribusi' | 'makam' | 'rubrik' | 'infaq'>('kontribusi');
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
    untoldStory: '',
    karomah: [],
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

  // Infaq settings, programs, rubrik gate & donations state
  const [bankName, setBankName] = useState('Bank BCA');
  const [accountNumber, setAccountNumber] = useState('5470-0856-08');
  const [accountHolder, setAccountHolder] = useState('ARIF NURACHMAN HAKIM');
  const [qrisImageUrl, setQrisImageUrl] = useState('');
  const [qrisPayload, setQrisPayload] = useState(OFFICIAL_QRIS_STATIC_PAYLOAD);
  const [customDomain, setCustomDomain] = useState('ziarahnusantara.my.id');
  const [copiedDnsKey, setCopiedDnsKey] = useState<string | null>(null);
  const [infaqPrograms, setInfaqPrograms] = useState<InfaqProgramItem[]>(DEFAULT_INFAQ_PROGRAMS);
  const [rubrikGate, setRubrikGate] = useState<RubrikGateSettings>(DEFAULT_RUBRIK_GATE_SETTINGS);
  const [newCustomArticle, setNewCustomArticle] = useState<Partial<RubrikItem>>({
    title: '',
    siteName: '',
    location: 'Nusantara',
    category: 'Kisah Rahasia',
    content: '',
    source: 'Arsip Kurator Ziarah Nusantara',
    readTime: '3 mnt',
  });
  const [isAddingCustomArticle, setIsAddingCustomArticle] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');
  const [donations, setDonations] = useState<any[]>([]);
  const [previewProofDonation, setPreviewProofDonation] = useState<any | null>(null);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';

  const formatLoginError = (error: any) => {
    const errorCode = error?.code || '';
    if (errorCode === 'auth/unauthorized-domain') {
      return `Domain "${currentHostname}" belum terdaftar di Firebase Authentication. Silakan buka Firebase Console (Project: pro-cumulus-xmvz5) → Authentication → Settings → Authorized domains → klik Add domain lalu masukkan: ${currentHostname}`;
    }
    if (errorCode === 'auth/network-request-failed') {
      return isInIframe
        ? 'Koneksi Google Auth dibatasi oleh sandbox iframe. Silakan klik "Buka di Tab Baru" di bawah untuk login langsung.'
        : 'Koneksi ke Google Auth gagal (auth/network-request-failed). Matikan AdBlock/Shields untuk situs ini atau gunakan tombol "Masuk Tanpa Pop-up (Redirect)".';
    }
    if (errorCode === 'auth/popup-blocked') {
      return 'Jendela Pop-up diblokir oleh browser Anda. Silakan klik tombol "Masuk Tanpa Pop-up (Redirect)" di bawah (tidak memerlukan pop-up), atau klik ikon Pop-up Diblokir di pojok kanan address bar browser lalu pilih "Selalu izinkan pop-up".';
    }
    if (errorCode === 'auth/popup-closed-by-user' || errorCode === 'auth/cancelled-popup-request') {
      return null;
    }
    return error?.message || 'Gagal masuk via Google. Silakan gunakan tombol Masuk Tanpa Pop-up (Redirect).';
  };

  useEffect(() => {
    // Bersihkan sesi PIN lama agar akses hanya melalui autentikasi Google Admin resmi
    try {
      localStorage.removeItem('ziarah_curator_pin_session');
      localStorage.removeItem('ziarah_custom_admin_pin');
    } catch {}

    getDoc(doc(db, 'settings', 'infaq'))
      .then((snap) => {
        if (snap.exists()) {
          const d = snap.data();
          if (d.customDomain) setCustomDomain(d.customDomain);
        }
      })
      .catch(() => {});

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (isUserAdmin(currentUser)) {
        setIsAdmin(true);
        setLoginError(null);
      } else {
        setIsAdmin(false);
      }
    });

    getRedirectResult(auth).catch((error) => {
      if (error) {
        const msg = formatLoginError(error);
        if (msg) setLoginError(msg);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsAdmin(isUserAdmin(user));
  }, [user]);

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
          if (d.qrisPayload) setQrisPayload(d.qrisPayload);
          if (d.customDomain !== undefined) setCustomDomain(d.customDomain);
          if (Array.isArray(d.programs) && d.programs.length > 0) {
            setInfaqPrograms(d.programs);
          }
          if (d.rubrikGate) {
            setRubrikGate({
              lockEnabled: d.rubrikGate.lockEnabled !== undefined ? Boolean(d.rubrikGate.lockEnabled) : DEFAULT_RUBRIK_GATE_SETTINGS.lockEnabled,
              freeSampleCount: typeof d.rubrikGate.freeSampleCount === 'number' ? d.rubrikGate.freeSampleCount : DEFAULT_RUBRIK_GATE_SETTINGS.freeSampleCount,
              minDonationAmount: typeof d.rubrikGate.minDonationAmount === 'number' ? d.rubrikGate.minDonationAmount : DEFAULT_RUBRIK_GATE_SETTINGS.minDonationAmount,
              bannerTitle: d.rubrikGate.bannerTitle || DEFAULT_RUBRIK_GATE_SETTINGS.bannerTitle,
              bannerDescription: d.rubrikGate.bannerDescription || DEFAULT_RUBRIK_GATE_SETTINGS.bannerDescription,
              pinnedFreeArticleIds: Array.isArray(d.rubrikGate.pinnedFreeArticleIds) ? d.rubrikGate.pinnedFreeArticleIds : DEFAULT_RUBRIK_GATE_SETTINGS.pinnedFreeArticleIds,
              customArticles: Array.isArray(d.rubrikGate.customArticles) ? d.rubrikGate.customArticles : [],
              requireManualVerification: Boolean(d.rubrikGate.requireManualVerification),
            });
          }
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
      const msg = formatLoginError(error);
      if (msg) setLoginError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRedirectLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      console.error('Error redirect sign in with Google', error);
      const msg = formatLoginError(error);
      if (msg) setLoginError(msg);
      setIsLoggingIn(false);
    }
  };

  const handleSwitchAccount = async () => {
    try {
      await signOut(auth);
      setLoginError(null);
    } catch {}
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

  const handleCopyDnsValue = (key: string, val: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(val).catch(() => {});
      setCopiedDnsKey(key);
      setTimeout(() => setCopiedDnsKey(null), 2000);
    }
  };

  const handleSaveInfaqSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isAdmin || isSavingSettings) return;
    setIsSavingSettings(true);
    setSettingsMsg('');
    const cleanedDomain = (customDomain.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '') || 'ziarahnusantara.my.id').slice(0, 120);
    const payload = {
      bankName: bankName.trim().slice(0, 100),
      accountNumber: accountNumber.trim().slice(0, 60),
      accountHolder: accountHolder.trim().slice(0, 120),
      qrisImageUrl: qrisImageUrl.trim().slice(0, 1000),
      qrisPayload: (qrisPayload.trim() || OFFICIAL_QRIS_STATIC_PAYLOAD).slice(0, 1000),
      customDomain: cleanedDomain,
      programs: infaqPrograms,
      rubrikGate,
    };

    try {
      localStorage.setItem('ziarah_local_settings_cache', JSON.stringify(payload));
    } catch {}

    try {
      await setDoc(doc(db, 'settings', 'infaq'), {
        ...payload,
        updatedAt: serverTimestamp(),
      });
      setCustomDomain(cleanedDomain);
      setSettingsMsg('Berhasil menyimpan seluruh pengaturan Program Kebaikan, Rekening/QRIS, Custom Domain (ziarahnusantara.my.id), dan Kunci Donasi Rubrik ke Firestore.');
    } catch (error: any) {
      setCustomDomain(cleanedDomain);
      setSettingsMsg('Gagal menyimpan ke Cloud Firestore: ' + error.message);
      try {
        handleFirestoreError(error, OperationType.WRITE, 'settings/infaq');
      } catch {}
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleMoveProgram = (index: number, direction: 'up' | 'down') => {
    setInfaqPrograms((prev) => {
      const next = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const handleAddProgram = () => {
    const newId = `program-${Date.now()}`;
    setInfaqPrograms((prev) => [
      ...prev,
      {
        id: newId,
        title: 'Program Kebaikan Baru',
        desc: 'Tuliskan deskripsi program infaq/wakaf di sini...',
        tag: 'Prioritas',
        iconName: 'HeartHandshake',
        color: 'from-emerald-500 to-teal-700',
      },
    ]);
  };

  const handleUpdateProgramField = (index: number, field: keyof InfaqProgramItem, value: string) => {
    setInfaqPrograms((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteProgram = (index: number) => {
    if (infaqPrograms.length <= 1) return;
    setInfaqPrograms((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleTogglePinnedFreeArticle = (articleId: string) => {
    setRubrikGate((prev) => {
      const exists = prev.pinnedFreeArticleIds.includes(articleId);
      return {
        ...prev,
        pinnedFreeArticleIds: exists
          ? prev.pinnedFreeArticleIds.filter((id) => id !== articleId)
          : [...prev.pinnedFreeArticleIds, articleId],
      };
    });
  };

  const handleAddCustomRubrikArticle = () => {
    if (!newCustomArticle.title?.trim() || !newCustomArticle.content?.trim()) return;
    const item: RubrikItem = {
      id: `rubrik-custom-${Date.now()}`,
      siteId: 'sunan-kalijaga',
      siteName: newCustomArticle.siteName?.trim() || 'Aulia Nusantara',
      location: newCustomArticle.location?.trim() || 'Nusantara',
      category: (newCustomArticle.category as any) || 'Kisah Rahasia',
      title: newCustomArticle.title.trim(),
      content: newCustomArticle.content.trim(),
      source: newCustomArticle.source?.trim() || 'Arsip Kurator Ziarah Nusantara',
      readTime: newCustomArticle.readTime?.trim() || '3 mnt',
    };
    setRubrikGate((prev) => ({
      ...prev,
      customArticles: [item, ...(prev.customArticles || [])],
    }));
    setNewCustomArticle({
      title: '',
      siteName: '',
      location: 'Nusantara',
      category: 'Kisah Rahasia',
      content: '',
      source: 'Arsip Kurator Ziarah Nusantara',
      readTime: '3 mnt',
    });
    setIsAddingCustomArticle(false);
  };

  const handleDeleteCustomRubrikArticle = (id: string) => {
    setRubrikGate((prev) => ({
      ...prev,
      customArticles: (prev.customArticles || []).filter((a) => a.id !== id),
      pinnedFreeArticleIds: prev.pinnedFreeArticleIds.filter((pid) => pid !== id),
    }));
  };

  const handleVerifyDonation = async (id: string) => {
    if (!isAdmin) return;
    try {
      await updateDoc(doc(db, 'donations', id), {
        status: 'verified',
      });
      if (previewProofDonation?.id === id) {
        setPreviewProofDonation((prev: any) => prev ? { ...prev, status: 'verified' } : null);
      }
    } catch (error) {
      console.error('Error verifying donation:', error);
    }
  };

  const handleDeleteDonation = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'donations', id));
      if (previewProofDonation?.id === id) {
        setPreviewProofDonation(null);
      }
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
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${isAdmin ? 'bg-emerald-50 border-emerald-200' : 'bg-stone-100 border-stone-200'}`}>
              {isAdmin ? (
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              ) : (
                <Lock className="w-6 h-6 text-stone-700" />
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight">Portal Dewan Kurator</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {isAdmin ? `Terverifikasi sebagai Super Admin (${user?.email})` : 'Akses Terkunci — Khusus Akun Pengurus & Kurator Terdaftar'}
              </p>
            </div>
          </div>

          {isAdmin && (
            <div className="flex flex-wrap bg-slate-100 p-1 rounded-2xl border border-slate-200/80 self-start sm:self-auto gap-1">
              <button
                onClick={() => setActiveTab('kontribusi')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'kontribusi' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Inbox className="w-3.5 h-3.5 mr-1.5" />
                Kontribusi {pendingCount > 0 && <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px]">{pendingCount}</span>}
              </button>
              <button
                onClick={() => setActiveTab('makam')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'makam' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-3.5 h-3.5 mr-1.5" />
                Direktori ({sites.length})
              </button>
              <button
                onClick={() => setActiveTab('rubrik')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'rubrik' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ScrollText className="w-3.5 h-3.5 mr-1.5" />
                Rubrik & Kunci Donasi
              </button>
              <button
                onClick={() => setActiveTab('infaq')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'infaq' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 mr-1.5" />
                Infaq & Domain
              </button>
            </div>
          )}
        </div>

        {!isAdmin ? (
          <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-200/80 text-stone-800 text-[11px] font-bold uppercase tracking-wider">
                <Lock className="w-3 h-3" /> Area Internal Terproteksi
              </span>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {user
                  ? 'Akun Anda Tidak Memiliki Hak Akses Kurator'
                  : 'Autentikasi Akun Google Dewan Kurator'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {user
                  ? `Anda saat ini masuk sebagai ${user.email} (Akun Peziarah Reguler). Halaman manajemen database dan kurasi ini hanya dapat diakses oleh email Super Admin / Dewan Kurator resmi yang telah diverifikasi di sistem.`
                  : 'Halaman ini dikhususkan bagi pengelola resmi Ziarah Nusantara. Pengunjung umum tidak dapat masuk ke halaman ini. Jika Anda adalah Admin Kurator, silakan masuk menggunakan akun Google resmi Anda.'}
              </p>
            </div>

            {loginError && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-2 text-xs text-rose-900 leading-relaxed">
                  <p className="font-semibold">{loginError}</p>
                  {loginError.includes('belum terdaftar di Firebase Authentication') && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-rose-200 font-mono font-bold text-slate-900">
                        {currentHostname || 'ziarahnusantara.my.id'}
                        <button
                          type="button"
                          onClick={() => handleCopyDnsValue('auth-domain', currentHostname || 'ziarahnusantara.my.id')}
                          className="text-emerald-700 hover:underline font-sans text-[10px] cursor-pointer"
                        >
                          {copiedDnsKey === 'auth-domain' ? '✓ Tersalin' : 'Salin Domain'}
                        </button>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {user ? (
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center transition-all shadow-xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  <span>Ganti ke Akun Google Admin</span>
                </button>
              ) : (
                <>
                  {!isInIframe && (
                    <button
                      disabled={isLoggingIn}
                      onClick={handleRedirectLogin}
                      className="py-2.5 px-5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5 mr-2" />
                      <span>Masuk Akun Kurator (Redirect Tanpa Pop-up)</span>
                    </button>
                  )}

                  <button
                    disabled={isLoggingIn}
                    onClick={handleLogin}
                    className="py-2.5 px-5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-bold rounded-xl flex items-center transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        <span>Memverifikasi...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-3.5 h-3.5 mr-2 text-emerald-800" />
                        <span>Masuk via Pop-up Google</span>
                      </>
                    )}
                  </button>

                  {isInIframe && (
                    <a
                      href={typeof window !== 'undefined' ? window.location.href : '/admin'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-xs font-semibold rounded-xl flex items-center transition-colors shadow-2xs cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                      <span>Buka di Tab Baru</span>
                    </a>
                  )}
                </>
              )}

              <Link
                to="/"
                className="py-2.5 px-4 bg-transparent hover:bg-stone-200/70 text-stone-600 hover:text-stone-900 text-xs font-semibold rounded-xl transition-colors"
              >
                ← Kembali ke Beranda Direktori
              </Link>
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
                      {isSeeding ? 'Memproses...' : `Sinkronkan ${localSites.length} Makam Bawaan`}
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
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kisah Rahasia / Untold Story (Tampil di Rubrik)</label>
                      <textarea
                        rows={3}
                        placeholder="Tuliskan kisah rahasia atau manuskrip khusus tokoh ini..."
                        value={editingSite.untoldStory || ''}
                        onChange={(e) => setEditingSite({ ...editingSite, untoldStory: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Daftar Hikmah & Karomah (Pisahkan setiap karomah dengan baris baru / Enter)</label>
                      <textarea
                        rows={3}
                        placeholder="Satu baris untuk satu kisah karomah..."
                        value={(editingSite.karomah || []).join('\n')}
                        onChange={(e) =>
                          setEditingSite({
                            ...editingSite,
                            karomah: e.target.value
                              .split('\n')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
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
                          title="Edit Makam, Kisah Rahasia & Karomah"
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

            {/* TAB 3: KELOLA RUBRIK, CONTOH GRATIS & KUNCI DONASI */}
            {activeTab === 'rubrik' && (
              <div className="space-y-6">
                {settingsMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-2xl flex items-center justify-between">
                    <span>{settingsMsg}</span>
                    <button onClick={() => setSettingsMsg('')} className="text-emerald-700 hover:underline ml-2">Tutup</button>
                  </div>
                )}

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Pengaturan Kunci Donasi & Contoh Gratis Rubrik</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Atur berapa tulisan yang dibuka gratis sebagai contoh (pancingan minat) dan buramkan sisanya hingga pengunjung berdonasi.
                      </p>
                    </div>
                    <label className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={rubrikGate.lockEnabled}
                        onChange={(e) => setRubrikGate({ ...rubrikGate, lockEnabled: e.target.checked })}
                        className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        {rubrikGate.lockEnabled ? '🔒 Kunci Donasi & Bukti Transfer Aktif' : '🔓 Semua Terbuka Gratis'}
                      </span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Mode Persetujuan Bukti Transfer (Proteksi Ketat)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Seluruh naskah terkunci <strong>wajib mengunggah foto bukti transfer</strong>. Aktifkan opsi di samping jika Anda ingin naskah baru terbuka setelah Admin mengeklik tombol <em>&ldquo;Verifikasi Bukti&rdquo;</em> secara manual.
                      </p>
                    </div>
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={Boolean(rubrikGate.requireManualVerification)}
                        onChange={(e) => setRubrikGate({ ...rubrikGate, requireManualVerification: e.target.checked })}
                        className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                      />
                      <span className="text-xs font-bold text-emerald-950">
                        {rubrikGate.requireManualVerification ? 'Wajib Klik Verifikasi Admin' : 'Verifikasi Bukti Otomatis'}
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Jumlah Tulisan Contoh Gratis (Tidak Dikunci per Halaman/Tab)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={rubrikGate.freeSampleCount}
                        onChange={(e) => setRubrikGate({ ...rubrikGate, freeSampleCount: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Default: <strong>2 tulisan pertama</strong> terbuka penuh sebagai contoh menarik, sisanya dibuat buram.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nominal Rekomendasi Infaq Pembuka Arsip (Rp)
                      </label>
                      <input
                        type="number"
                        step={5000}
                        min={5000}
                        value={rubrikGate.minDonationAmount}
                        onChange={(e) => setRubrikGate({ ...rubrikGate, minDonationAmount: Math.max(5000, parseInt(e.target.value, 10) || 25000) })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Banner Informasi di Halaman Rubrik</label>
                      <input
                        type="text"
                        value={rubrikGate.bannerTitle}
                        onChange={(e) => setRubrikGate({ ...rubrikGate, bannerTitle: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Pesan Penjelasan Donasi & Contoh Bacaan Gratis</label>
                      <textarea
                        rows={2}
                        value={rubrikGate.bannerDescription}
                        onChange={(e) => setRubrikGate({ ...rubrikGate, bannerDescription: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Tambah Tulisan Rubrik Baru */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">Tulisan Rubrik Kustom & Pilihan Contoh Gratis</h4>
                        <p className="text-[11px] text-slate-500">
                          Tambahkan kisah rahasia/karomah baru atau tandai tulisan tertentu agar selalu terbuka gratis.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddingCustomArticle(!isAddingCustomArticle)}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Tulisan Rubrik</span>
                      </button>
                    </div>

                    {isAddingCustomArticle && (
                      <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-3 mb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Judul Tulisan *</label>
                            <input
                              type="text"
                              placeholder="Contoh: Rahasia Riyadloh Sunan..."
                              value={newCustomArticle.title || ''}
                              onChange={(e) => setNewCustomArticle({ ...newCustomArticle, title: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Tokoh Wali / Ulama *</label>
                            <input
                              type="text"
                              placeholder="Contoh: Sunan Kalijaga"
                              value={newCustomArticle.siteName || ''}
                              onChange={(e) => setNewCustomArticle({ ...newCustomArticle, siteName: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Kategori Rubrik</label>
                            <select
                              value={newCustomArticle.category || 'Kisah Rahasia'}
                              onChange={(e) => setNewCustomArticle({ ...newCustomArticle, category: e.target.value as any })}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            >
                              <option value="Kisah Rahasia">Kisah Rahasia</option>
                              <option value="Hikmah & Karomah">Hikmah & Karomah</option>
                              <option value="Manuskrip">Manuskrip</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Isi Lengkap Naskah / Kisah *</label>
                          <textarea
                            rows={3}
                            placeholder="Tuliskan isi kisah rahasia, manuskrip, atau hikmah karomah..."
                            value={newCustomArticle.content || ''}
                            onChange={(e) => setNewCustomArticle({ ...newCustomArticle, content: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsAddingCustomArticle(false)}
                            className="px-3.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={handleAddCustomRubrikArticle}
                            className="px-4 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Tambahkan ke Daftar
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Daftar Artikel Kustom & Bawaan untuk Toggle Gratis/Kunci */}
                    <div className="max-h-72 overflow-y-auto bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
                      {[
                        ...(rubrikGate.customArticles || []).map((ca) => ({ ...ca, isCustom: true })),
                        {
                          id: 'rubrik-wali-songo-strategy',
                          title: 'Filosofi Gamelan & Tembang Lir-Ilir dalam Dakwah Kultural',
                          siteName: 'Sunan Kalijaga',
                          category: 'Manuskrip',
                          isCustom: false,
                        },
                        {
                          id: 'rubrik-sekumpul-adab',
                          title: 'Adab Menghadiri Majelis Maulid & Keberkahan Jamuan Musafir',
                          siteName: 'Abah Guru Sekumpul',
                          category: 'Hikmah & Karomah',
                          isCustom: false,
                        },
                        ...sites.slice(0, 12).map((s) => ({
                          id: `rubrik-${s.id}-untold`,
                          title: `Catatan Khusus: ${s.name}`,
                          siteName: s.name,
                          category: 'Kisah Rahasia',
                          isCustom: false,
                        })),
                      ].map((art) => {
                        const isPinnedFree = rubrikGate.pinnedFreeArticleIds.includes(art.id);
                        return (
                          <div key={art.id} className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {art.category}
                                </span>
                                {art.isCustom && (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                                    Kustom Kurator
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-bold text-slate-900 truncate mt-1">{art.title}</p>
                              <p className="text-[11px] text-slate-500">{art.siteName}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleTogglePinnedFreeArticle(art.id)}
                                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 border transition-colors cursor-pointer ${
                                  isPinnedFree
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                                }`}
                              >
                                {isPinnedFree ? (
                                  <>
                                    <Unlock className="w-3 h-3 text-emerald-700" />
                                    <span>Contoh Gratis</span>
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-3 h-3 text-amber-700" />
                                    <span>Terkunci (Buram)</span>
                                  </>
                                )}
                              </button>
                              {art.isCustom && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCustomRubrikArticle(art.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                                  title="Hapus tulisan kustom"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => handleSaveInfaqSettings()}
                      disabled={isSavingSettings}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5 mr-1.5" />
                      {isSavingSettings ? 'Menyimpan...' : 'Simpan Pengaturan Rubrik ke Firestore'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PENGATURAN PROGRAM KEBAIKAN, REKENING, QRIS & RIWAYAT INFAQ */}
            {activeTab === 'infaq' && (
              <div className="space-y-6">
                {settingsMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-2xl flex items-center justify-between">
                    <span>{settingsMsg}</span>
                    <button onClick={() => setSettingsMsg('')} className="text-emerald-700 hover:underline ml-2">Tutup</button>
                  </div>
                )}

                {/* Bagian A: Kelola Daftar Program Kebaikan (Prioritas Utama di Paling Atas) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Kelola Pilihan Program Kebaikan Infaq</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Program pada urutan <strong>#1 Paling Atas</strong> otomatis tampil penuh sebagai <strong>Prioritas Utama</strong> di halaman Infaq Digital.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setInfaqPrograms(DEFAULT_INFAQ_PROGRAMS)}
                        className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                        title="Kembalikan ke daftar program bawaan"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Default</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleAddProgram}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Program</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {infaqPrograms.map((prog, idx) => (
                      <div
                        key={prog.id}
                        className={`p-4 rounded-2xl border bg-white space-y-3 ${
                          idx === 0 ? 'border-emerald-500 ring-2 ring-emerald-500/15' : 'border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                              idx === 0 ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {idx === 0 ? '★ Prioritas Utama (#1 Paling Atas)' : `Urutan #${idx + 1}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveProgram(idx, 'up')}
                              className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                              title="Naikkan Urutan Prioritas"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === infaqPrograms.length - 1}
                              onClick={() => handleMoveProgram(idx, 'down')}
                              className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                              title="Turunkan Urutan"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            {infaqPrograms.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteProgram(idx)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer ml-1"
                                title="Hapus Program"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-6">
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Program Kebaikan</label>
                            <input
                              type="text"
                              value={prog.title}
                              onChange={(e) => handleUpdateProgramField(idx, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Label Badge</label>
                            <input
                              type="text"
                              value={prog.tag}
                              onChange={(e) => handleUpdateProgramField(idx, 'tag', e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">Ikon</label>
                            <select
                              value={prog.iconName}
                              onChange={(e) => handleUpdateProgramField(idx, 'iconName', e.target.value as any)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            >
                              <option value="Database">Database & Riset Web</option>
                              <option value="Building2">Bangunan / Makam</option>
                              <option value="Droplets">Air / Wudhu</option>
                              <option value="Users">Sosial / Jamaah</option>
                              <option value="BookOpen">Kitab / Al-Qur'an</option>
                              <option value="HeartHandshake">Amal / Infaq</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Program</label>
                          <textarea
                            rows={2}
                            value={prog.desc}
                            onChange={(e) => handleUpdateProgramField(idx, 'desc', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bagian B: Konfigurasi Rekening & QRIS */}
                <form onSubmit={handleSaveInfaqSettings} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Konfigurasi Rekening & Gambar QRIS Resmi</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ubah nomor rekening bank dan URL gambar QRIS statis resmi Anda di sini. Kosongkan URL QRIS jika hanya menggunakan transfer bank manual.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nama Bank</label>
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
                      <label className="block text-xs font-bold text-slate-700 mb-1">Atas Nama</label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-emerald-200 p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-800 text-white mb-1">
                          Payment Gateway QRIS Aktif
                        </span>
                        <label className="block text-xs font-bold text-slate-900">
                          String Barcode Statis QRIS Resmi (Standar EMVCo GPN / Bank Indonesia)
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => setQrisPayload(OFFICIAL_QRIS_STATIC_PAYLOAD)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset ke Barcode Resmi Ziarah Nusantara</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={qrisPayload}
                      onChange={(e) => setQrisPayload(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-1">
                      <div className="md:col-span-6">
                        <QrisPaymentCard
                          qrisPayload={qrisPayload}
                          qrisImageUrl={qrisImageUrl}
                          selectedAmount={25000}
                          compact
                        />
                      </div>
                      <div className="md:col-span-6 space-y-2 text-xs text-slate-600">
                        <p className="font-bold text-slate-900">
                          Pratinjau Langsung Barcode QRIS Statis
                        </p>
                        <p className="leading-relaxed">
                          String EMVCo di atas otomatis dirender menjadi barcode QRIS beresolusi tinggi dengan validasi checksum <strong>CRC-16/CCITT-FALSE (`8587`)</strong> untuk merchant <strong>Ziarah Nusantara, Organis (Bekasi 17415 • NMID: ID1026625971761)</strong>.
                        </p>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Opsional: Override URL Gambar QRIS Kustom (Kosongkan untuk gunakan Generator Barcode Resmi di atas)
                          </label>
                          <input
                            type="url"
                            placeholder="Kosongkan agar menggunakan generator barcode EMVCo otomatis"
                            value={qrisImageUrl}
                            onChange={(e) => setQrisImageUrl(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-700" />
                      <h4 className="font-bold text-slate-900 text-sm">Domain Resmi (`ziarahnusantara.my.id`) &amp; Pengaturan DNS IDCloudHost</h4>
                    </div>
                    <p className="text-xs text-slate-500">
                      Domain utama Anda telah disiapkan ke <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold">ziarahnusantara.my.id</code>. Tag Canonical URL, OpenGraph WhatsApp/Sosial Media, dan Schema.org otomatis menyesuaikan dengan domain ini.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Custom Domain Utama (Tanpa https://)</label>
                        <input
                          type="text"
                          placeholder="ziarahnusantara.my.id"
                          value={customDomain}
                          onChange={(e) => setCustomDomain(e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">URL Canonical & OpenGraph Aktif</span>
                        <span className="text-xs font-bold text-emerald-800 truncate mt-0.5">
                          https://{(customDomain || 'ziarahnusantara.my.id').replace(/^https?:\/\//i, '').replace(/\/+$/, '')}/
                        </span>
                      </div>
                    </div>

                    {/* Panduan Cepat DNS IDCloudHost ke Vercel & Firebase Auth */}
                    <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2.5">
                      <p className="text-xs font-bold text-slate-800">
                        Panduan Pengaturan DNS IDCloudHost (`ziarahnusantara.my.id`) ke Vercel:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">1. Edit A Record (Nama: @)</span>
                            <p className="font-mono text-xs font-bold text-slate-900 mt-1">Nilai: 76.76.21.21 (Proxy: OFF)</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyDnsValue('a-record', '76.76.21.21')}
                            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            {copiedDnsKey === 'a-record' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedDnsKey === 'a-record' ? 'Tersalin' : 'Salin IP'}</span>
                          </button>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">2. Ubah www Jadi CNAME</span>
                            <p className="font-mono text-xs font-bold text-slate-900 mt-1">Nilai: cname.vercel-dns.com (Proxy: OFF)</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyDnsValue('cname-record', 'cname.vercel-dns.com')}
                            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            {copiedDnsKey === 'cname-record' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedDnsKey === 'cname-record' ? 'Tersalin' : 'Salin CNAME'}</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        <strong>Catatan Penting IDCloudHost:</strong> Matikan tombol biru <strong>Proxied</strong> pada baris <code className="bg-slate-100 px-1 rounded">@</code> dan <code className="bg-slate-100 px-1 rounded">www</code>, lalu tambahkan <code className="bg-slate-100 px-1 rounded">{(customDomain || 'ziarahnusantara.my.id').replace(/^https?:\/\//i, '').replace(/\/+$/, '')}</code> di menu <strong>Vercel → Domains</strong> serta <strong>Firebase Console → Authentication → Settings → Authorized domains</strong>.
                      </p>
                    </div>

                    {/* Kartu SEO Google Search Console, Favicon Kubah Emas ZN, AI Overview & Agentic Web */}
                    <div className="bg-emerald-50/60 rounded-xl border border-emerald-200 p-4 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-800 text-white mb-1">
                            SEO 100 • Favicon Kubah Emas ZN • Agentic Web Aktif
                          </span>
                          <h5 className="text-xs font-bold text-slate-900">
                            Status Ikon Profil Google Search, Identitas AI Overview &amp; Penjelajahan Agentic
                          </h5>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <a
                            href="/favicon.svg"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-lg text-[11px] font-bold text-emerald-900 flex items-center gap-1 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 text-emerald-700" />
                            <span>Cek Favicon SVG</span>
                          </a>
                          <a
                            href="/pwa-192x192.png"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-lg text-[11px] font-bold text-emerald-900 flex items-center gap-1 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 text-emerald-700" />
                            <span>Cek PNG 192px</span>
                          </a>
                          <a
                            href="/llms.txt"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-lg text-[11px] font-bold text-emerald-900 flex items-center gap-1 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 text-emerald-700" />
                            <span>Cek llms.txt</span>
                          </a>
                          <a
                            href="/.well-known/ai-catalog.json"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-lg text-[11px] font-bold text-emerald-900 flex items-center gap-1 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 text-emerald-700" />
                            <span>Cek ai-catalog.json</span>
                          </a>
                          <a
                            href="/sitemap.xml"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-lg text-[11px] font-bold text-emerald-900 flex items-center gap-1 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 text-emerald-700" />
                            <span>Cek Sitemap.xml</span>
                          </a>
                          <a
                            href="/sitemap.txt"
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-lg text-[11px] font-bold text-emerald-900 flex items-center gap-1 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 text-emerald-700" />
                            <span>Cek Sitemap.txt</span>
                          </a>
                        </div>
                      </div>

                      {/* Pratinjau Tampilan Hasil Pencarian Google (Google SERP Snippet Preview) */}
                      <div className="bg-slate-950 text-white rounded-xl p-4 border border-slate-800 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                          Pratinjau Tampilan Resmi di Hasil Pencarian Google Mobile
                        </div>
                        <div className="flex items-center gap-2.5">
                          <img
                            src="/pwa-192x192.png"
                            alt="Favicon Kubah Emas ZN"
                            className="w-7 h-7 rounded-full border border-emerald-500/40 shrink-0 bg-emerald-950"
                          />
                          <div className="leading-tight">
                            <div className="text-xs font-semibold text-slate-100">Ziarah Nusantara</div>
                            <div className="text-[11px] text-slate-400">
                              https://{(customDomain || 'ziarahnusantara.my.id').replace(/^https?:\/\//i, '').replace(/\/+$/, '')}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm sm:text-base font-medium text-[#8ab4f8] leading-snug pt-0.5">
                          Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Situs resmi Ziarah Nusantara (ziarahnusantara.my.id) dikelola oleh <strong>Tim Kurator Arsip Ziarah Nusantara</strong>. Direktori makam Wali Songo, ulama Nusantara, peta interaktif, adab ziarah, kumpulan doa tahlil &amp; tawassul...
                        </p>
                      </div>

                      <div className="bg-white rounded-lg border border-emerald-200/80 p-3.5 space-y-3 text-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-500 block">
                              URL Peta Situs Resmi untuk Menu &ldquo;Peta Situs (Sitemaps)&rdquo; di Google Search Console:
                            </span>
                            <code className="font-mono text-xs font-bold text-emerald-900">
                              https://{(customDomain || 'ziarahnusantara.my.id').replace(/^https?:\/\//i, '').replace(/\/+$/, '')}/sitemap.xml
                            </code>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyDnsValue(
                                  'sitemap-url',
                                  `https://${(customDomain || 'ziarahnusantara.my.id').replace(/^https?:\/\//i, '').replace(/\/+$/, '')}/sitemap.xml`
                                )
                              }
                              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                            >
                              {copiedDnsKey === 'sitemap-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedDnsKey === 'sitemap-url' ? 'Sitemap.xml Tersalin' : 'Salin Sitemap.xml'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyDnsValue(
                                  'sitemap-txt-url',
                                  `https://${(customDomain || 'ziarahnusantara.my.id').replace(/^https?:\/\//i, '').replace(/\/+$/, '')}/sitemap.txt`
                                )
                              }
                              className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                            >
                              {copiedDnsKey === 'sitemap-txt-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedDnsKey === 'sitemap-txt-url' ? 'Sitemap.txt Tersalin' : 'Salin Sitemap.txt (Alternatif)'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyDnsValue(
                                  'homepage-url',
                                  `https://${(customDomain || 'ziarahnusantara.my.id').replace(/^https?:\/\//i, '').replace(/\/+$/, '')}/`
                                )
                              }
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                            >
                              {copiedDnsKey === 'homepage-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedDnsKey === 'homepage-url' ? 'URL Utama Tersalin' : 'Salin URL Inspeksi'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200/90 space-y-1.5 text-[11px] text-amber-950 leading-relaxed">
                          <p className="font-bold text-amber-900">
                            Solusi Mengatasi Status &ldquo;Tidak dapat mengambil peta situs&rdquo; di Google Search Console:
                          </p>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>
                              <strong>Hapus entri <code className="bg-white px-1 rounded">https://ziarahnusantara.my.id/</code> dari menu Peta Situs:</strong> URL beranda (<code className="bg-white px-1 rounded">/</code>) adalah halaman HTML, bukan file peta situs, sehingga Google pasti menolaknya dengan status <em>Tidak diketahui / Tidak dapat mengambil peta situs</em>.
                            </li>
                            <li>
                              <strong>Deploy ulang ke Vercel</strong>, lalu pada kolom <strong>Tambahkan peta situs baru</strong> masukkan <code className="bg-white px-1 rounded font-bold">https://ziarahnusantara.my.id/sitemap.xml</code> DAN <code className="bg-white px-1 rounded font-bold">https://ziarahnusantara.my.id/sitemap.txt</code>, lalu klik <strong>KIRIM</strong>.
                            </li>
                            <li>
                              Untuk URL beranda <code className="bg-white px-1 rounded">https://ziarahnusantara.my.id/</code>, masukkan di menu <strong>Inspeksi URL (URL Inspection)</strong> di bagian paling atas halaman Search Console, lalu klik <strong>Minta Pengindeksan</strong>.
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5 mr-1.5" />
                      {isSavingSettings ? 'Menyimpan...' : 'Simpan Seluruh Pengaturan, Domain & Program Infaq'}
                    </button>
                  </div>
                </form>

                {/* Daftar Konfirmasi Infaq & Verifikasi Bukti Transfer */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        Riwayat Konfirmasi Infaq &amp; Verifikasi Bukti Transfer ({donations.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Periksa foto struk bukti transfer pewakif. Jika bukti tidak valid, klik <strong>Cabut &amp; Hapus</strong> untuk mengunci kembali akses secara real-time.
                      </p>
                    </div>
                  </div>
                  {donations.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">Belum ada data konfirmasi infaq di database.</p>
                  ) : (
                    <div className="max-h-[480px] overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100 bg-white">
                      {donations.map((d) => {
                        const hasProof = typeof d.proofImageUrl === 'string' && d.proofImageUrl.startsWith('data:image/');
                        const isVerified = d.status === 'verified';
                        return (
                          <div key={d.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                            <div className="flex items-start gap-3 min-w-0">
                              {hasProof ? (
                                <button
                                  type="button"
                                  onClick={() => setPreviewProofDonation(d)}
                                  className="w-14 h-14 rounded-xl overflow-hidden border-2 border-emerald-300 bg-slate-100 shrink-0 relative group cursor-pointer"
                                  title="Klik untuk memperbesar Bukti Transfer"
                                >
                                  <img
                                    src={d.proofImageUrl}
                                    alt="Bukti Transfer"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                  <span className="absolute inset-x-0 bottom-0 bg-slate-950/70 text-white text-[9px] font-bold text-center py-0.5">
                                    Lihat Struk
                                  </span>
                                </button>
                              ) : (
                                <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px] font-bold text-amber-800 text-center p-1 shrink-0">
                                  Tanpa Struk
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <p className="text-xs font-bold text-slate-900">
                                    {d.donorName}
                                  </p>
                                  <span className="text-xs font-black text-emerald-700">
                                    Rp {Number(d.amount || 0).toLocaleString('id-ID')}
                                  </span>
                                  {d.referenceCode && (
                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                                      #{d.referenceCode}
                                    </span>
                                  )}
                                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                    isVerified
                                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                      : hasProof
                                        ? 'bg-sky-50 text-sky-900 border border-sky-200'
                                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                                  }`}>
                                    {isVerified ? '✓ Bukti Terverifikasi' : hasProof ? 'Bukti Terlampir' : 'Data Lama (Akses Terkunci)'}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 mt-0.5">
                                  <strong>Metode:</strong> {d.paymentMethod || 'Manual'} • <strong>Pengirim:</strong> {d.senderAccount || d.donorName}
                                </p>
                                <p className="text-[11px] text-slate-500">{d.programTitle} • {d.siteName}</p>
                                {d.doaHajat && <p className="text-[11px] text-slate-600 italic mt-0.5">&ldquo;{d.doaHajat}&rdquo;</p>}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              {hasProof && (
                                <button
                                  type="button"
                                  onClick={() => setPreviewProofDonation(d)}
                                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-xl cursor-pointer"
                                >
                                  Cek Bukti
                                </button>
                              )}
                              {!isVerified && hasProof && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyDonation(d.id)}
                                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Verifikasi</span>
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteDonation(d.id)}
                                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                                title="Hapus catatan & cabut akses pembuka kunci"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Cabut</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </motion.div>

      {/* Lightbox Modal Pemeriksaan Bukti Transfer */}
      {previewProofDonation && (
        <div
          className="fixed inset-0 z-[3000] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewProofDonation(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-800 text-emerald-200">
                  Ref: #{previewProofDonation.referenceCode || previewProofDonation.id?.slice(0, 8)}
                </span>
                <h4 className="text-sm sm:text-base font-bold mt-1">
                  Bukti Transfer — {previewProofDonation.donorName}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setPreviewProofDonation(null)}
                className="p-2 text-white/70 hover:text-white rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              <div className="bg-slate-100 rounded-2xl p-2 border border-slate-200 flex items-center justify-center max-h-[52vh] overflow-auto">
                <img
                  src={previewProofDonation.proofImageUrl}
                  alt="Screenshot Bukti Transfer"
                  className="max-w-full max-h-[48vh] object-contain rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Nominal Infaq</span>
                  <span className="font-black text-emerald-800 text-sm">
                    Rp {Number(previewProofDonation.amount || 0).toLocaleString('id-ID')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Metode &amp; Pengirim</span>
                  <span className="font-bold text-slate-900">
                    {previewProofDonation.paymentMethod || 'QRIS'} — {previewProofDonation.senderAccount || previewProofDonation.donorName}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Program &amp; Tujuan</span>
                  <span className="font-semibold text-slate-700">
                    {previewProofDonation.programTitle} ({previewProofDonation.siteName})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleDeleteDonation(previewProofDonation.id)}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Tolak &amp; Cabut Akses</span>
                </button>
                <div className="flex items-center gap-2">
                  {previewProofDonation.status !== 'verified' && (
                    <button
                      type="button"
                      onClick={() => handleVerifyDonation(previewProofDonation.id)}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verifikasi Sah</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setPreviewProofDonation(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
