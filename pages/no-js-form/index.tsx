import styled from "styled-components";

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

export default function PageWithoutJSbasedForm() {
  return (
    <>
      <StyledHelpForm action="/api/hello" method="post">
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
}
