// Declare notification click handler
//
self.addEventListener('notificationclick', (event)=>{

    event.notification.close();
    const msgId = event.notification.data.msg;
    const url = (msgId.length > 0) ? `/jaga/index.html?msg=${encodeURIComponent(msgId)}` : `/jaga/index.html`;
    
    event.waitUntil(
        clients
        .matchAll({
            type: 'window',
            includeUncontrolled: true
        })
        .then((clientList) => {
            for (const client of clientList) {
                if ((client.url.indexOf('/jaga') >= 0) && ('focus' in client)) {
                    return client.focus();
                }
            }
    
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
    
});


// Import Firebase scripts
//
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
    
  const title = 'Jaga';
  const body = payload.data.text;
  const options = {
    body : body,
    icon : '/jaga/jaga_256x256.png',
    tag  : 'unique-message-tag',
    data : {
        msg : payload.data.msg || ''
    }
  };
    
  return self.registration.showNotification(title, options);
});

