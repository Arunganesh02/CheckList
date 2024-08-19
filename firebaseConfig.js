import { initializeApp } from 'firebase/app';
import { getDatabase } from '@react-native-firebase/database';
import { getFirestore } from 'firebase/firestore';
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCL8NNlq62_i0C5dghVRPk0qrt80oUp9D0",
    authDomain: "prevmain-3a569.firebaseapp.com",
    projectId: "prevmain-3a569",
    storageBucket: "prevmain-3a569.appspot.com",
    messagingSenderId: "546737328357",
    appId: "1:546737328357:web:0efe5edc170566f8bb040c",
    measurementId: "G-9YZMBN8HT7",
    databaseURL: "https://prevmain-3a569-default-rtdb.firebaseio.com/" // Ensure this is correct
};


// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized:', app.name); // Should print "[DEFAULT]"
} catch (error) {
    console.error('Error initializing Firebase:', error);
}

const db = getFirestore(app);

export { db };
