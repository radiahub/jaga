// Import Firebase scripts
self.importScripts('https://www.gstatic.com/firebasejs/11.3.1/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBMtLvOQGzzak8qTg04WU4AqdcENMzpyiA",
    authDomain: "radiahub-105.firebaseapp.com",
    databaseURL: "https://radiahub-105.firebaseio.com",
    projectId: "radiahub-105",
    storageBucket: "radiahub-105.firebasestorage.app",
    messagingSenderId: "526889796130",
    appId: "1:526889796130:web:057ca0722961c6ae22807b",
    measurementId: "G-LW68Z0VRJW"
};

// Initialize Firebase in the service worker
/*
// Use jaga.js declarations
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
*/
// Use AI generated code
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload)=>{
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/jaga/glint-transparent.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

