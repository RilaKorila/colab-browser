import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Footer, Container } from '../components/Layout'
import styled from 'styled-components'
import { client } from "../libs/client";
import { Colab } from '../interface'


const StyledHeader = styled.div`
  top: 0;
  right: 0;
  text-align: center;
  background-color: transparent;
  position: absolute;

  >ul{
    display:flex;
    justify-content: flex-end;
    align-items: center;
    
    >li{
      list-style: none;
      font-size: 16px;
      color: white;
      opacity: 0.7;
      padding:10px 30px;
    }
  }
`;

const Top = styled.div`
  padding: 180px 0 100px 0;
  height: 400px;
  position: relative;
  text-align: center;

  >h1{
    font-size: 5.0em;
    opacity: 0.7;
    letter-spacing: 5px;
    text-align: center;
    color: white;
  }
`;

const Card = styled.a`
  display: inline-block;
  margin: 20px 10px;
  padding: 10px;
  text-align: left;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 45%;
  height: 80px;

  &:hover{
    color: #0070f3;
    border-color: #0070f3;
  }

  >h2{
    margin: 0 0 1rem 0;
    font-size: 2.0rem;
  }

  >p{
    margin: 0;
    font-size: 1.3rem;
  }
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 10px auto;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;


const Home: NextPage = ({colab}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>Enjoy Computer Science</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Top>
      <Image alt="Picture of starry sky" src="/starry_sky.jpg" layout="fill" />
      <StyledHeader>
        <ul>
          <li>Home</li>
          <li>Search</li>
          <li>Library</li>
          <li>Help</li>
        </ul>
      </StyledHeader>
      <h1>
        Let&apos;s Enjoy Computer Science !
      </h1>
    </Top>

    <Container>
      <h2>気になるテーマからはじめてみよう！</h2>
    <Grid>
      {colab.map((colab: Colab) => (
        <Card
          href={colab.url} key={colab.id}
        >
          <h2>{colab.name}</h2>
        </Card>
      ))}
    </Grid>
    </Container>
    {/*
        next.js ページへのリンク
        <Link href={`/blog/${colab.id}`}>
                    <a>{colab.name}</a>
                  </Link><Link href={`/blog/${colab.id}`}>
                    <a>{colab.name}</a>
                  </Link>
        */}

    <Footer>
      <p>Let&apos;s Enjoy Programming !!</p>
      {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
    </Footer>
  </>
)


// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "colab-url" });

  return {
    props: {
      colab: data.contents,
    },
  };
};



export default Home