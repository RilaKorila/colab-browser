import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { HeaderMenu } from "components/HeaderMenu";
import { Container, H2, StyledButton } from "components/Layout";

const Login: NextPage = () => {
  // sessionには、以下のような値が入っている。
  // {
  //     "user":{
  //        "name":"John",
  //        "email":"john@examle.com",
  //        "image":"https://lh3.googleusercontent.com/a/AGNmyxZF7jQN_YTYVyxIx5kfdo3kalfRktVD17GrZ9n=s96-c"
  //     },
  //     "expires":"2023-04-01T00:29:51.016Z"
  // }
  const { data: session } = useSession();

  return (
    <>
      <HeaderMenu />
      <Container>
        {
          // セッションがある場合、ログアウトを表示
          session && (
            <div>
              <H2>ようこそ, {session.user && session.user.email}さん</H2>
              <StyledButton onClick={() => signOut()}>ログアウト</StyledButton>
            </div>
          )
        }
        {
          // セッションがない場合、ログインを表示
          // ログインボタンを押すと、ログインページに遷移する
          !session && (
            <div>
              <H2>ログインしていません</H2>
              <StyledButton onClick={() => signIn()}>ログイン</StyledButton>
            </div>
          )
        }
      </Container>
    </>
  );
};

export default Login;
