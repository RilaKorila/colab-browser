import { GetServerSideProps } from "next";
import Link from "next/dist/client/link";
import { HeaderMenu } from "../../components/HeaderMenu";
// import { loginWithFirebase } from "libs/firebaseConfig";

type Props = {
  isAuthorized: boolean;
};

const Page = (props: Props) => {
  return (
    <>
      <HeaderMenu />
      {props.isAuthorized && <h1>Hello, You are author</h1>}
      {!props.isAuthorized && (
        <>
          <h1>Go back to Home Page</h1>
          <Link href="/">Home</Link>
        </>
      )}
    </>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  const email = "murakami.ayana3@gmail.com";
  const password = "Mooomin03";

  // const isAuthorized = await loginWithFirebase(email, password);
  const isAuthorized = true;
  console.log(isAuthorized);
  return { props: { isAuthorized } };
};

export default Page;
