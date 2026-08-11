// ============================================================================
// Module      : jaga.js
// Version     : 1.0
//
// Author      : Denis Patrice <denispatrice@yahoo.com>
// Copyright   : Copyright (c) Denis Patrice Dipl.-Ing. 2010-2025
//               All rights reserved
//
// Application : jaga
// Description : Application entry point
//
// Date+Time of change   By     Description
// --------------------- ------ ----------------------------------------------
// 01-Sep-26 00:00 WIT   Denis  Deployment V. 2026 "Alexandre Dumas"
//
// ============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging.js";

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

const firebaseVapidKey = "BF-AgR3dVODHFUw5uH1e-aEJEmX0Y-uBcQn5nlTTGy77WM5S4J5N-t4dUzMBP4aVNusGBA0y1Pu-oHVad3mr5A4";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

R.reg("/lib/html/strings.json");
await theme.init();

console.log("Registering stand alone app manifest");
 
const manifest = {
    "name"             : "radiahub.22web.org/jaga",
    "short_name"       : "Jaga",
    "theme_color"      : "#1288FD",
    "background_color" : "#1288FD",
    "display"          : "standalone",
    "scope"            : "",
    "start_url"        : "https://radiahub.22web.org/jaga/",
    "description"      : "radiahub jaga",
    "icons": [
        {
            "src"   : "https://radiahub.22web.org/jaga/jaga_512x512.png",
            "sizes" : "512x512"
        }
    ]
};
/*
const manifest = {
    "name"             : "Jaga pet condition reporting",
    "short_name"       : "Jaga",
    "theme_color"      : "#1288FD",
    "background_color" : "#1288FD",
    "display"          : "standalone",
    "scope"            : "",
    "start_url"        : "http://localhost:8080/jaga/",
    "description"      : "radiahub jaga pet condition reporting",
    "icons": [
        {
            "src"   : "https://radiahub.22web.org/jaga/jaga_512x512.png",
            "sizes" : "512x512"
        }
    ]
};
*/

// Convert JSON to base64 data URL
const manifestString  = JSON.stringify(manifest);
const manifestBase64  = btoa(unescape(encodeURIComponent(manifestString)));
const manifestDataUrl = "data:application/json;base64," + manifestBase64;

// Inject into <head>
const link = document.createElement("link");
link.rel = "manifest";
link.href = manifestDataUrl;
document.head.appendChild(link);

console.log("Stand alone app manifest registered");


const launch = function() {
    jQuery(`DIV_REQUEST_NOTIFICATIONS`).hide();
    delay(100).then(()=>{
        open("home");
        console.log("Application running normally");
    });
};

const registerServiceWorker = function(){
    return new Promise((resolve)=>{
        console.info("IN registerServiceWorker()");
        Notification.requestPermission().then((permission)=>{
            console.log(permission);
            if (permission === "granted") {
                navigator.serviceWorker.register('/jaga/firebase-messaging-sw.js')
                .then ((registration)=>{
                    console.log("Resolved by navigator.serviceWorker.register()");
                    delay(100).then(()=>{
                        getToken(messaging, { serviceWorkerRegistration:registration, vapidKey:firebaseVapidKey })
                        .then((currentToken)=>{
                            //console.log(currentToken);
                            fcm.reg(currentToken).then((result)=>{
                                if (result) {
                                    onMessage(messaging, (payload)=>{
                                        fcm.onmessage(payload).then(()=>{
                                            console.log("resolved by fcm.onmessage();");
                                        });
                                    });
                                    resolve(true);
                                }
                                else {
                                    console.error("Rejected by fcm.reg()");
                                    resolve(false);
                                }
                            });
                          })
                        .catch(()=>{
                            console.error("Rejected by getToken()");
                            resolve(false);
                        });
                    });
                })
                .catch(()=>{
                    console.error("Rejected by navigator.serviceWorker.register()");
                    resolve(false);
                });
            }
            else {
                console.error('Permission not granted');
                resolve(false);
            }
        })
        .catch(()=>{
            console.error('Rejected by Notification.requestPermission()');
            resolve(false);
        });
    });
};

const load_firebase_messaging = function() {
    return new Promise((resolve)=>{
        
        console.info(`IN load_firebase_messaging() Notification.permission='${String(Notification.permission)}'`);
        
        if (Notification.permission === "granted") {
            registerServiceWorker().then((result)=>{
                console.log(result);
                if (!result) {
                  console.error("Rejected by registerServiceWorker()");
                  //history.go(-1);
                }
                resolve(result);
            });
        }
        else {
            
            jQuery(`#DIV_REQUEST_NOTIFICATIONS`).show();
            jQuery(`#BTN_ALLOW_NOTIFICATION`).on("click", function(){
                registerServiceWorker().then((result)=>{
                    console.log(result);
                    if (!result) {
                      console.error("Rejected by registerServiceWorker()");
                      //history.go(-1);
                    }
                    resolve(result);
                });
            });
            
        }
        
    });
};

const saveUser = function(email, name, picture) {
    return new Promise((resolve)=>{
        console.info(`IN saveUser() email='${email}' name='${name}' picture='${picture}'`);
        
        storage.set(`identifier`, email);
        storage.set(`google_name`, name);
        storage.set(`google_picture`, picture);
        
        const row = {
            displayName: name,
            pictureURI : picture
        };
        //console.log(row);
        const loc = {
            primaryEmail: email
        };
        //console.log(loc);
        xdbref.set("radiahub", "users", row, loc).then((result)=>{
            //console.log(result);
            resolve(result);
        });
    });
};

const jaga = function() {
    
    let identifier = storage.get(`identifier`);
    console.info(`IN jaga() identifier='${String(identifier)}'`);

    if (strlen(identifier) > 0) {
        
        load_firebase_messaging().then((res)=>{
            console.log(res);
            launch();
        });
        
    }
    else {
        
        console.log(`identifer not known`);
        if (!google?.accounts?.id) {
            console.error("Google Identity Services library not loaded");
            return;
        }
        
        try {
            jQuery(`#DIV_REQUEST_SIGNIN`).show();
            
            const DEVELOPER_CLIENT_ID = '526889796130-49pfvkv87sjs4ktputdsr9bbat95jbfs.apps.googleusercontent.com';
            
            const handleCredentialResponse = function(response) {
              //fetch('https://radiahub.22web.org/auth-google.php', {
                fetch('http://localhost:8080/auth-google.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: response.credential })
                })
                .then(res => res.text())
                .then(data => {
                    console.log(data);
                    if (is_json(data)) {
                        data = JSON.parse(data);
                    }
                    saveUser(data.email, data.name, data.picture).then((res)=>{
                        //console.log(res);
                        jQuery(`DIV_REQUEST_SIGNIN`).hide();
                        load_firebase_messaging().then((res)=>{
                            //console.log(res);
                            launch();
                        });
                    });
                })
                .catch(err => alert("Error sending token to backend:", err));
            }
    
            google.accounts.id.initialize({
                client_id: DEVELOPER_CLIENT_ID,
                callback: handleCredentialResponse
            });
            
        } 
        catch(e) {
            console.error(e);
        }
        
        google.accounts.id.renderButton(
            document.getElementById("BTN_AUTH_GOOGLE"),
            { theme: "outline", size: "large" }
        );
        
    }
};


jaga();


// End of file: jaga.js
// ============================================================================