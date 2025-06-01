// Replace the below config with your own Firebase project config
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyCYAU2DBR-ahDc6Q79n77saUHZM24r-eo8",
  authDomain: "siliconsynapse.firebaseapp.com",
  projectId: "siliconsynapse",
  storageBucket: "siliconsynapse.firebasestorage.app",
  messagingSenderId: "881070098384",
  appId: "1:881070098384:web:a8ad5bb2e11b626dbb1bd5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 