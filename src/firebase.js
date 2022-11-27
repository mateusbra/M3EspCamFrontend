import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Api from './Api';
import 'bootstrap/dist/css/bootstrap.min.css';

var firebaseConfig = {
    apiKey: "AIzaSyDkDXEzV5L6OxDSd7CFiQwrGEBuQeg59-E",
    authDomain: "espcam-9edcb.firebaseapp.com",
    databaseURL: "https://espcam-9edcb-default-rtdb.firebaseio.com",
    projectId: "espcam-9edcb",
    storageBucket: "espcam-9edcb.appspot.com",
    messagingSenderId: "851470719394",
    appId: "1:851470719394:web:87be0f43da852b7f8abafb"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BIs381c3WGMjFyokj-Jj4N22qiCZIXrV1HOo7C0at1iFdmHZ3iikcJSlNcPM9sSupUQERntZlIpBckZGQ0l5Yc4'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging,  (payload) => {
      //console.log(payload);
      //const image = await Api.getURL();
      payload.notification.image = "";
      console.log("test",payload);
      resolve(payload);
    });
});