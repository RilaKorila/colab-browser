import { GetServerSideProps } from "next";
import Link from "next/dist/client/link";
import { MyHeader } from "../../components/Layout";
import { loginWithFirebase } from "libs/firebaseConfig";

type Props = {
  isAuthorized: boolean;
};

const Page = (props: Props) => {
  return (
    <>
      <MyHeader />
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
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const email = "murakami.ayana3@gmail.com";
  const password = "Mooomin";

  const isAuthorized = await loginWithFirebase(email, password);
  console.log(isAuthorized);
  return { props: { isAuthorized } };
};

export default Page;
