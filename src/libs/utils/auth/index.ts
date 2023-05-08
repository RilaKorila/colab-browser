import { createContext, useState, useEffect } from "react";
import { LoginInput } from "libs/zod";
import { getFirebaseApp } from "libs/firebaseConfig";
import { getAuth, getRedirectResult } from "firebase/auth";

export type AuthContextState = {
  currentUser: LoginInput | null | undefined;
};

export type ReactNodeProps = {
  children?: React.ReactNode;
};

export const FirebaseAuthContext = createContext<AuthContextState>({
  currentUser: undefined,
});

// 認証プロバイダ
export const FirebaseAuthProvider = ({ children }: ReactNodeProps) => {
  const [currentUser, setCurrentUser] = useState<LoginInput | null | undefined>(
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

export const userFirebaseContext = () => useContext(FirebaseAuthContext);
