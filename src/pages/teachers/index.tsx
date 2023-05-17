import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormErrorMessage from "../../components/FormErrorMessage";
import { HeaderMenu } from "components/HeaderMenu";
import { Container, H2 } from "components/Layout";
import { TeacherPageInput, teacherPageSchema } from "libs/zod";
import { postColabUrl } from "services/client/postColabUrl";

const StyledHelpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  > label {
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
      font-size: 24px;
    }
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

const Warning = styled.p`
  color: red;
  font-size: 16px;
`;

const Page: NextPage = () => {
  // use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherPageInput>({
    // zodのスキーマを指定する
    // 再帰が深くて型エラーが起こるが、対処しきれないため踏み潰した
    // @ts-ignore
    resolver: zodResolver(teacherPageSchema),
  });

  return (
    <>
      <HeaderMenu />
      <Container>
        <H2>リンク追加ページ</H2>

        <StyledHelpForm
          // handleSubmitの引数の関数を実行する前に、resolverで指定したvalidationを実行
          onSubmit={handleSubmit(async (values) => {
            const { data, err } = await postColabUrl(values);

            if (err) {
              console.error(err.message);
              return;
            }
            console.log("Response: ", data);
          })}
        >
          <label htmlFor="author">
            <p>名前</p>
            {/* zodのstateForm.errorsとregisterを用いたformを設置 */}
            <StyledInput type="text" id="author" {...register("author")} />
          </label>
          {errors.author?.message && <FormErrorMessage />}

          <label htmlFor="title">
            <p>タイトル</p>
            <StyledInput type="title" id="title" {...register("title")} />
          </label>
          {errors.title?.message && <FormErrorMessage />}

          <label htmlFor="url">
            <p>ColaboratoryのURL</p>
            <StyledInput type="text" id="url" {...register("url")} />
          </label>
          {errors.url?.message && <FormErrorMessage />}

          <StyledButton>送信</StyledButton>
          <Warning>
            ※ 送信前にColaboratory Notebookの公開設定を必ずご確認ください
          </Warning>
        </StyledHelpForm>
      </Container>
    </>
  );
};

export default Page;
