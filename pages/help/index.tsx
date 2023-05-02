import { Container, H2, MyHeader } from "../../components/Layout";
import HelpForm from "../../components/HelpForm";
import { z } from "zod";

// creating a schema for strings
const User = z.object({
  username: z.string(),
  email: z.string().email(),
});

const HelpPage = () => {
  // extract the inferred type
  type User = z.infer<typeof User>;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(event.target);
    // const formData = new FormData(event.target);
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

    const res = fetch("api/hello", config);
    console.log("result: ", res);
  };
  return (
    <>
      <MyHeader />

      <Container>
        <H2>お問い合わせ</H2>
        <HelpForm submitHandler={handleSubmit} />
      </Container>
    </>
  );
};

export default HelpPage;
