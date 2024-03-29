import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";
import { HeaderMenu } from "components/HeaderMenu";
import { Container, H2, StyledButton } from "components/Layout";
import { authOptions } from "pages/api/auth/[...nextauth]";

const StyledProfile = styled.div`
  margin: 20px;
  p {
    font-size: 16px;
  }

  img {
    margin-top: 20px;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const UserItem = {
    name: session.user?.name,
    email: session.user?.email,
    image: session.user?.image,
  };

  return {
    props: UserItem,
  };
};

type Props = {
  name: string;
  email: string;
  image: string;
};

const Page: NextPage<Props> = (props) => {
  return (
    <>
      <HeaderMenu />
      <Container>
        <StyledProfile>
          <H2>プロフィール</H2>
          <p>名前：{props.name}</p>
          <p>メールアドレス：{props.email}</p>
          <Image src={props.image} alt="profile image" width={96} height={96} />
        </StyledProfile>
        <StyledButton onClick={() => signOut()}>Sign Out</StyledButton>
      </Container>
    </>
  );
};

// const Page: NextPage = () => {
//   const { data: session } = useSession({ required: true });

//   return (
//     <>
//       {session && (
//         <div>
//           <h1>プロフィール</h1>
//           <div>{session.user?.email}</div>
//           {session.user?.image && (
//             <div>
//               <Image
//                 src={session.user?.image}
//                 alt="profile image"
//                 width={96}
//                 height={96}
//               />
//             </div>
//           )}
//           <button onClick={() => signOut()}>Sign Out</button>
//         </div>
//       )}
//       {!session && (
//         <div>
//           <p>You are not signed in</p>
//         </div>
//       )}
//     </>
//   );
// };

export default Page;
