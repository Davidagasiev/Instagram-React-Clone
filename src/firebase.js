import * as firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyCLPWNXqrZAvIyzqSMCVVFLpL4UP4mNJhU",
    authDomain: "instagram-react-clone-9c52b.firebaseapp.com",
    databaseURL: "https://instagram-react-clone-9c52b.firebaseio.com",
    projectId: "instagram-react-clone-9c52b",
    storageBucket: "instagram-react-clone-9c52b.appspot.com",
    messagingSenderId: "283429402241",
    appId: "1:283429402241:web:7aefed9cf2547989f0ff80",
    measurementId: "G-QNNXTKQXWT"
});

const 
    db      = firebaseApp.firestore(),
    auth    = firebase.auth(),
    storage = firebase.storage();


export {db, auth, storage};
