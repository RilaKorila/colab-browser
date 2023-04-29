import React from "react";
import styled from "styled-components";
import { z } from "zod";

// creating a schema for strings
const User = z.object({
  username: z.string(),
  email: z.string().email(),
});

// parsing

// type Props = {
// }

const StyledHelpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  > label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTextarea = styled.textarea`
  margin: 10px;
  resize: none;
`;

const StyledInput = styled.input`
  margin: 10px;
  resize: none;
`;

const StyledButton = styled.button`
  display: block;
  margin-top: 20px;
  width: 100px;
`;

const HelpForm: React.FC = () => {
  // extract the inferred type
  type User = z.infer<typeof User>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(event.target);
    console.log("----------------");
    // const usernameInput = document.querySelector(
    //   "#username"
    // ) as HTMLInputElement;
    // const emailInput = document.querySelector("#email") as HTMLInputElement;
    // console.log(usernameInput.value);
    // console.log(emailInput.value);
    // ↓ここを変える
    const data: User = {
      username: "aaaa", // usernameInput.value,
      email: "aaaa@gmail.com",
    };

    try {
      User.parse(data);
    } catch {
      console.error("validation failed");
    }

    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const res = await fetch("api/hello", config);
    console.log("result: ", res);
  };

  return (
    <>
      <StyledHelpForm onSubmit={handleSubmit}>
        <label htmlFor="username">
          <p>名前</p>
          <StyledInput type="text" id="username" name="username" required />
        </label>
        <label htmlFor="email">
          <p>e-mail</p>
          <StyledInput type="text" id="email" name="email" required />
        </label>
        <label htmlFor="content">
          <p>内容</p>
          <StyledTextarea
            id="content"
            name="content"
            rows={8}
            cols={50}
            required
          ></StyledTextarea>
        </label>
        <StyledButton type="submit" name="SubmitBtn">
          送信
        </StyledButton>
      </StyledHelpForm>
    </>
  );
};

export default HelpForm;
