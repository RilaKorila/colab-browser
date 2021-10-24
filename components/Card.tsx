import { Colab } from '../interface'
import Link from "next/link"
import styled from 'styled-components'

type Props = {
    data: Colab
}

const StyledLink = styled.div`
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
        cursor: pointer;
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
`
const Card = ({data}: Props) => {
    // (TODO) Cardの高さを調整
    // 分岐・反復を学習した後に、挑戦してみてください！　といれる
    // const sklls = data.skill.map((item) => ())
    return(
        <StyledLink>
            <h2>{data.name}</h2>
            <Link href={`posts/${data.id}`}>
                <a>
                    これは、{data.name}のプログラムです。
                </a>
            </Link>
            {/* <p>「」を学習した後に、挑戦してみてください！</p> */}
        </StyledLink>
    )
}

export default Card