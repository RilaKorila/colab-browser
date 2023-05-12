import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.div`
  top: 0;
  right: 0;
  text-align: center;
  background-color: transparent;
  position: absolute;

  > ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > li {
      list-style: none;
      font-size: 16px;
      color: white;
      opacity: 0.7;
      padding: 10px 30px;
    }
  }
`;

const BaseHeader = styled.div`
  background-color: #10071e;
  height: 50.5px;
  position: relative;
`;

export const HeaderMenu = () => {
  return (
    <>
      <BaseHeader />
      <StyledHeader>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {/* <li>Search</li> */}
          <li>
            <Link href="/posts/">Library</Link>
          </li>
          <li>
            <Link href="/help/">Help</Link>
          </li>
        </ul>
      </StyledHeader>
    </>
  );
};
