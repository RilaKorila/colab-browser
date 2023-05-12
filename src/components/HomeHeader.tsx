import Link from "next/link";
import styled from "styled-components";

// (TODO) Layoutを呼び出す + position, ul>li>>color のみ変更
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

export const HeaderMenu = () => {
  return (
    <>
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
          <li>
            <Link href="/login2/">Login</Link>
          </li>
        </ul>
      </StyledHeader>
    </>
  );
};
