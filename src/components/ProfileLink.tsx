import Image from "next/image";
import styled from "styled-components";

const StyledProfile = styled.div`
  width: 96px;
  height: 36px;
  background-color: #333333;
  display: flex;
  align-items: center;
  border-radius: 5%;
  position: relative;

  a {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  a:hover {
    opacity: 0.5;
    background-color: white;
  }

  img {
    border-radius: 5%;
  }

  p {
    color: white;
    margin: 0 10px;
  }
`;

type Props = {
  name: string;
  image: string | null;
};

export const ProfileLink = ({ name, image }: Props) => {
  return (
    <StyledProfile>
      <a href="/profile"></a>
      {image && (
        <Image src={image} alt="profile image" width={36} height={36} />
      )}
      <p>{name}</p>
    </StyledProfile>
  );
};
