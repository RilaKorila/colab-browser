import { zodResolver } from "@hookform/resolvers/zod";
// import { loginWithFirebase } from "libs/firebaseConfig";
// import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormErrorMessage from "../../components/FormErrorMessage";
import { Container, H2, MyHeader } from "../../components/Layout";
import { LoginInput, loginSchema } from "../../libs/zod/index";
import { postLogin } from "../../services/client/postLogin";

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

const StyledInput = styled.input`
  margin: 10px;
  resize: none;
`;

const StyledButton = styled.button`
  display: block;
  margin-top: 20px;
  width: 100px;
`;

type Props = {
  value: string;
};

const LoginPage = (props: Props) => {
  // use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    // zodのスキーマを指定する
    // 再帰が深くて型エラーが起こるが、対処しきれないため踏み潰した
    // @ts-ignore
    resolver: zodResolver(loginSchema),
  });

  return (
    <>
      <MyHeader />
      <Container>
        <H2>ログイン</H2>
        <p>{props.value}</p>
        <StyledHelpForm
          // handleSubmitの引数の関数を実行する前に、resolverで指定したvalidationを実行
          onSubmit={handleSubmit(async (values: LoginInput) => {
            const { data, err } = await postLogin(values);

            if (err) {
              console.error(err);
              return;
            }
            console.log("Response: ", data);
          })}
        >
          <label htmlFor="email">
            <p>e-mail</p>
            {/* zodのstateForm.errorsとregisterを用いたformを設置 */}
            <StyledInput type="text" id="email" {...register("email")} />
          </label>
          {errors.email?.message && <FormErrorMessage />}

          <label htmlFor="password">
            <p>パスワード</p>
            <StyledInput
              type="password"
              id="password"
              {...register("password")}
            />
          </label>
          {errors.password?.message && <FormErrorMessage />}

          <StyledButton>ログイン</StyledButton>
        </StyledHelpForm>
      </Container>
    </>
  );
};

export default LoginPage;
