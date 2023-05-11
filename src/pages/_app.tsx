import "../styles/globals.css";
// import { getAuth } from "firebase/auth";
import type { AppProps } from "next/app";
// import { useEffect } from "react";
// import { FirebaseAuthProvider } from "../libs/firebase/utils/auth";
// import { signIn } from "libs/firebase/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  // const auth = getAuth();
  // useEffect(() => {
  //   signIn();
  // }, [auth]);
  return (
    <>
      {/* <FirebaseAuthProvider> */}
      <Component {...pageProps} />
      {/* </FirebaseAuthProvider> */}
    </>
  );
}
export default MyApp;
