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
    return(
        <StyledLink>
            <h2>{data.name}</h2>
            <Link href="users/[id]" as={`users/${data.id}`}>
                <a>
                    {data.id}: {data.name}
                </a>
            </Link>
        </StyledLink>
    )
}

export default Card