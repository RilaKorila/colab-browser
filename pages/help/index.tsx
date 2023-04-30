import { GetStaticProps } from "next";
import { Footer, Container, H2, MyHeader } from "../../components/Layout";
import { Colab } from "../../interface";
import HelpForm from "../../components/HelpForm";
import { client } from "../..//libs/client";
import { z } from "zod";

type Props = {
  items: Colab[];
};
// creating a schema for strings
const User = z.object({
  username: z.string(),
  email: z.string().email(),
});

const WithStaticProps = ({ items }: Props) => {
  // extract the inferred type
  type User = z.infer<typeof User>;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(event.target);
    const formData = new FormData(event.target);
    // ↓ここを変える
    const data: User = {
      username: "aaaa", // usernameInput.value,
      email: "aaaa@gmail.com",
    };

    try {
      User.parse(data);
    } catch {
      console.error("validation failed");
    }

    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const res = fetch("api/hello", config);
    console.log("result: ", res);
  };
  return (
    <>
      <MyHeader />

      <Container>
        <H2>お問い合わせ</H2>
        <HelpForm submitHandler={handleSubmit} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "colab-url" });
  const items: Colab[] = data.contents;

  return {
    props: { items },
  };
};

export default WithStaticProps;
