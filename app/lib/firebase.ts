// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCjhgRNbsc2qraZ9ciRm4eB7-Q1SnEekPU",
	authDomain: "fota-b6711.firebaseapp.com",
	projectId: "fota-b6711",
	storageBucket: "fota-b6711.firebasestorage.app",
	messagingSenderId: "434646834126",
	appId: "1:434646834126:web:d813a98623a6128b40699f",
	measurementId: "G-HNL11QBB08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db, ref, uploadBytes, doc, setDoc };
