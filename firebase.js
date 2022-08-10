import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Notify } from "./utils/Notify";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const getTokenInit = () => {

    const firebaseConfig = {
        apiKey: "%Add_your_firbase_apiKey%",
        authDomain: "%Add_your_firbase_authDomain%",
        projectId: "%Add_your_firbase_projectId%",
        storageBucket: "%Add_your_firbase_storageBucket%",
        messagingSenderId: "%Add_your_firbase_messagingSenderId%",
        appId: "%Add_your_firbase_appId%",
        measurementId: "%Add_your_firbase_measurementId%",
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('firebase-messaging-sw.js')
            .then(function (registration) {
                // console.log(
                // 	'test Registration successful, scope is:',
                // 	registration.scope
                // );
            })
            .catch(function (err) {
                // console.log('test Service worker registration failed, error:', err);
            });
    }

    getToken(messaging, { vapidKey: 'BH0REwh1U4N8Bx-_FySiFkhni3ztBFxQDI-B3nisGnnqPvPMiJGijVF0syXIWW9e8-T-P9NpD6l_tpHo48hrpu0' }).then((currentToken) => {
        if (currentToken) {
            localStorage.setItem("fcmToken", currentToken)
            // if (currentToken) {
            // 	axios.post('save-token', { token: currentToken });
            // } else {
            // 	console.warn(
            // 		'No registration token available. Request permission to generate one.'
            // 	);
            // }
        } else {
            console.log('No registration token available. Request permission to generate one.');
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });

    onMessage(messaging, (payload) => {
        Notify.custome(payload);
    });
}