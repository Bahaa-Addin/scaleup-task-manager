import * as admin from 'firebase-admin';
import serviceAccount from '../../service-account.json';

/**
 * Firebase Admin application.
 */
export const FirebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY,
  })
})
