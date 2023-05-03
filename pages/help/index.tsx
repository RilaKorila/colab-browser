import { Container, H2, MyHeader } from "../../components/Layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Result } from "../../types";
import {
  handleFetchReject,
  handleFetchResolve,
} from "../../src/services/client/apiRoutes";
import FormErrorMessage from "../../components/FormErrorMessage";

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

// creating a schema for strings
const helpFormSchema = z.object({
  username: z.string().nonempty({ message: "名前は必須です" }),
  email: z.string().email("メールアドレスの形が正しくありません"),
  content: z.string().nonempty({ message: "質問内容は必須です" }),
});

type HelpFormSchemaType = z.infer<typeof helpFormSchema>;
type HelpFormResponse = { redirectUrl: string };
type Inputs = {
  username: string;
  email: string;
  content: string;
};

const postHelpForm = (input: Inputs): Promise<Result<HelpFormResponse>> => {
  return fetch("api/help", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((res) => handleFetchResolve<HelpFormResponse>(res))
    .catch(handleFetchReject);
};

const HelpPage = () => {
  // use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelpFormSchemaType>({
    // zodのスキーマを指定する
    resolver: zodResolver(helpFormSchema),
  });

  return (
    <>
      <MyHeader />
      <Container>
        <H2>お問い合わせ</H2>
        <StyledHelpForm
          // handleSubmitの引数の関数を実行する前に、resolverで指定したvalidationを実行
          onSubmit={handleSubmit(async (values) => {
            const { data, err } = await postHelpForm(values);

            if (err) {
              console.error(err.message);
              return;
            }
            console.log("Response: ", data);
          })}
        >
          <label htmlFor="username">
            <p>名前</p>
            {/* zodのstateForm.errorsとregisterを用いたformを設置 */}
            <StyledInput
              type="text"
              id="username"
              {...register("username", { required: true })}
            />
          </label>
          {errors.username?.message && <FormErrorMessage />}

          <label htmlFor="email">
            <p>e-mail</p>
            <StyledInput
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email?.message && <FormErrorMessage />}

          <label htmlFor="content">
            <p>内容</p>
            <StyledTextarea
              id="content"
              rows={8}
              cols={50}
              {...register("content", { required: true })}
            ></StyledTextarea>
            {errors.content?.message && <FormErrorMessage />}
          </label>
          <StyledButton>送信</StyledButton>
        </StyledHelpForm>
      </Container>
    </>
  );
};

export default HelpPage;
