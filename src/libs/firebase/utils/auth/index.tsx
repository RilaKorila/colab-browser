import { getAuth, getRedirectResult } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { getFirebaseApp } from "libs/firebase/utils/init/firebaseConfig";

/**
 * @see {@link https://firebase.google.com/docs/reference/js/v8/firebase.User#properties_1}<br>
 */
export type User = {
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
};

/**
 * @see {@link https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#currentuser}<br>
 */
export type AuthContextState = {
  currentUser: User | null | undefined;
};

export type ReactNodeProps = {
  children?: React.ReactNode;
};

export const FirebaseAuthContext = createContext<AuthContextState>({
  currentUser: undefined,
});

// 認証プロバイダ
export const FirebaseAuthProvider = ({ children }: ReactNodeProps) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  const firebaseApp = getFirebaseApp();
  const auth = getAuth(firebaseApp);

  // authはnullの可能性があるので、useEffectの第二引数にauthを指定しておく
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
      getRedirectResult(getAuth(firebaseApp));
    });
    return () => {
      unsubscribed();
    };
  }, [auth]);

  return (
    <FirebaseAuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const UserFirebaseContext = () => useContext(FirebaseAuthContext);
