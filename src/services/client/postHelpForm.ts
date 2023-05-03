import { Result } from "../../../types";
import { handleFetchReject, handleFetchResolve } from "./apiRoutes";

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

export default postHelpForm;
