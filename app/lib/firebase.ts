// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGEBUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER,
	appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db, ref, uploadBytes, doc, setDoc };
