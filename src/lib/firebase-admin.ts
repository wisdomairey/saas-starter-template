import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Check if we have valid Firebase Admin credentials
const hasValidCredentials = 
  process.env.FIREBASE_ADMIN_PROJECT_ID && 
  process.env.FIREBASE_ADMIN_CLIENT_EMAIL && 
  process.env.FIREBASE_ADMIN_PRIVATE_KEY &&
  process.env.FIREBASE_ADMIN_PRIVATE_KEY !== 'demo-key';

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;

if (hasValidCredentials) {
  try {
    const firebaseAdminConfig = {
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    };

    // Initialize Firebase Admin only if it hasn't been initialized yet
    adminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig, 'admin') : getApps()[0];
    adminAuth = getAuth(adminApp);
    adminDb = getFirestore(adminApp);
  } catch (_error) {
    console.warn('Firebase Admin initialization failed - running in demo mode');
  }
}

export { adminAuth, adminDb };
export default adminApp;
