import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Database, 
  LogIn, 
  ExternalLink, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  Trash2,
  Plus,
  Inbox,
  HeartHandshake,
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
  LogOut,
  Type,
  Download,
  Upload,
  Edit3,
  Scissors,
  BookOpen,
  RefreshCw,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ziarahSites as localSites, ZiarahSite } from '../data/sites';
import { DEFAULT_INFAQ_PROGRAMS, InfaqProgramItem } from './InfaqDigital';
import { DEFAULT_RUBRIK_GATE_SETTINGS, RubrikGateSettings, RubrikItem } from './RubrikKisah';
import { CuratedDoaItem } from './KumpulanDoa';
import { useSites } from '../context/SiteContext';
import { auth, db, googleProvider, handleFirestoreError, OperationType, isUserAdmin, ensureAdminUidRegistered } from '../lib/firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, browserPopupRedirectResolver, User } from 'firebase/auth';
import { OFFICIAL_QRIS_STATIC_PAYLOAD, resolveOfficialQrisPayload } from '../lib/qris';
import { QrisPaymentCard } from '../components/QrisPaymentCard';
import { sanitizePlainText, sanitizeMultilineText, sanitizeHttpUrl } from '../lib/sanitize';
import { ContributionItem, DonationAdminItem, VisitorStoryAdminItem } from './admin/AdminTypes';
import { ContributionQueueSection } from './admin/ContributionQueueSection';
import { SiteDirectoryAdminSection } from './admin/SiteDirectoryAdminSection';
import { DonationVerificationModal } from './admin/DonationVerificationModal';
import { SiteCopyAdminSection } from './admin/SiteCopyAdminSection';
import { DoaWiridAdminSection } from './admin/DoaWiridAdminSection';
import {
  SiteCopyConfig,
  fetchSiteCopyFromCloud,
  saveSiteCopyToCloud,
  getCachedSiteCopy,
} from '../lib/siteCopy';

export function extractCoordinatesFromMapsUrl(url?: string): { lat: number; lng: number } | null {
  if (!url) return null;
  const decoded = decodeURIComponent(url.trim());
  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,
    /[?&](?:q|ll|query|destination)=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
    /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/,
  ];
  for (const regex of patterns) {
    const match = decoded.match(regex);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      if (
        Number.isFinite(lat) &&
        Number.isFinite(lng) &&
        lat >= -11.5 &&
        lat <= 6.5 &&
        lng >= 94.5 &&
        lng <= 141.5
      ) {
        return { lat, lng };
      }
    }
  }
  return null;
}

