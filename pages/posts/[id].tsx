import { Container, MyHeader, H1 } from "../../components/Layout";
import { GetStaticProps, GetStaticPaths } from 'next'
import { Colab } from "../../interface";
import Link from "next/link"
import { client } from "../../libs/client";
import styled from "styled-components";

type Props = {
    item?: Colab,
    errors?: string
}

const Contents = styled.div`
    text-aligin: center;
    margin: 10px 30px;

    >a{
        display: inline-block;
    }
`;

const StaticPropsDetail = ({item, errors}: Props) => {
    if(errors){
        return(
            <>
            <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
            </p>
            </>
        )
    }
    else{
        const url = item === undefined? "error" : item.url
        return(
            <>
            <MyHeader/>
            <Contents>
                <H1>{item?.name}</H1>
                <Link href={url}>
                    <a>サイトにジャンプ</a>
                </Link>
            </Contents>
            </>
        )
    }
}

export default StaticPropsDetail

// Get the paths we want to pre-render based on colabs
export const getStaticPaths: GetStaticPaths= async() => {
    const data = await client.get({ endpoint: "colab-url" });
    const colabData: Colab[] = data.contents

    const paths = colabData.map((colab) => ({
            params: { id: colab.id.toString() }
    }))

    return ({ 
        paths,
        fallback: false,
    })
}

export const getStaticProps: GetStaticProps = async({params}) => {
    const data = await client.get({ endpoint: "colab-url" });
    const colabData: Colab[] = data.contents

    const id = params?.id
    const item = colabData.find((data) => data.id === id)
    return {props: { item }}
    // try {
    //     const id = params?.id
    //     const item = sampleColabData.find((data) => data.id === id)
    //     return {props: { item }}
    // }
    // catch (err) {
    //     const ex:Error = err;
    //     return { props: { errors: ex.message } }
    // }
}