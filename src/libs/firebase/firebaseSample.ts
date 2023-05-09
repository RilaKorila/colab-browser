// import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// .envファイルで設定した環境変数をfirebaseConfigに入れる
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// const app = initializeApp(firebaseConfig);
// if (getApps().length === 0) {
//   const app = initializeApp(firebaseConfig);
// }

const auth = getAuth();

export const loginWithFirebase = (
  email: string,
  password: string
): Promise<boolean> => {
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

// export const getFirebaseApp = (): FirebaseApp => {
//   return !getApps().length ? app : getApp();
// };
