/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: "%Add_your_firbase_apiKey%",
	authDomain: "%Add_your_firbase_authDomain%",
	projectId: "%Add_your_firbase_projectId%",
	storageBucket: "%Add_your_firbase_storageBucket%",
	messagingSenderId: "%Add_your_firbase_messagingSenderId%",
	appId: "%Add_your_firbase_appId%",
	measurementId: "%Add_your_firbase_measurementId%",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "%Your_Favcon_Path%",
	};

	self.addEventListener('notificationclick', function (event) {
		var redirect_url = payload.notification.click_action;
		event.notification.close();
		event.waitUntil(
			clients
				.matchAll({
					type: "window"
				})
				.then(function (clientList) {
					for (var i = 0; i < clientList.length; i++) {
						var client = clientList[i];
						if (client.url === "/user-management/all-users" && "focus" in client) {
							return client.focus();
						}
					}
					if (clients.openWindow) {
						return clients.openWindow('/user-management/all-users');
					}
				})
		);
	});

	// eslint-disable-next-line no-restricted-globals
	return self.registration.showNotification(
		notificationTitle,
		notificationOptions,
	);
});
