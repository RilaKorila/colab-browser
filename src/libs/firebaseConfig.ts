import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// .envファイルで設定した環境変数をfirebaseConfigに入れる
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const loginWithFirebase = (
  email: string,
  password: string
): Promise<boolean> => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sign in
      const user = userCredential.user;
      console.log(user, " , successfully logined");

      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, " : ", errorMessage);

      return false;
    });
};
