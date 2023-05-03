import { GetStaticProps } from "next";
import { Container, H2, MyHeader } from "../../components/Layout";
import { Colab } from "../../../interface";
import CardGrid from "../../components/CardGrid";
import { client } from "../../libs/client";

type Props = {
  items: Colab[];
};

const WithStaticProps = ({ items }: Props) => {
  return (
    <>
      <MyHeader />

      <Container>
        <H2>気になるテーマからはじめてみよう！</H2>
        <CardGrid items={items} />
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
