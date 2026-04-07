// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
  import { getFirestore,collection, addDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
// import {  } from "firebase/firestore-firebase.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8o0NswJ6JfxAiYAtEAU5GWvQO5V6Ho-k",
  authDomain: "atelier-javscript.firebaseapp.com",
  projectId: "atelier-javscript",
  storageBucket: "atelier-javscript.firebasestorage.app",
  messagingSenderId: "964398870182",
  appId: "1:964398870182:web:65de8e381af8f1c614ce67",
  measurementId: "G-LGYDV4G97V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// // Add a new document in collection "cities"
// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

// await setDoc(doc(db, "moi", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });



// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "cities"), {
  name: "Tokyo",
  country: "Japan"
});
console.log("Document written with ID: ", docRef.id);