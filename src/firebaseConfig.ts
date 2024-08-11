// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from '@/config/firebaseConfig'; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, firestore,analytics };
