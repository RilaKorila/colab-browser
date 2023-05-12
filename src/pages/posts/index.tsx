import { GetStaticProps } from "next";
import CardGrid from "../../components/CardGrid";
import { Container, H2 } from "../../components/Layout";
import { Colab } from "../../interface";
import { client } from "../../libs/client";
import { HeaderMenu } from "components/HomeHeader";

type Props = {
  items: Colab[];
};

const WithStaticProps = ({ items }: Props) => {
  return (
    <>
      <HeaderMenu />

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
