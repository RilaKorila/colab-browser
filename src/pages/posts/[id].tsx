import { MyHeader, H1, H2 } from "../../components/Layout";
import { GetStaticProps, GetStaticPaths } from "next";
import { Colab } from "../../../interface";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../libs/client";
import styled from "styled-components";

type Props = {
  item?: Colab;
  errors?: string;
};

const Contents = styled.div`
  text-aligin: center;
  margin: 40px auto;
  max-width: 1000px;
  text-align: center;

  > a {
    display: inline-block;
    width: 300px;
    background-color: #b88884;
    color: white;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    border-radius: 5px;
    margin-top: 30px;
  }
`;

const Discription = styled.div`
  margin-top: 100px;
  border-top: 1px #aaa solid;
  text-align: start;
  > ol {
    > li {
      color: #333;
      font-size: 4em;
      padding: 5px 0;
    }
  }
`;

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <>
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </>
    );
  } else {
    const url = item === undefined ? "error" : item.url;
    return (
      <>
        <MyHeader />

        <Contents>
          <H1>{item?.name}</H1>
          <Link href={url}>
            <a>Google Colaboratoryファイルを見る</a>
          </Link>
          <Discription>
            <H2>使い方</H2>
            <ol>
              <li>
                「Google Colaboratoryファイルを見る」ボタンをクリック
                <Image
                  src="/colab_btn.png"
                  alt="colab file header"
                  width={400}
                  height={80}
                />
              </li>
              <li>
                「ドライブにコピー」をクリック
                <Image
                  src="/colab1.png"
                  alt="colab file header"
                  width={900}
                  height={200}
                />
              </li>
              <li>自分のGoogle Driveにアクセスし問題に挑戦！</li>
            </ol>
            <p></p>
          </Discription>
        </Contents>
      </>
    );
  }
};

export default StaticPropsDetail;

// Get the paths we want to pre-render based on colabs
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "colab-url" });
  const colabData: Colab[] = data.contents;

  const paths = colabData.map((colab) => ({
    params: { id: colab.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await client.get({ endpoint: "colab-url" });
  const colabData: Colab[] = data.contents;

  const id = params?.id;
  const item = colabData.find((data) => data.id === id);
  return { props: { item } };
  // try {
  //     const id = params?.id
  //     const item = sampleColabData.find((data) => data.id === id)
  //     return {props: { item }}
  // }
  // catch (err) {
  //     const ex:Error = err;
  //     return { props: { errors: ex.message } }
  // }
};
