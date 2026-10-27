import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeAuth, 
  getAuth,
  browserLocalPersistence, 
  browserPopupRedirectResolver, 
  indexedDBLocalPersistence, 
  inMemoryPersistence,
  GoogleAuthProvider,
  User
} from 'firebase/auth';
import { initializeFirestore, getFirestore, setLogLevel, Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Suppress noisy internal @firebase/firestore WebChannel retry logs in iframe/proxy environments
setLogLevel('silent');

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let firestoreInstance: Firestore;
try {
  firestoreInstance = initializeFirestore(
    app,
    {
      experimentalAutoDetectLongPolling: true,
    },
    firebaseConfig.firestoreDatabaseId
  );
} catch {
  firestoreInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

export const db = firestoreInstance;

// Use initializeAuth with browserLocalPersistence first (synchronous) to prevent popup-blocked errors on click
let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: [browserLocalPersistence, indexedDBLocalPersistence, inMemoryPersistence],
    popupRedirectResolver: browserPopupRedirectResolver,
  });
} catch {
  // If already initialized
  authInstance = getAuth(app);
}

export const auth = authInstance;
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

const DEFAULT_ADMIN_EMAILS = ['aslamramadhan08@gmail.com'];

export function isUserAdmin(user: User | null): boolean {
  if (!user || !user.email) return false;
  const rawEnv = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_ADMIN_EMAILS || '';
  const envEmails = rawEnv
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .filter(Boolean);
  const allowed = new Set([...DEFAULT_ADMIN_EMAILS.map(e => e.toLowerCase()), ...envEmails]);
  return allowed.has(user.email.toLowerCase());
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  // Ignore transient network/offline availability errors so the app continues smoothly in offline/cache mode
  if (errMsg.includes('unavailable') || errMsg.includes('client is offline')) {
    return;
  }

  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Notice:', JSON.stringify(errInfo));
}
