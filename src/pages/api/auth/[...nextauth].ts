import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { v4 } from "uuid";
import { string } from "zod";

type ClientType = {
  clientId: string;
  clientSecret: string;
};

// const state_id = v4();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      type MyUser = {
        id: string;
        name: string;
        email: string;
        image: string;
        state_id: string;
      };

      user = { ...user, state_id: v4() } as MyUser;
      // console.log("[Signin] user: ", user);
      // console.log("[Signin] account: ", account);
      // console.log("[Signin] profile: ", profile);

      const isAllowedToSignIn = true;

      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

    // account, profileは新しいセッションでの呼び出しのみ渡される
    // それ以降は、tokenのみ渡される
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        // first sign in に実行される
        token.accessToken = account.access_token;
        // token.first_state_id = v4();
        // token.first_state_id = state_id;
        console.log("[jwt] account true after setting: ", token);
      }

      // if (token.accessToken !== account?.access_token) {
      //   console.log(
      //     "--------   token.accessToken !== account?.access_token  ------"
      //   );
      // }

      // if (!account?.access_token) {
      //   console.log("--------   account NOT FOUND  ------");
      // }

      return token;
    },

    // session関数はjwt関数の後に呼び出される
    // 引数tokenは JWT
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log("[Session] session: ", session);
      session = { ...session };

      // console.log("[Session] token accessToken: ", token);
      // console.log("[Session] user accessToken: ", user);
      // session.accessToken = token.accessToken;
      // session.user.id = token.id;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
