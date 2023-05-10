import { styled } from "styled-components";
import { Colab } from "../interface";

type Props = {
  data: Colab;
};

const StyledLink = styled.a`
  display: inline-block;
  margin: 20px 10px;
  padding: 10px;
  text-align: left;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 45%;
  height: 100px;

  &:hover {
    cursor: pointer;
    color: #b88884;
    border-color: #b88884;
  }

  > h2 {
    margin: 0 0 1rem 0;
    font-size: 2rem;
  }

  > p {
    margin: 0;
    font-size: 1.3rem;
  }
`;
const Card = ({ data }: Props) => {
  // (TODO)分岐・反復を学習した後に、挑戦してみてください！　といれる
  // const sklls = data.skill.map((item) => ())
  return (
    <StyledLink href={`/posts/${data.id}`}>
      <h2>{data.name}</h2>
      <p>これは、{data.name}のプログラムです。</p>
      <p>分岐・反復を学習した後に、挑戦してみてください！</p>
    </StyledLink>
  );
};

export default Card;
