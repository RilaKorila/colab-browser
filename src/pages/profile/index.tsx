import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { HeaderMenu } from "components/HeaderMenu";
import { authOptions } from "pages/api/auth/[...nextauth]";

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
      <div>
        <h1>プロフィール</h1>
        <p>{props.name}</p>
        <p>{props.email}</p>
        <Image src={props.image} alt="profile image" width={96} height={96} />
      </div>
      <button onClick={() => signOut()}>Sign Out</button>
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
