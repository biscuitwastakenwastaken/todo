// import { initializeApp } from "firebase-admin/app";

// const firebaseConfig = {
//   // TODO
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// };

// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
// const auth = getAuth(app);

// export { db, auth };

import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }),
  // databaseURL: "https://fast-feedback-demo.firebaseio.com",
});

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
