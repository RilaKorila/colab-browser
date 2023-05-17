import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  > label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledTextarea = styled.textarea`
  margin: 10px;
  resize: none;
`;

export const StyledInput = styled.input`
  margin: 10px;
  resize: none;
`;

export const StyledButton = styled.button`
  display: block;
  margin-top: 20px;
  width: 100px;
`;
