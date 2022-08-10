# firebase-web-notification

Read carefully.

Step 1 - ``firebase.js`` Add file to you React src folder (Config firebase to your app).
Step 2 - ``firebase-messaging-sw.js`` Add file to your public folder (Service-worker file).
Step 3 - Paste code ``useEffect(() => {getTokenInit()}, [])`` to your app.js (config your app to firebase)
Step 4 - Open ``firebase,js`` and ``firebase-messaging-sw.js`` and change ``firebaseConfig`` object first. (Paste your keys insted of).
Step 5 - Change you ``vapidKey`` in ``getToken`` function.