import { GetStaticProps } from "next";
import Link from "next/link";
import { Footer, Container, H2, MyHeader } from '../../components/Layout'
import { Colab } from "../../interface";
import CardGrid from "../../components/CardGrid";

type Props = {
    items: Colab[]
}

export const sampleColabData: Colab[] = [
    {
        id: "id0001",
        createdAt: "2021",
        url: "https://colab.research.google.com/notebooks/intro.ipynb",
        name: "intro",
        skill: ["分岐"]
    },
    {
        id: "id0002",
        createdAt: "2021",
        url: "https://colab.research.google.com/notebooks/intro.ipynb#scrollTo=UdRyKR44dcNI",
        name: "intro",
        skill: ["分岐"]
    }]

const WithStaticProps = ({items}: Props) => {
    return(
        <>
        <MyHeader/>
        <Container>
        <H2>気になるテーマからはじめてみよう！</H2>
            <CardGrid  items={items} />
        </Container>
        {console.log(items)}
        <p>
            <Link href="/">
                <a>Go Home</a>
            </Link>
        </p>
        </>
    )
}

export const getStaticProps: GetStaticProps = async() => {
    const items: Colab[] = sampleColabData
    return {props: {items}}
}

export default WithStaticProps