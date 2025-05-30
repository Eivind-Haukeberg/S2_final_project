// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDozLMg8dK-u3HroN7RX4_wPK232TXzQLA',
  authDomain: 'oneapp-7b4b9.firebaseapp.com',
  projectId: 'oneapp-7b4b9',
  storageBucket: 'oneapp-7b4b9.firebasestorage.app',
  messagingSenderId: '413199529578',
  appId: '1:413199529578:web:7bfc0522b21d30e0fafc13',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
