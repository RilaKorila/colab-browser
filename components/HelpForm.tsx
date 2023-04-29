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

const StyledButton = styled.input`
  display: block;
  margin-top: 20px;
  width: 100px;
`;

const HelpForm = () => {
  return (
    <>
      {/* <StyledHelpForm> */}
      <StyledHelpForm action="submit">
        <label htmlFor="help-form__username">
          <p>名前</p>
          <StyledInput type="text" id="help-form__username" required />
        </label>
        <label htmlFor="help-form__email">
          <p>e-mail</p>
          <StyledInput type="text" id="help-form__email" required />
        </label>
        <label htmlFor="help-form__content">
          <p>内容</p>
          <StyledTextarea
            id={"help-form__content"}
            rows={8}
            cols={50}
            required
          ></StyledTextarea>
        </label>
        <StyledButton
          type="submit"
          className="help-form__button"
          name="送信"
          onSubmit={handleSubmit}
        />
      </StyledHelpForm>
    </>
  );
};

// extract the inferred type
type User = z.infer<typeof User>;

const handleSubmit = () => {
  // event.prevent()
  const usernameInput = document.getElementById(
    "help-form__username"
  ) as HTMLInputElement;
  const emailInput = document.getElementById(
    "help-form__email"
  ) as HTMLInputElement;
  console.log(usernameInput.value);
  console.log(emailInput.value);

  try {
    User.parse({
      username: usernameInput.value,
      email: emailInput.value,
    });
  } catch {
    console.error("validation failed");
  }
};

export default HelpForm;
