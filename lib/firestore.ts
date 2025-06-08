import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT!, 'base64').toString('utf8'))),
  })
}

export const db = getFirestore()
