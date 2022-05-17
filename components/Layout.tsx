import styled from 'styled-components'
import Link from 'next/link';

export const Footer = styled.footer`
    width: 100%;
    height: 100px;
    border-top: 1px solid #eaeaea;
    font-size: 1.5em
`;

export const Container = styled.div`
text-align: center;
color: #333;

>h2{
    margin-top: 100px;
}

>p{
    font-size: 2.4em;
}
`;

export const H1 = styled.h1`
    font-size: 5.0em;
    letter-spacing: 2px;
    color: #444;
`;

export const H2 = styled.h2`
    font-size: 4.0em;
    letter-spacing: 2px;
    color: #444;
`;

const StyledMyHeader = styled.div`
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

const BaseHeader = styled.div`
    background-color: #10071E;
    height: 50.5px;
    position: relative;
`;

export const MyHeader = () => {
    return (
        <>
        <BaseHeader/>
        <StyledMyHeader>
            <ul>
                <li><Link href="/">Home</Link></li>
                {/* <li>Search</li> */}
                <li><Link href="/posts/">Library</Link></li>
                <li>Help</li>
            </ul>
        </StyledMyHeader>
        </>
    )
}