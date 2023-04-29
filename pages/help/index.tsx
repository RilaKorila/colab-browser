import { GetStaticProps } from "next";
import { Footer, Container, H2, MyHeader } from "../../components/Layout";
import { Colab } from "../../interface";
import HelpForm from "../../components/HelpForm";
import { client } from "../..//libs/client";

type Props = {
  items: Colab[];
};

const WithStaticProps = ({ items }: Props) => {
  return (
    <>
      <MyHeader />

      <Container>
        <H2>お問い合わせ</H2>
        <HelpForm />
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
