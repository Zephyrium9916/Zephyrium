// firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNOD9EHFQcLBZcml-TJvYw9JPre1sFtH4",
  authDomain: "zephyrium-web.firebaseapp.com",
  projectId: "zephyrium-web",
  storageBucket: "zephyrium-web.firebasestorage.app",
  messagingSenderId: "362366737290",
  appId: "1:362366737290:web:879a06cef5e4c0dc31c673",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
