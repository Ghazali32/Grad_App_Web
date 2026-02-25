import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyCyXB4GvjghP6fW1Ua4XEbMPxH_fH5YPBE",
//     authDomain: "grad-therapy.firebaseapp.com",
//     projectId: "grad-therapy",
//     storageBucket: "grad-therapy.firebasestorage.app",
//     messagingSenderId: "1084789174389",
//     appId: "1:1084789174389:web:placeholder", // Replace with actual web app ID if available
// };

const firebaseConfig = {
    apiKey: "AIzaSyDb93otv8uKPQKlqdpoL2G4IJGKUydnEu4",
    authDomain: "grad-therapy.firebaseapp.com",
    projectId: "grad-therapy",
    storageBucket: "grad-therapy.firebasestorage.app",
    messagingSenderId: "1084789174389",
    appId: "1:1084789174389:web:452c4b2db0de8d4913c83c",
    measurementId: "G-ZPZ38YHGEN"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
