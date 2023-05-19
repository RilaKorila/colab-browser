import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../components/FormErrorMessage";
import { Container, H2 } from "../../components/Layout";
import { helpFormSchema, HelpFormInput } from "../../libs/zod/index";
import { postHelpForm } from "../../services/client/postHelpForm";
import {
  StyledForm,
  StyledButton,
  StyledTextarea,
  StyledInput,
} from "components/FormLayout";
import { HeaderMenu } from "components/HeaderMenu";

const HelpPage = () => {
  // use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelpFormInput>({
    // zodのスキーマを指定する
    // 再帰が深くて型エラーが起こるが、対処しきれないため踏み潰した
    // @ts-ignore
    resolver: zodResolver(helpFormSchema),
  });

  return (
    <>
      <HeaderMenu />
      <Container>
        <H2>お問い合わせ</H2>
        <StyledForm
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
            <StyledInput type="text" id="username" {...register("username")} />
          </label>
          {errors.username?.message && <FormErrorMessage />}

          <label htmlFor="email">
            <p>e-mail</p>
            <StyledInput type="email" id="email" {...register("email")} />
          </label>
          {errors.email?.message && <FormErrorMessage />}

          <label htmlFor="content">
            <p>内容</p>
            <StyledTextarea
              id="content"
              rows={8}
              cols={50}
              {...register("content")}
            ></StyledTextarea>
            {errors.content?.message && <FormErrorMessage />}
          </label>
          <StyledButton>送信</StyledButton>
        </StyledForm>
      </Container>
    </>
  );
};

export default HelpPage;
