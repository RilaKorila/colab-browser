import "../styles/globals.css";
// import { getAuth } from "firebase/auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
// import { useEffect } from "react";
// import { FirebaseAuthProvider } from "../libs/firebase/utils/auth";
// import { signIn } from "libs/firebase/hooks";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // const auth = getAuth();
  // useEffect(() => {
  //   signIn();
  // }, [auth]);
  return (
    <>
      <SessionProvider session={session}>
        {/* <FirebaseAuthProvider> */}
        <Component {...pageProps} />
        {/* </FirebaseAuthProvider> */}
      </SessionProvider>
    </>
  );
}
export default MyApp;
