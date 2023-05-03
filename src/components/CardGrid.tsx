import Card from "./Card";
import { Colab } from "../../interface";
import styled from "styled-components";

type Props = {
  items: Colab[];
};

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

const CardGrid = ({ items }: Props) => {
  return (
    <Grid>
      {items.map((item) => (
        <Card data={item} key={item.id} />
      ))}
    </Grid>
  );
};

export default CardGrid;
