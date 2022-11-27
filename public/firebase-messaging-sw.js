const { default: Api } = require("../src/API");

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDkDXEzV5L6OxDSd7CFiQwrGEBuQeg59-E",
    authDomain: "espcam-9edcb.firebaseapp.com",
    databaseURL: "https://espcam-9edcb-default-rtdb.firebaseio.com",
    projectId: "espcam-9edcb",
    storageBucket: "espcam-9edcb.appspot.com",
    messagingSenderId: "851470719394",
    appId: "1:851470719394:web:87be0f43da852b7f8abafb"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

 self.registration.showNotification(notificationTitle,
    notificationOptions);
});