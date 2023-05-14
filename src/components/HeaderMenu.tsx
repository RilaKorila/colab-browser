import { useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import { ProfileLink } from "./ProfileLink";

const StyledHeader = styled.div`
  top: 0;
  right: 0;
  text-align: center;
  background-color: black;
  position: absolute;

  > ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > li {
      list-style: none;
      font-size: 16px;
      color: white;
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
  const { data: session } = useSession();
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
          {!session && (
            <li>
              <Link href="/login2/">Login</Link>
            </li>
          )}
          {session && session.user?.image && (
            <ProfileLink
              name={session.user.name ? session.user.name : ""}
              image={session.user.image ? session.user.image : null}
            />
          )}
        </ul>
      </StyledHeader>
    </>
  );
};
