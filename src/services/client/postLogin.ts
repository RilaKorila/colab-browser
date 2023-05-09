import { Result } from "../../../types";
import { LoginInput } from "../../libs/zod";
import { handleFetchReject, handleFetchResolve } from "./apiRoutes";
import { loginWithFirebase } from "libs/firebase/firebaseSample";

export type LoginResponse = { redirectUrl: string };

export const postLogin = (
  input: LoginInput
): Promise<Result<LoginResponse>> => {
  console.log("login");

  loginWithFirebase(input.email, input.password);
  console.log("before fetch");

  return (
    fetch("api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => handleFetchResolve<LoginResponse>(res))
      // .then((json) => {
      //   console.log(json.data);
      // })
      .catch(handleFetchReject)
  );
};
