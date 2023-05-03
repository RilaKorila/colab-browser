import { Result } from "../../../types";
import { HelpFormInput } from "../../libs/zod";
import { handleFetchReject, handleFetchResolve } from "./apiRoutes";

type HelpFormResponse = { redirectUrl: string };

export const postHelpForm = (
  input: HelpFormInput
): Promise<Result<HelpFormResponse>> => {
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
