// ----- FILE PURPOSE ----->
// This file initializes the Firebase application using environment-specific configuration.
// It exports the authentication and Firestore database instances for use throughout the app.
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ----- FIREBASE CONFIGURATION ----->
// Stores the configuration for Firebase, using environment variables for security.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ----- INITIALIZE FIREBASE APP ----->
// Creates the Firebase app instance using the provided configuration.
const app = initializeApp(firebaseConfig);

// ----- INITIALIZE AUTH & FIRESTORE ----->
// Retrieves instances of Firebase Authentication and Firestore Database services.
const auth = getAuth(app);
const db = getFirestore(app);

// ----- EXPORT SERVICES ----->
// Exports Firebase services to be used in other parts of the application.
export { auth, db };