export const AdminKurator: React.FC = () => {
  const { sites, isSeededInCloud, cloudSiteCount, refreshCloudSites } = useSites();
  const [activeTab, setActiveTab] = useState<'kontribusi' | 'makam' | 'rubrik' | 'doa' | 'teks_ui' | 'infaq'>('kontribusi');
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Contributions & Visitor Stories state
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [visitorStories, setVisitorStories] = useState<VisitorStoryAdminItem[]>([]);
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
  const [pendingContributionIdToApprove, setPendingContributionIdToApprove] = useState<string | null>(null);

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
    id: '',
    title: '',
    siteName: '',
    location: 'Nusantara',
    category: 'Kisah Rahasia',
    content: '',
    source: 'Arsip Kurator Ziarah Nusantara',
    readTime: '3 mnt',
  });
  const [editingRubrikArticleId, setEditingRubrikArticleId] = useState<string | null>(null);
  const [isAddingCustomArticle, setIsAddingCustomArticle] = useState(false);
  const [rubrikSearchQuery, setRubrikSearchQuery] = useState('');
  const [curatedDoas, setCuratedDoas] = useState<CuratedDoaItem[]>([]);
  const [deletedDoaIds, setDeletedDoaIds] = useState<string[]>([]);
  const [isForceSyncing, setIsForceSyncing] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');
  const [donations, setDonations] = useState<any[]>([]);
  const [donationFilter, setDonationFilter] = useState<'all' | 'barokah-doa' | 'rubrik-manuskrip' | 'other'>('all');
  const [previewProofDonation, setPreviewProofDonation] = useState<any | null>(null);
  const [restoredSiteCopy, setRestoredSiteCopy] = useState<SiteCopyConfig | null>(null);
  const [isRestoringBackup, setIsRestoringBackup] = useState(false);

  const donationAnalytics = useMemo(() => {
    const isVerifiedStatus = (d: any) => d.status === 'verified' || d.status === 'confirmed';
    const isPendingStatus = (d: any) => !d.status || d.status === 'pending';

    const barokahDonations = donations.filter((d) => d.programId === 'barokah-doa');
    const rubrikDonations = donations.filter((d) => d.programId === 'rubrik-manuskrip');
    const otherDonations = donations.filter(
      (d) => d.programId !== 'barokah-doa' && d.programId !== 'rubrik-manuskrip'
    );

    const sumAmount = (items: any[]) =>
      items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

    const buildSiteRanking = (items: any[]) => {
      const map = new Map<string, { key: string; siteId: string; siteName: string; count: number; totalAmount: number }>();
      for (const item of items) {
        if (item.status === 'rejected') continue;
        const siteId = String(item.siteId || '').trim();
        const rawSiteName = String(item.siteName || '').trim();
        const fallbackTitle = String(item.programTitle || '')
          .replace(/^(Barokah & Doa Khusus:|Rubrik & Khazanah:)\s*/i, '')
          .trim();
        const siteName = rawSiteName || fallbackTitle || 'Makam / Umum';
        const key = siteId || siteName.toLowerCase();
        const current = map.get(key) || {
          key,
          siteId,
          siteName,
          count: 0,
          totalAmount: 0,
        };
        current.count += 1;
        if (isVerifiedStatus(item)) {
          current.totalAmount += Number(item.amount) || 0;
        }
        map.set(key, current);
      }
      return Array.from(map.values()).sort(
        (a, b) => b.count - a.count || b.totalAmount - a.totalAmount
      );
    };

    const barokahVerified = barokahDonations.filter(isVerifiedStatus);
    const barokahPending = barokahDonations.filter(isPendingStatus);
    const rubrikVerified = rubrikDonations.filter(isVerifiedStatus);
    const rubrikPending = rubrikDonations.filter(isPendingStatus);
    const otherVerified = otherDonations.filter(isVerifiedStatus);
    const otherPending = otherDonations.filter(isPendingStatus);

    return {
      barokah: {
        count: barokahDonations.length,
        verifiedCount: barokahVerified.length,
        total: sumAmount(barokahVerified),
        pendingCount: barokahPending.length,
        pendingTotal: sumAmount(barokahPending),
        ranking: buildSiteRanking(barokahDonations),
      },
      rubrik: {
        count: rubrikDonations.length,
        verifiedCount: rubrikVerified.length,
        total: sumAmount(rubrikVerified),
        pendingCount: rubrikPending.length,
        pendingTotal: sumAmount(rubrikPending),
        ranking: buildSiteRanking(rubrikDonations),
      },
      other: {
        count: otherDonations.length,
        verifiedCount: otherVerified.length,
        total: sumAmount(otherVerified),
        pendingCount: otherPending.length,
        pendingTotal: sumAmount(otherPending),
      },
    };
  }, [donations]);

  const filteredDonations = useMemo(() => {
    if (donationFilter === 'barokah-doa') {
      return donations.filter((d) => d.programId === 'barokah-doa');
    }
    if (donationFilter === 'rubrik-manuskrip') {
      return donations.filter((d) => d.programId === 'rubrik-manuskrip');
    }
    if (donationFilter === 'other') {
      return donations.filter(
        (d) => d.programId !== 'barokah-doa' && d.programId !== 'rubrik-manuskrip'
      );
    }
    return donations;
  }, [donations, donationFilter]);

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
    if (errorCode === 'auth/popup-closed-by-user') {
      return isInIframe
        ? 'Jendela Pop-up Google tertutup sebelum verifikasi selesai (umum terjadi di dalam preview iframe). Silakan klik tombol "Buka di Tab Baru" di bawah agar login Google berjalan lancar, atau coba klik "Masuk via Pop-up Google" kembali.'
        : 'Jendela Pop-up Google tertutup sebelum proses login selesai. Pastikan Anda memilih akun Google hingga jendela menutup otomatis, atau gunakan tombol "Masuk Tanpa Pop-up (Redirect)".';
    }
    if (errorCode === 'auth/cancelled-popup-request') {
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

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (isUserAdmin(currentUser)) {
        setIsAdmin(true);
        setLoginError(null);
        try {
          localStorage.setItem('zn_has_admin_session', '1');
        } catch {}
        await ensureAdminUidRegistered(currentUser);
      } else if (currentUser) {
        const isUidAdmin = await ensureAdminUidRegistered(currentUser);
        setIsAdmin(isUidAdmin);
        if (isUidAdmin) {
          setLoginError(null);
          try {
            localStorage.setItem('zn_has_admin_session', '1');
          } catch {}
        }
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

  // Subscribe to contributions, visitor stories, donations & settings when Admin is logged in
  useEffect(() => {
    if (!isAdmin) return;

    const unsubContrib = onSnapshot(
      collection(db, 'contributions'),
      async (snap) => {
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

        // Hydrate private contributor contacts from /contributions/{id}/private/contact for Admin view
        const withContacts = await Promise.all(
          list.map(async (item) => {
            if (item.contributorContact) return item;
            try {
              const privSnap = await getDoc(doc(db, 'contributions', item.id, 'private', 'contact'));
              if (privSnap.exists()) {
                const privData = privSnap.data();
                if (privData?.contributorContact) {
                  return { ...item, contributorContact: String(privData.contributorContact) };
                }
              }
            } catch {}
            return item;
          })
        );
        setContributions(withContacts);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'contributions')
    );

    const unsubStories = onSnapshot(
      collection(db, 'stories'),
      (snap) => {
        const list: VisitorStoryAdminItem[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            siteId: data.siteId || '',
            authorName: data.authorName || 'Hamba Allah',
            authorUid: data.authorUid || '',
            text: data.text || '',
            status: data.status || 'approved',
            createdAtMs: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
          };
        });
        list.sort((a, b) => b.createdAtMs - a.createdAtMs);
        setVisitorStories(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'stories')
    );

    const unsubDonations = onSnapshot(
      collection(db, 'donations'),
      (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setDonations(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'donations')
    );

    getDoc(doc(db, 'settings', 'infaq'))
      .then((snap) => {
        if (snap.exists()) {
          const d = snap.data();
          if (d.bankName) setBankName(d.bankName);
          if (d.accountNumber) setAccountNumber(d.accountNumber);
          if (d.accountHolder) setAccountHolder(d.accountHolder);
          if (d.qrisImageUrl !== undefined) setQrisImageUrl(d.qrisImageUrl);
          if (d.qrisPayload) setQrisPayload(resolveOfficialQrisPayload(d.qrisPayload));
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
              deletedArticleIds: Array.isArray(d.rubrikGate.deletedArticleIds) ? d.rubrikGate.deletedArticleIds : [],
              requireManualVerification: Boolean(d.rubrikGate.requireManualVerification),
            });
          }
          if (Array.isArray(d.curatedDoas)) {
            setCuratedDoas(d.curatedDoas);
          }
          if (Array.isArray(d.deletedDoaIds)) {
            setDeletedDoaIds(d.deletedDoaIds);
          }
        }
      })
      .catch(() => {});

    return () => {
      unsubContrib();
      unsubStories();
      unsubDonations();
    };
  }, [isAdmin]);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
    } catch (error: any) {
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
      await signInWithRedirect(auth, googleProvider, browserPopupRedirectResolver);
    } catch (error: any) {
      const msg = formatLoginError(error);
      if (msg) setLoginError(msg);
      setIsLoggingIn(false);
    }
  };

  const handleSwitchAccount = async () => {
    try {
      try {
        localStorage.removeItem('zn_has_admin_session');
      } catch {}
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
        await setDoc(doc(db, 'sites', site.id), { ...site, isDeleted: false }, { merge: true });
      }
      try {
        localStorage.setItem('zn_admin_dirty_ts', String(Date.now()));
      } catch {}
      await refreshCloudSites(true);
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
      // Usulan makam baru ('baru') TIDAK pernah diterbitkan otomatis dengan koordinat default -6.95, 110.42.
      // Wajib melewati pratinjau Form Editor Makam + cek duplikasi ID + verifikasi koordinat oleh kurator.
      if (item.type === 'baru') {
        const baseSlug =
          item.targetName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 50) || `makam-${Date.now()}`;

        let candidateId = baseSlug;
        if (sites.some((s) => s.id.toLowerCase() === candidateId)) {
          candidateId = `${baseSlug}-${item.id.slice(0, 5).toLowerCase()}`;
        }

        const extractedCoords = extractCoordinatesFromMapsUrl(item.mapsUrl);
        setEditingSite({
          id: candidateId,
          name: item.targetName,
          title: item.targetName.startsWith('Makam') ? item.targetName : `Makam ${item.targetName}`,
          category: (item.category as any) || 'Ulama Nusantara',
          description: item.content.slice(0, 220),
          history: item.content,
          historySourceType: 'tradisi_lisan',
          karomahSourceType: 'tradisi_lisan',
          imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
          openingHours: 'Buka 24 Jam',
          facilities: ['Masjid / Musholla', 'Tempat Wudhu', 'Area Parkir'],
          location: {
            lat: extractedCoords ? extractedCoords.lat : 0,
            lng: extractedCoords ? extractedCoords.lng : 0,
            address: item.mapsUrl || `${item.city || 'Nusantara'}`,
            city: item.city || 'Nusantara',
            province: item.province || 'Indonesia',
          },
          karomah: [],
          doaKhusus: [],
        });
        setPendingContributionIdToApprove(item.id);
        setActiveTab('makam');
        setIsSiteFormOpen(true);
        setSiteStatusMsg(
          extractedCoords
            ? `Pratinjau Usulan Makam Baru "${item.targetName}" dibuka (ID: ${candidateId}). Koordinat (${extractedCoords.lat}, ${extractedCoords.lng}) berhasil diekstrak dari tautan Maps. Silakan periksa data lalu klik "Simpan Seluruh Data Makam ke Firestore" untuk menerbitkan secara atomik.`
            : `Pratinjau Usulan Makam Baru "${item.targetName}" dibuka (ID: ${candidateId}). Tautan Maps belum memuat koordinat presisi — mohon isi Latitude & Longitude yang valid sebelum mengeklik "Simpan Seluruh Data Makam ke Firestore".`
        );
        return;
      }

      await updateDoc(doc(db, 'contributions', item.id), {
        status: 'approved',
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `contributions/${item.id}`);
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
      handleFirestoreError(error, OperationType.UPDATE, `contributions/${item.id}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteContribution = async (id: string) => {
    if (!isAdmin || processingId) return;
    setProcessingId(id);
    try {
      try {
        await deleteDoc(doc(db, 'contributions', id, 'private', 'contact'));
      } catch {}
      await deleteDoc(doc(db, 'contributions', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `contributions/${id}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleApproveVisitorStory = async (story: VisitorStoryAdminItem) => {
    if (!isAdmin || processingId) return;
    setProcessingId(story.id);
    try {
      await updateDoc(doc(db, 'stories', story.id), {
        siteId: story.siteId,
        authorName: story.authorName,
        text: story.text,
        status: 'approved',
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `stories/${story.id}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteVisitorStory = async (id: string) => {
    if (!isAdmin || processingId) return;
    setProcessingId(id);
    try {
      await deleteDoc(doc(db, 'stories', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `stories/${id}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleSaveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || isSavingSite) return;

    const rawLat = Number(editingSite.location?.lat);
    const rawLng = Number(editingSite.location?.lng);
    const isPlaceholderCoord =
      !Number.isFinite(rawLat) ||
      !Number.isFinite(rawLng) ||
      (rawLat === 0 && rawLng === 0) ||
      (Math.abs(rawLat - -6.95) < 0.0001 && Math.abs(rawLng - 110.42) < 0.0001);
    const isWithinIndonesiaBounds =
      rawLat >= -11.5 && rawLat <= 6.5 && rawLng >= 94.5 && rawLng <= 141.5;

    if (isPlaceholderCoord || !isWithinIndonesiaBounds) {
      setSiteStatusMsg(
        'Gagal menyimpan: Koordinat Latitude & Longitude wajib diisi dengan titik lokasi makam yang valid di wilayah Indonesia (bukan koordinat placeholder 0, 0 atau -6.95, 110.42).'
      );
      return;
    }

    setIsSavingSite(true);
    setSiteStatusMsg('');

    const cleanName = sanitizePlainText(editingSite.name, 160) || 'Tokoh Ulama';
    const canonicalSiteId = (
      editingSite.id?.trim() ||
      cleanName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') ||
      `site-${Date.now()}`
    ).slice(0, 80);
    const cleanImageUrl =
      sanitizeHttpUrl(editingSite.imageUrl, 1000) ||
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80';
    const cleanDesc = sanitizeMultilineText(editingSite.description, 1500);
    const cleanHistory = sanitizeMultilineText(editingSite.history, 8000) || cleanDesc;

    const cleanDoaKhusus = (editingSite.doaKhusus || [])
      .map((d) => ({
        title: sanitizePlainText(d.title, 160),
        text: sanitizeMultilineText(d.text, 2500),
        ...(d.latin ? { latin: sanitizeMultilineText(d.latin, 2500) } : {}),
        translation: sanitizeMultilineText(d.translation || '', 2500),
      }))
      .filter((d) => Boolean(d.title || d.text));

    const payload: ZiarahSite = {
      id: canonicalSiteId,
      name: cleanName,
      title: sanitizePlainText(editingSite.title, 200) || `Makam ${cleanName}`,
      category: (editingSite.category as any) || 'Ulama Nusantara',
      era: sanitizePlainText(editingSite.era, 160),
      sanad: sanitizeMultilineText(editingSite.sanad, 3000),
      description: cleanDesc,
      history: cleanHistory,
      historySourceType: editingSite.historySourceType || 'catatan_sejarah',
      imageUrl: cleanImageUrl,
      imageSource: sanitizePlainText(editingSite.imageSource, 400),
      openingHours: sanitizePlainText(editingSite.openingHours, 120) || 'Buka 24 Jam',
      facilities: (editingSite.facilities || ['Masjid / Musholla', 'Area Parkir']).map((f) => sanitizePlainText(f, 80)).filter(Boolean),
      location: {
        lat: rawLat,
        lng: rawLng,
        address: sanitizePlainText(editingSite.location?.address, 400),
        city: sanitizePlainText(editingSite.location?.city, 120),
        province: sanitizePlainText(editingSite.location?.province, 120),
      },
      karomah: (editingSite.karomah || []).map((k) => sanitizeMultilineText(k, 3000)).filter(Boolean),
      karomahSourceType: editingSite.karomahSourceType || 'tradisi_lisan',
      barokahHajat: sanitizeMultilineText(
        Array.isArray(editingSite.barokahHajat)
          ? editingSite.barokahHajat.join(' • ')
          : editingSite.barokahHajat,
        2000
      ),
      doaKhusus: cleanDoaKhusus,
      untoldStory: sanitizeMultilineText(editingSite.untoldStory, 6000),
      haulSchedule: sanitizePlainText(editingSite.haulSchedule, 240),
      localAdab: sanitizeMultilineText(
        Array.isArray(editingSite.localAdab)
          ? editingSite.localAdab.join(' • ')
          : editingSite.localAdab,
        2000
      ),
      karya: (editingSite.karya || []).map((k) => sanitizePlainText(k, 240)).filter(Boolean),
      references: (editingSite.references || []).map((r) => sanitizePlainText(r, 400)).filter(Boolean),
      isDeleted: false,
      updatedAt: new Date().toISOString(),
    };

    try {
      const batch = writeBatch(db);
      batch.set(doc(db, 'sites', canonicalSiteId), payload, { merge: true });
      if (pendingContributionIdToApprove) {
        batch.update(doc(db, 'contributions', pendingContributionIdToApprove), {
          status: 'approved',
        });
      }
      await batch.commit();
      setPendingContributionIdToApprove(null);
      try {
        localStorage.removeItem('zn_cloud_sites_cache_v1');
        localStorage.setItem('zn_admin_dirty_ts', String(Date.now()));
      } catch {
        // Ignore storage error
      }
      await refreshCloudSites(true);
      setSiteStatusMsg(`Berhasil menyimpan data "${payload.name}" ke Firestore.`);
      setIsSiteFormOpen(false);
    } catch (error: any) {
      setSiteStatusMsg(`Gagal menyimpan: ${error.message}`);
      try {
        handleFirestoreError(error, OperationType.WRITE, `sites/${canonicalSiteId}`);
      } catch {}
    } finally {
      setIsSavingSite(false);
    }
  };

  const handleDeleteSite = async (siteId: string) => {
    if (!isAdmin) return;
    try {
      await setDoc(
        doc(db, 'sites', siteId),
        { id: siteId, isDeleted: true, updatedAt: new Date().toISOString() },
        { merge: true }
      );
      try {
        localStorage.removeItem('zn_cloud_sites_cache_v1');
        localStorage.setItem('zn_admin_dirty_ts', String(Date.now()));
      } catch {
        // Ignore storage error
      }
      await refreshCloudSites(true);
      setSiteStatusMsg(`Data makam (${siteId}) telah dinonaktifkan (soft-delete tombstone) di Cloud Firestore.`);
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

  const handleSaveInfaqSettings = async (
    e?: React.FormEvent,
    overrideRubrikGate?: RubrikGateSettings,
    overrideCuratedDoas?: CuratedDoaItem[],
    overrideDeletedDoaIds?: string[]
  ) => {
    if (e) e.preventDefault();
    if (!isAdmin || isSavingSettings) return;
    setIsSavingSettings(true);
    setSettingsMsg('');
    const cleanedDomain = (customDomain.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '') || 'ziarahnusantara.my.id').slice(0, 120);
    const activeRubrikGate = overrideRubrikGate || rubrikGate;
    const activeCuratedDoas = overrideCuratedDoas || curatedDoas;
    const activeDeletedDoaIds = overrideDeletedDoaIds || deletedDoaIds;

    const payload = {
      bankName: bankName.trim().slice(0, 100),
      accountNumber: accountNumber.trim().slice(0, 60),
      accountHolder: accountHolder.trim().slice(0, 120),
      qrisImageUrl: qrisImageUrl.trim().slice(0, 1000),
      qrisPayload: (qrisPayload.trim() || OFFICIAL_QRIS_STATIC_PAYLOAD).slice(0, 1000),
      customDomain: cleanedDomain,
      programs: infaqPrograms,
      rubrikGate: activeRubrikGate,
      curatedDoas: activeCuratedDoas,
      deletedDoaIds: activeDeletedDoaIds,
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
      setSettingsMsg('Berhasil menyimpan seluruh pengaturan Rubrik, Doa & Wirid, Program Kebaikan, Rekening/QRIS, dan Custom Domain ke Firestore.');
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

  const handleSaveDoaSettings = async (
    nextCuratedDoas?: CuratedDoaItem[],
    nextDeletedDoaIds?: string[]
  ) => {
    await handleSaveInfaqSettings(
      undefined,
      rubrikGate,
      nextCuratedDoas ?? curatedDoas,
      nextDeletedDoaIds ?? deletedDoaIds
    );
  };

  const handleForceSyncAndClearCache = async () => {
    if (!isAdmin || isForceSyncing) return;
    setIsForceSyncing(true);
    setSettingsMsg('Membersihkan cache browser & menyinkronkan ulang data terbaru dari Cloud Firestore...');
    try {
      try {
        localStorage.removeItem('zn_cloud_sites_cache_v1');
        localStorage.removeItem('zn_site_copy_cache_v1');
        localStorage.removeItem('ziarah_local_settings_cache');
      } catch {}

      const [, latestCopy, infaqSnap] = await Promise.all([
        refreshCloudSites(true),
        fetchSiteCopyFromCloud(),
        getDoc(doc(db, 'settings', 'infaq')),
      ]);

      setRestoredSiteCopy(latestCopy);

      if (infaqSnap.exists()) {
        const d = infaqSnap.data();
        if (d.bankName) setBankName(d.bankName);
        if (d.accountNumber) setAccountNumber(d.accountNumber);
        if (d.accountHolder) setAccountHolder(d.accountHolder);
        if (d.qrisImageUrl !== undefined) setQrisImageUrl(d.qrisImageUrl);
        if (d.qrisPayload) setQrisPayload(resolveOfficialQrisPayload(d.qrisPayload));
        if (d.customDomain !== undefined) setCustomDomain(d.customDomain);
        if (Array.isArray(d.programs) && d.programs.length > 0) setInfaqPrograms(d.programs);
        if (Array.isArray(d.curatedDoas)) setCuratedDoas(d.curatedDoas);
        if (Array.isArray(d.deletedDoaIds)) setDeletedDoaIds(d.deletedDoaIds);
        if (d.rubrikGate) {
          setRubrikGate({
            lockEnabled: d.rubrikGate.lockEnabled !== undefined ? Boolean(d.rubrikGate.lockEnabled) : DEFAULT_RUBRIK_GATE_SETTINGS.lockEnabled,
            freeSampleCount: typeof d.rubrikGate.freeSampleCount === 'number' ? d.rubrikGate.freeSampleCount : DEFAULT_RUBRIK_GATE_SETTINGS.freeSampleCount,
            minDonationAmount: typeof d.rubrikGate.minDonationAmount === 'number' ? d.rubrikGate.minDonationAmount : DEFAULT_RUBRIK_GATE_SETTINGS.minDonationAmount,
            bannerTitle: d.rubrikGate.bannerTitle || DEFAULT_RUBRIK_GATE_SETTINGS.bannerTitle,
            bannerDescription: d.rubrikGate.bannerDescription || DEFAULT_RUBRIK_GATE_SETTINGS.bannerDescription,
            pinnedFreeArticleIds: Array.isArray(d.rubrikGate.pinnedFreeArticleIds) ? d.rubrikGate.pinnedFreeArticleIds : DEFAULT_RUBRIK_GATE_SETTINGS.pinnedFreeArticleIds,
            customArticles: Array.isArray(d.rubrikGate.customArticles) ? d.rubrikGate.customArticles : [],
            deletedArticleIds: Array.isArray(d.rubrikGate.deletedArticleIds) ? d.rubrikGate.deletedArticleIds : [],
            requireManualVerification: Boolean(d.rubrikGate.requireManualVerification),
          });
        }
      }

      setSettingsMsg(
        'Seluruh cache browser (zn_cloud_sites_cache_v1 & zn_site_copy_cache_v1) berhasil dibersihkan dan data terbaru dari Cloud Firestore telah disinkronkan!'
      );
    } catch (err: any) {
      setSettingsMsg('Gagal menyinkronkan ulang: ' + (err?.message || 'Error'));
    } finally {
      setIsForceSyncing(false);
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
        desc: 'Tuliskan deskripsi program dukungan khazanah & infaq literasi arsip di sini...',
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
      const nextGate: RubrikGateSettings = {
        ...prev,
        pinnedFreeArticleIds: exists
          ? prev.pinnedFreeArticleIds.filter((id) => id !== articleId)
          : [...prev.pinnedFreeArticleIds, articleId],
      };
      void handleSaveInfaqSettings(undefined, nextGate);
      return nextGate;
    });
  };

  const getDefaultBuiltInRubrikArticles = (): RubrikItem[] => {
    const list: RubrikItem[] = [
      {
        id: 'rubrik-wali-songo-strategy',
        siteId: 'wali-7',
        siteName: 'Sunan Kalijaga (Raden Sahid)',
        location: 'Demak, Jawa Tengah',
        category: 'Manuskrip',
        title: 'Filosofi Gamelan & Tembang Lir-Ilir dalam Dakwah Kultural',
        content:
          'Pendekatan dakwah Sunan Kalijaga memadukan kearifan lokal Jawa dengan tauhid Islam. Melalui wayang kulit purwa dan tembang Ilir-Ilir, makna kebangkitan spiritual diajarkan secara metaforik tanpa konfrontasi fisik.<!--more--> Catatan serat kuno mencatat bagaimana beliau mendesain tata kota keraton dengan alun-alun, pohon beringin kembar, dan masjid agung sebagai simbol keterhubungan duniawi dan ukhrawi.',
        source: 'Katalog Serat Centhini & Naskah Babad Demak',
        readTime: '4 mnt',
      },
      {
        id: 'rubrik-sekumpul-adab',
        siteId: 'ulama-3',
        siteName: 'KH. Muhammad Zaini Abdul Ghani (Abah Guru Sekumpul)',
        location: 'Martapura, Kalimantan Selatan',
        category: 'Hikmah & Karomah',
        title: 'Adab Menghadiri Majelis Maulid & Keberkahan Jamuan Musafir',
        content:
          'Abah Guru Sekumpul sangat memuliakan tamu dan penuntut ilmu. Selama haul dan majelis mingguan, ribuan dapur umum warga di Martapura menyajikan makanan gratis bagi siapa saja tanpa memandang status sosial.<!--more--> Tradisi luhur ini terus berlanjut hingga kini, membuktikan buah tarbiyah akhlak yang meresap ke dalam sanubari masyarakat Banjar.',
        source: 'Manuskrip Biografi & Kesaksian Para Habaib Martapura',
        readTime: '3 mnt',
      },
    ];

    sites.forEach((s) => {
      if (s.untoldStory) {
        list.push({
          id: `rubrik-${s.id}-untold`,
          siteId: s.id,
          siteName: s.name,
          location: `${s.location.city}, ${s.location.province}`,
          category: 'Kisah Rahasia',
          title: `Catatan Khusus: ${s.name}`,
          content: s.untoldStory,
          source: 'Manuskrip Lisan & Catatan Pengasuh Makam',
          readTime: '3 mnt',
        });
      }
      if (Array.isArray(s.karomah) && s.karomah.length > 0) {
        s.karomah.forEach((k, idx) => {
          list.push({
            id: `rubrik-${s.id}-karomah-${idx}`,
            siteId: s.id,
            siteName: s.name,
            location: `${s.location.city}, ${s.location.province}`,
            category: 'Hikmah & Karomah',
            title: `Karomah & Jejak Dakwah: ${s.name} (Bagian ${idx + 1})`,
            content: k,
            source: 'Babad & Riwayat Tradisi Nusantara',
            readTime: '2 mnt',
          });
        });
      }
    });

    return list;
  };

  const handleLoadBuiltInRubrikArticlesToEditor = async () => {
    const builtIns = getDefaultBuiltInRubrikArticles();
    const existingIds = new Set((rubrikGate.customArticles || []).map((a) => a.id));
    const newClones = builtIns.filter((b) => !existingIds.has(b.id));
    const nextGate: RubrikGateSettings = {
      ...rubrikGate,
      customArticles: [...(rubrikGate.customArticles || []), ...newClones],
    };
    setRubrikGate(nextGate);
    await handleSaveInfaqSettings(undefined, nextGate);
    setSettingsMsg(
      `Seluruh ${builtIns.length} artikel bawaan telah dimuat ke daftar editor kustom dan disimpan ke Firestore! Anda kini dapat mengedit atau menghapus artikel mana pun.`
    );
  };

  const handleSelectEditRubrikArticle = (art: RubrikItem) => {
    setEditingRubrikArticleId(art.id);
    setNewCustomArticle({
      id: art.id,
      siteId: art.siteId || 'wali-7',
      title: art.title,
      siteName: art.siteName,
      location: art.location || 'Nusantara',
      category: art.category || 'Kisah Rahasia',
      content: art.content || '',
      source: art.source || 'Arsip Kurator Ziarah Nusantara',
      readTime: art.readTime || '3 mnt',
    });
    setIsAddingCustomArticle(true);
  };

  const handleAddCustomRubrikArticle = async () => {
    if (!newCustomArticle.title?.trim() || !newCustomArticle.content?.trim()) return;
    const targetId = editingRubrikArticleId || newCustomArticle.id?.trim() || `rubrik-custom-${Date.now()}`;
    const item: RubrikItem = {
      id: targetId,
      siteId: newCustomArticle.siteId || 'wali-7',
      siteName: sanitizePlainText(newCustomArticle.siteName, 140) || 'Aulia Nusantara',
      location: sanitizePlainText(newCustomArticle.location, 140) || 'Nusantara',
      category: (newCustomArticle.category as any) || 'Kisah Rahasia',
      title: sanitizePlainText(newCustomArticle.title, 200),
      content: sanitizeMultilineText(newCustomArticle.content, 6000),
      source: sanitizePlainText(newCustomArticle.source, 200) || 'Arsip Kurator Ziarah Nusantara',
      readTime: sanitizePlainText(newCustomArticle.readTime, 40) || '3 mnt',
    };
    const existingList = rubrikGate.customArticles || [];
    const existsIdx = existingList.findIndex((a) => a.id === targetId);
    let nextList: RubrikItem[];
    if (existsIdx >= 0) {
      nextList = [...existingList];
      nextList[existsIdx] = item;
    } else {
      nextList = [item, ...existingList];
    }
    const nextDeleted = (rubrikGate.deletedArticleIds || []).filter((id) => id !== targetId);
    const nextGate: RubrikGateSettings = {
      ...rubrikGate,
      customArticles: nextList,
      deletedArticleIds: nextDeleted,
    };
    setRubrikGate(nextGate);
    setNewCustomArticle({
      id: '',
      title: '',
      siteName: '',
      location: 'Nusantara',
      category: 'Kisah Rahasia',
      content: '',
      source: 'Arsip Kurator Ziarah Nusantara',
      readTime: '3 mnt',
    });
    setEditingRubrikArticleId(null);
    setIsAddingCustomArticle(false);
    await handleSaveInfaqSettings(undefined, nextGate);
    setSettingsMsg(
      `Artikel "${item.title}" berhasil disimpan ke Firestore (settings/infaq) dan langsung diperbarui di halaman /rubrik!`
    );
  };

  const handleDeleteCustomRubrikArticle = async (id: string) => {
    const builtIns = getDefaultBuiltInRubrikArticles();
    const isBuiltIn = builtIns.some((b) => b.id === id);
    const currentDeleted = rubrikGate.deletedArticleIds || [];
    const isAlreadyDeleted = currentDeleted.includes(id);

    let nextDeleted: string[];
    let nextCustom = (rubrikGate.customArticles || []).filter((a) => a.id !== id);
    if (isAlreadyDeleted) {
      nextDeleted = currentDeleted.filter((did) => did !== id);
    } else if (isBuiltIn) {
      nextDeleted = Array.from(new Set([...currentDeleted, id]));
    } else {
      nextDeleted = currentDeleted;
    }

    const nextGate: RubrikGateSettings = {
      ...rubrikGate,
      customArticles: nextCustom,
      deletedArticleIds: nextDeleted,
      pinnedFreeArticleIds: rubrikGate.pinnedFreeArticleIds.filter((pid) => pid !== id),
    };
    setRubrikGate(nextGate);
    await handleSaveInfaqSettings(undefined, nextGate);
  };

  const handleExportFullBackupJson = async () => {
    try {
      const latestCopy = await fetchSiteCopyFromCloud().catch(() => getCachedSiteCopy());
      const backupPayload = {
        exportedAt: new Date().toISOString(),
        version: 'zn-cms-backup-v2',
        infaqSettings: {
          bankName,
          accountNumber,
          accountHolder,
          qrisImageUrl,
          qrisPayload,
          customDomain,
          programs: infaqPrograms,
          rubrikGate,
          curatedDoas,
          deletedDoaIds,
        },
        siteCopy: latestCopy,
        sites,
      };
      const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ziarah-nusantara-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSettingsMsg('Berhasil mengunduh file Backup Konfigurasi (.json) lengkap!');
    } catch (err: any) {
      setSettingsMsg('Gagal mengekspor backup: ' + (err?.message || 'Error'));
    }
  };

  const handleImportFullBackupJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;
    setIsRestoringBackup(true);
    setSettingsMsg('Memulihkan data konfigurasi dari file JSON...');
    try {
      const rawText = await file.text();
      const parsed = JSON.parse(rawText);

      if (parsed.infaqSettings && typeof parsed.infaqSettings === 'object') {
        const inf = parsed.infaqSettings;
        if (inf.bankName) setBankName(inf.bankName);
        if (inf.accountNumber) setAccountNumber(inf.accountNumber);
        if (inf.accountHolder) setAccountHolder(inf.accountHolder);
        if (inf.qrisImageUrl !== undefined) setQrisImageUrl(inf.qrisImageUrl);
        if (inf.qrisPayload) setQrisPayload(inf.qrisPayload);
        if (inf.customDomain) setCustomDomain(inf.customDomain);
        if (Array.isArray(inf.programs)) setInfaqPrograms(inf.programs);
        if (inf.rubrikGate) setRubrikGate(inf.rubrikGate);
        if (Array.isArray(inf.curatedDoas)) setCuratedDoas(inf.curatedDoas);
        if (Array.isArray(inf.deletedDoaIds)) setDeletedDoaIds(inf.deletedDoaIds);

        await setDoc(
          doc(db, 'settings', 'infaq'),
          {
            ...inf,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }

      if (parsed.siteCopy && typeof parsed.siteCopy === 'object') {
        const savedCopy = await saveSiteCopyToCloud(parsed.siteCopy);
        setRestoredSiteCopy(savedCopy);
      }

      if (Array.isArray(parsed.sites) && parsed.sites.length > 0) {
        for (const s of parsed.sites) {
          if (s && s.id) {
            await setDoc(doc(db, 'sites', s.id), s, { merge: true });
          }
        }
        await refreshCloudSites(true);
      }

      setSettingsMsg(
        'Alhamdulillah, seluruh konfigurasi (Infaq, Rubrik, Teks UI, dan Direktori Makam) berhasil dipulihkan ke Cloud Firestore!'
      );
    } catch (err: any) {
      setSettingsMsg('Gagal mengimpor file JSON: Pastikan format file backup valid (' + (err?.message || '') + ').');
    } finally {
      setIsRestoringBackup(false);
      e.target.value = '';
    }
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
      handleFirestoreError(error, OperationType.UPDATE, `donations/${id}`);
    }
  };

  const handleDeleteDonation = async (id: string) => {
    if (!isAdmin) return;
    try {
      try {
        await deleteDoc(doc(db, 'donations', id, 'private', 'proof'));
      } catch {}
      await deleteDoc(doc(db, 'donations', id));
      if (previewProofDonation?.id === id) {
        setPreviewProofDonation(null);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `donations/${id}`);
    }
  };

  const pendingCount =
    contributions.filter((c) => c.status === 'pending').length +
    visitorStories.filter((s) => s.status === 'pending').length;

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
                Rubrik &amp; Khazanah
              </button>
              <button
                onClick={() => setActiveTab('doa')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'doa' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                Doa &amp; Wirid (/doa)
              </button>
              <button
                onClick={() => setActiveTab('teks_ui')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'teks_ui' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Type className="w-3.5 h-3.5 mr-1.5" />
                Teks &amp; Pengaturan UI
              </button>
              <button
                onClick={() => setActiveTab('infaq')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center cursor-pointer ${
                  activeTab === 'infaq' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 mr-1.5" />
                Donasi &amp; Domain
              </button>
            </div>
          )}
        </div>

        {isAdmin && (
          <div className="mb-6 pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Pusat Kendali Penuh (Full Headless CMS) — Seluruh perubahan langsung tersimpan di Cloud Firestore.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleForceSyncAndClearCache}
                disabled={isForceSyncing}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isForceSyncing ? 'animate-spin' : ''}`} />
                <span>
                  {isForceSyncing
                    ? 'Menyinkronkan...'
                    : 'Bersihkan Cache & Sinkronkan Ulang Sekarang'}
                </span>
              </button>
              <button
                type="button"
                onClick={handleExportFullBackupJson}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-800" />
                <span>Unduh Backup Konfigurasi (.json)</span>
              </button>
              <label className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-emerald-800" />
                <span>{isRestoringBackup ? 'Memulihkan...' : 'Impor / Restore Konfigurasi (.json)'}</span>
                <input
                  type="file"
                  accept="application/json,.json"
                  onChange={handleImportFullBackupJson}
                  disabled={isRestoringBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

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
                  <button
                    disabled={isLoggingIn}
                    onClick={handleLogin}
                    className="py-2.5 px-5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        <span>Memverifikasi...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-3.5 h-3.5 mr-2" />
                        <span>Masuk via Pop-up Google</span>
                      </>
                    )}
                  </button>

                  {!isInIframe && (
                    <button
                      disabled={isLoggingIn}
                      onClick={handleRedirectLogin}
                      className="py-2.5 px-5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-bold rounded-xl flex items-center transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5 mr-2 text-emerald-800" />
                      <span>Masuk Tanpa Pop-up (Redirect)</span>
                    </button>
                  )}

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
            {/* TAB 1: ANTREAN KONTRIBUSI KOMUNITAS & MODERASI CERITA */}
            {activeTab === 'kontribusi' && (
              <ContributionQueueSection
                contributions={contributions}
                visitorStories={visitorStories}
                processingId={processingId}
                onApprove={handleApproveContribution}
                onReject={handleRejectContribution}
                onDelete={handleDeleteContribution}
                onApproveStory={handleApproveVisitorStory}
                onDeleteStory={handleDeleteVisitorStory}
              />
            )}

            {/* TAB 2: MANAJEMEN DIREKTORI MAKAM */}
            {activeTab === 'makam' && (
              <SiteDirectoryAdminSection
                sites={sites}
                localSitesCount={localSites.length}
                isSeededInCloud={isSeededInCloud}
                cloudSiteCount={cloudSiteCount}
                isSeeding={isSeeding}
                seedMessage={seedMessage}
                isSiteFormOpen={isSiteFormOpen}
                editingSite={editingSite}
                isSavingSite={isSavingSite}
                siteStatusMsg={siteStatusMsg}
                onSeedDatabase={handleSeedDatabase}
                onToggleNewSiteForm={() => {
                  setEditingSite({
                    id: '',
                    name: '',
                    title: '',
                    category: 'Ulama Nusantara',
                    era: 'Abad ke-19 – 20 M',
                    sanad: '',
                    description: '',
                    history: '',
                    untoldStory: '',
                    haulSchedule: '',
                    localAdab: '',
                    karomah: [],
                    doaKhusus: [],
                    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
                    openingHours: 'Buka 24 Jam',
                    facilities: ['Masjid / Musholla', 'Area Parkir', 'Tempat Wudhu'],
                    location: { lat: -6.9, lng: 110.4, address: '', city: '', province: '' },
                  });
                  setIsSiteFormOpen(!isSiteFormOpen);
                }}
                onChangeEditingSite={setEditingSite}
                onSaveSite={handleSaveSite}
                onCancelSiteForm={() => setIsSiteFormOpen(false)}
                onSelectEditSite={(s) => {
                  setEditingSite({
                    ...s,
                    era: s.era || '',
                    sanad: s.sanad || '',
                    barokahHajat: Array.isArray(s.barokahHajat)
                      ? s.barokahHajat.join(' • ')
                      : s.barokahHajat || '',
                    untoldStory: s.untoldStory || '',
                    haulSchedule: s.haulSchedule || '',
                    localAdab: Array.isArray(s.localAdab)
                      ? s.localAdab.join(' • ')
                      : s.localAdab || '',
                    imageSource: s.imageSource || '',
                    karomah: Array.isArray(s.karomah) ? [...s.karomah] : [],
                    doaKhusus: Array.isArray(s.doaKhusus) ? s.doaKhusus.map((d) => ({ ...d })) : [],
                    facilities: Array.isArray(s.facilities) ? [...s.facilities] : [],
                    karya: Array.isArray(s.karya) ? [...s.karya] : [],
                    references: Array.isArray(s.references) ? [...s.references] : [],
                  });
                  setIsSiteFormOpen(true);
                }}
                onDeleteSite={handleDeleteSite}
              />
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
                        {rubrikGate.lockEnabled ? 'Kunci Donasi & Bukti Transfer Aktif' : 'Semua Terbuka Gratis'}
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
                        Nominal Rekomendasi Donasi Pembuka Arsip (Rp)
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

                  {/* Tambah / Edit Tulisan Rubrik & Pilihan Contoh Gratis */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          Editor Penuh Artikel Rubrik (Kustom &amp; Bawaan)
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Edit judul, isi naskah, titik potong gembok <code className="bg-slate-200/70 px-1 rounded">&lt;!--more--&gt;</code>, atau tandai tulisan sebagai contoh gratis.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleLoadBuiltInRubrikArticlesToEditor}
                          className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Muat &amp; Edit Seluruh Artikel Bawaan</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingRubrikArticleId(null);
                            setNewCustomArticle({
                              id: '',
                              title: '',
                              siteName: '',
                              location: 'Nusantara',
                              category: 'Kisah Rahasia',
                              content: '',
                              source: 'Arsip Kurator Ziarah Nusantara',
                              readTime: '3 mnt',
                            });
                            setIsAddingCustomArticle(!isAddingCustomArticle);
                          }}
                          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah Tulisan Rubrik</span>
                        </button>
                      </div>
                    </div>

                    {isAddingCustomArticle && (
                      <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-3 mb-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-xs font-bold text-emerald-900">
                            {editingRubrikArticleId
                              ? `Mengedit Artikel Rubrik (ID: ${editingRubrikArticleId})`
                              : 'Tambah Artikel Rubrik Baru'}
                          </span>
                          {editingRubrikArticleId && (
                            <span className="text-[11px] text-slate-500">
                              Perubahan langsung menimpa artikel di halaman /rubrik
                            </span>
                          )}
                        </div>
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

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Kota / Lokasi</label>
                            <input
                              type="text"
                              placeholder="Contoh: Demak, Jawa Tengah"
                              value={newCustomArticle.location || ''}
                              onChange={(e) => setNewCustomArticle({ ...newCustomArticle, location: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Sumber Referensi</label>
                            <input
                              type="text"
                              placeholder="Contoh: Arsip Kurator Ziarah Nusantara"
                              value={newCustomArticle.source || ''}
                              onChange={(e) => setNewCustomArticle({ ...newCustomArticle, source: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Estimasi Waktu Baca</label>
                            <input
                              type="text"
                              placeholder="Contoh: 4 mnt"
                              value={newCustomArticle.readTime || ''}
                              onChange={(e) => setNewCustomArticle({ ...newCustomArticle, readTime: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <label className="block text-[11px] font-bold text-slate-700">
                              Isi Lengkap Naskah / Kisah *
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const current = newCustomArticle.content || '';
                                if (current.includes('<!--more-->')) return;
                                const cut = Math.min(220, Math.floor(current.length * 0.45));
                                const nextVal =
                                  current.length > 60
                                    ? `${current.slice(0, cut).trim()} <!--more--> ${current.slice(cut).trim()}`
                                    : `${current} <!--more--> `;
                                setNewCustomArticle({ ...newCustomArticle, content: nextVal });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Scissors className="w-3 h-3" />
                              <span>+ Sisipkan Titik Potong Gembok (&lt;!--more--&gt;)</span>
                            </button>
                          </div>
                          <textarea
                            rows={5}
                            placeholder="Tuliskan isi kisah rahasia, manuskrip, atau hikmah karomah... Gunakan <!--more--> untuk menentukan batas bacaan gratis sebelum gembok infaq."
                            value={newCustomArticle.content || ''}
                            onChange={(e) => setNewCustomArticle({ ...newCustomArticle, content: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingRubrikArticleId(null);
                              setIsAddingCustomArticle(false);
                            }}
                            className="px-3.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={handleAddCustomRubrikArticle}
                            className="px-4 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                          >
                            {editingRubrikArticleId ? 'Simpan Perubahan Artikel' : 'Tambahkan & Simpan ke Cloud'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Pencarian Cepat Artikel Rubrik */}
                    <div className="relative mb-3">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="search"
                        value={rubrikSearchQuery}
                        onChange={(e) => setRubrikSearchQuery(e.target.value)}
                        placeholder="Cari judul artikel rubrik, nama wali, atau kategori..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-700"
                      />
                    </div>

                    {/* Daftar Artikel Kustom & Bawaan untuk Edit / Toggle Gratis / Kunci */}
                    <div className="max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
                      {(() => {
                        const customList = (rubrikGate.customArticles || []).map((ca) => ({
                          ...ca,
                          isCustom: true,
                        }));
                        const customIds = new Set(customList.map((c) => c.id));
                        const builtIns = getDefaultBuiltInRubrikArticles()
                          .filter((b) => !customIds.has(b.id))
                          .map((b) => ({ ...b, isCustom: false }));
                        const allList = [...customList, ...builtIns];
                        const q = rubrikSearchQuery.trim().toLowerCase();
                        if (!q) return allList;
                        return allList.filter(
                          (a) =>
                            a.title.toLowerCase().includes(q) ||
                            a.siteName.toLowerCase().includes(q) ||
                            a.category.toLowerCase().includes(q) ||
                            a.location.toLowerCase().includes(q)
                        );
                      })().map((art) => {
                        const isPinnedFree = rubrikGate.pinnedFreeArticleIds.includes(art.id);
                        const isDeleted = (rubrikGate.deletedArticleIds || []).includes(art.id);
                        return (
                          <div
                            key={art.id}
                            className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 ${
                              isDeleted ? 'opacity-50 bg-rose-50/30' : ''
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {art.category}
                                </span>
                                {art.isCustom ? (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    Kustom / Diedit Kurator
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                                    Artikel Bawaan
                                  </span>
                                )}
                                {art.content?.includes('<!--more-->') && (
                                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                                    &lt;!--more--&gt; Aktif
                                  </span>
                                )}
                                {isDeleted && (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                                    Disembunyikan
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-bold text-slate-900 truncate mt-1">{art.title}</p>
                              <p className="text-[11px] text-slate-500 truncate">
                                {art.siteName} • {art.location}
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleSelectEditRubrikArticle(art)}
                                className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3 text-emerald-800" />
                                <span>Edit</span>
                              </button>
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
                              <button
                                type="button"
                                onClick={() => handleDeleteCustomRubrikArticle(art.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                                title={
                                  isDeleted
                                    ? 'Pulihkan artikel ke halaman /rubrik'
                                    : 'Hapus / sembunyikan artikel dari halaman /rubrik'
                                }
                              >
                                {isDeleted ? <RotateCcw className="w-4 h-4 text-emerald-700" /> : <Trash2 className="w-4 h-4" />}
                              </button>
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

            {/* TAB 4A: PUSAT KENDALI 4 — PENGELOLAAN DAFTAR DOA & WIRID (/doa) */}
            {activeTab === 'doa' && (
              <DoaWiridAdminSection
                sites={sites}
                curatedDoas={curatedDoas}
                deletedDoaIds={deletedDoaIds}
                contributions={contributions}
                processingId={processingId}
                isSavingSettings={isSavingSettings}
                onChangeCuratedDoas={setCuratedDoas}
                onChangeDeletedDoaIds={setDeletedDoaIds}
                onSaveDoaSettings={handleSaveDoaSettings}
                onApproveContribution={handleApproveContribution}
                onRejectContribution={handleRejectContribution}
                onDeleteContribution={handleDeleteContribution}
              />
            )}

            {/* TAB 4B: PUSAT KENDALI TEKS & COPYWRITING UI */}
            {activeTab === 'teks_ui' && (
              <SiteCopyAdminSection
                showBanner={(_type, text) => setSettingsMsg(text)}
                externalSiteCopy={restoredSiteCopy}
              />
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
                      <h3 className="font-bold text-slate-900 text-base">Kelola Pilihan Program Kebaikan Donasi</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Program pada urutan <strong>#1 Paling Atas</strong> otomatis tampil penuh sebagai <strong>Prioritas Utama</strong> di halaman Donasi Digital.
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
                              <option value="HeartHandshake">Amal / Donasi</option>
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
                      {isSavingSettings ? 'Menyimpan...' : 'Simpan Seluruh Pengaturan, Domain & Program Donasi'}
                    </button>
                  </div>
                </form>

                {/* Panel Analitik Pemisah Donasi & Peringkat Makam Paling Sering Dibuka */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 mb-1">
                      Analitik Pembuka Kunci &amp; Infaq Peziarah
                    </p>
                    <h3 className="font-bold text-slate-900 text-base">
                      Perbandingan &amp; Peringkat Donasi yang Sering Dibuka Peziarah
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pemisahan otomatis antara pembuka gembok <strong>Barokah &amp; Doa Khusus (Rp 5.000)</strong>, <strong>Rubrik &amp; Khazanah (Rp 10.000)</strong>, serta <strong>Infaq Umum / Pemeliharaan Situs</strong>.
                    </p>
                  </div>

                  {/* a) 3 Kartu Ringkasan Kategori Donasi (Memisahkan Dana Terverifikasi vs Menunggu Pemeriksaan Bukti) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-xs">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                          programId: barokah-doa
                        </span>
                        <span className="text-xs font-bold text-amber-800">Rp 5.000</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">
                        1. Donasi Barokah &amp; Doa Khusus (Terverifikasi)
                      </h4>
                      <p className="text-xl font-black font-mono tabular-nums text-amber-800 mt-1">
                        Rp {donationAnalytics.barokah.total.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Terverifikasi: <strong>{donationAnalytics.barokah.verifiedCount}</strong> transaksi
                      </p>
                      {donationAnalytics.barokah.pendingCount > 0 && (
                        <p className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200/80 rounded px-2 py-0.5 mt-1.5">
                          Menunggu Pemeriksaan Bukti (Belum Terverifikasi): <strong>{donationAnalytics.barokah.pendingCount}</strong> (Rp {donationAnalytics.barokah.pendingTotal.toLocaleString('id-ID')})
                        </p>
                      )}
                    </div>

                    <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-xs">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                          programId: rubrik-manuskrip
                        </span>
                        <span className="text-xs font-bold text-emerald-800">Rp 10.000</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">
                        2. Donasi Rubrik &amp; Khazanah (Terverifikasi)
                      </h4>
                      <p className="text-xl font-black font-mono tabular-nums text-emerald-800 mt-1">
                        Rp {donationAnalytics.rubrik.total.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Terverifikasi: <strong>{donationAnalytics.rubrik.verifiedCount}</strong> transaksi
                      </p>
                      {donationAnalytics.rubrik.pendingCount > 0 && (
                        <p className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200/80 rounded px-2 py-0.5 mt-1.5">
                          Menunggu Pemeriksaan Bukti (Belum Terverifikasi): <strong>{donationAnalytics.rubrik.pendingCount}</strong> (Rp {donationAnalytics.rubrik.pendingTotal.toLocaleString('id-ID')})
                        </p>
                      )}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          Infaq Umum &amp; Situs
                        </span>
                        <span className="text-xs font-bold text-slate-600">Bebas</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">
                        3. Donasi Pemeliharaan / Infaq Umum (Terverifikasi)
                      </h4>
                      <p className="text-xl font-black font-mono tabular-nums text-slate-900 mt-1">
                        Rp {donationAnalytics.other.total.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Terverifikasi: <strong>{donationAnalytics.other.verifiedCount}</strong> transaksi
                      </p>
                      {donationAnalytics.other.pendingCount > 0 && (
                        <p className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200/80 rounded px-2 py-0.5 mt-1.5">
                          Menunggu Pemeriksaan Bukti (Belum Terverifikasi): <strong>{donationAnalytics.other.pendingCount}</strong> (Rp {donationAnalytics.other.pendingTotal.toLocaleString('id-ID')})
                        </p>
                      )}
                    </div>
                  </div>

                  {/* b) 2 Tabel Peringkat Makam Terlaris */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Tabel 1: Barokah & Doa Khusus (Rp 5.000) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-slate-900 mb-1">
                        Tabel 1: Makam dengan &ldquo;Barokah &amp; Doa Khusus (Rp 5.000)&rdquo; Paling Sering Dibuka
                      </h4>
                      <p className="text-[11px] text-slate-500 mb-3">
                        Diurutkan berdasarkan jumlah buka kunci terbanyak oleh peziarah.
                      </p>
                      {donationAnalytics.barokah.ranking.length === 0 ? (
                        <p className="text-xs text-slate-400 italic py-3">
                          Belum ada data pembukaan Barokah &amp; Doa Khusus (Rp 5.000).
                        </p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
                                <th className="py-2 pr-2">Rank</th>
                                <th className="py-2 px-2">Nama Makam</th>
                                <th className="py-2 px-2 text-right">Dibuka</th>
                                <th className="py-2 pl-2 text-right">Total Infaq</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {donationAnalytics.barokah.ranking.slice(0, 10).map((row, idx) => (
                                <tr key={row.key} className="hover:bg-amber-50/40">
                                  <td className="py-2 pr-2 font-black text-amber-800">#{idx + 1}</td>
                                  <td className="py-2 px-2 font-semibold text-slate-900">{row.siteName}</td>
                                  <td className="py-2 px-2 text-right font-bold text-amber-900">{row.count}x dibuka</td>
                                  <td className="py-2 pl-2 text-right font-mono font-bold text-slate-800">
                                    Rp {row.totalAmount.toLocaleString('id-ID')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Tabel 2: Rubrik & Khazanah (Rp 10.000) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-slate-900 mb-1">
                        Tabel 2: Makam/Artikel dengan &ldquo;Rubrik &amp; Khazanah (Rp 10.000)&rdquo; Paling Sering Dibuka
                      </h4>
                      <p className="text-[11px] text-slate-500 mb-3">
                        Diurutkan berdasarkan jumlah buka kunci kisah rahasia &amp; rubrik terbanyak.
                      </p>
                      {donationAnalytics.rubrik.ranking.length === 0 ? (
                        <p className="text-xs text-slate-400 italic py-3">
                          Belum ada data pembukaan Rubrik &amp; Khazanah (Rp 10.000).
                        </p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
                                <th className="py-2 pr-2">Rank</th>
                                <th className="py-2 px-2">Nama Makam / Artikel</th>
                                <th className="py-2 px-2 text-right">Dibuka</th>
                                <th className="py-2 pl-2 text-right">Total Infaq</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {donationAnalytics.rubrik.ranking.slice(0, 10).map((row, idx) => (
                                <tr key={row.key} className="hover:bg-emerald-50/40">
                                  <td className="py-2 pr-2 font-black text-emerald-800">#{idx + 1}</td>
                                  <td className="py-2 px-2 font-semibold text-slate-900">{row.siteName}</td>
                                  <td className="py-2 px-2 text-right font-bold text-emerald-900">{row.count}x dibuka</td>
                                  <td className="py-2 pl-2 text-right font-mono font-bold text-slate-800">
                                    Rp {row.totalAmount.toLocaleString('id-ID')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Daftar Konfirmasi Donasi & Verifikasi Bukti Transfer */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        Riwayat Konfirmasi Donasi &amp; Verifikasi Bukti Transfer ({filteredDonations.length} dari {donations.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Periksa foto struk bukti transfer munfiq / peziarah. Jika bukti tidak valid, klik <strong>Cabut &amp; Hapus</strong> untuk mengunci kembali akses secara real-time.
                      </p>
                    </div>
                    {/* c) Filter Cepat di Tabel Verifikasi Donasi Admin */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDonationFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                          donationFilter === 'all'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Semua ({donations.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationFilter('barokah-doa')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                          donationFilter === 'barokah-doa'
                            ? 'bg-amber-700 text-white'
                            : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        Barokah &amp; Doa Rp 5.000 ({donationAnalytics.barokah.count})
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationFilter('rubrik-manuskrip')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                          donationFilter === 'rubrik-manuskrip'
                            ? 'bg-emerald-800 text-white'
                            : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        Rubrik &amp; Khazanah Rp 10.000 ({donationAnalytics.rubrik.count})
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationFilter('other')}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                          donationFilter === 'other'
                            ? 'bg-slate-800 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Infaq Umum ({donationAnalytics.other.count})
                      </button>
                    </div>
                  </div>
                  {filteredDonations.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">Belum ada data konfirmasi donasi untuk kategori filter ini.</p>
                  ) : (
                    <div className="max-h-[480px] overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100 bg-white">
                      {filteredDonations.map((d: DonationAdminItem) => {
                        const hasProof =
                          d.hasProof === true ||
                          (typeof d.proofImageUrl === 'string' && d.proofImageUrl.startsWith('data:image/'));
                        const isVerified = d.status === 'verified';
                        return (
                          <div key={d.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                            <div className="flex items-start gap-3 min-w-0">
                              {hasProof ? (
                                <button
                                  type="button"
                                  onClick={() => setPreviewProofDonation(d)}
                                  className="w-14 h-14 rounded-xl overflow-hidden border-2 border-emerald-300 bg-emerald-50 shrink-0 relative group cursor-pointer flex flex-col items-center justify-center text-emerald-800"
                                  title="Klik untuk memeriksa Bukti Transfer Privat"
                                >
                                  {typeof d.proofImageUrl === 'string' && d.proofImageUrl.startsWith('data:image/') ? (
                                    <img
                                      src={d.proofImageUrl}
                                      alt="Bukti Transfer"
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                  ) : (
                                    <ShieldCheck className="w-5 h-5 text-emerald-700 mb-2" />
                                  )}
                                  <span className="absolute inset-x-0 bottom-0 bg-slate-950/75 text-white text-[9px] font-bold text-center py-0.5">
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
                                  <span className="text-xs font-black font-mono tabular-nums text-emerald-700">
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
                                    {isVerified ? '✓ Bukti Terverifikasi' : hasProof ? 'Bukti Terlampir (Privat)' : 'Data Lama (Akses Terkunci)'}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 mt-0.5">
                                  <strong>Metode:</strong> {d.paymentMethod || 'QRIS'} • <strong>Pengirim:</strong> {d.senderAccount || d.donorName}
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

      <DonationVerificationModal
        donation={previewProofDonation}
        onClose={() => setPreviewProofDonation(null)}
        onVerify={handleVerifyDonation}
        onDelete={handleDeleteDonation}
      />
    </div>
  );
};
