import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FirebaseAuthProvider } from "./../libs/utils/auth/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FirebaseAuthProvider>
        <Component {...pageProps} />
      </FirebaseAuthProvider>
    </>
  );
}
export default MyApp;
