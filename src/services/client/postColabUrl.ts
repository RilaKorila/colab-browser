import { Result } from "../../../types";
import { handleFetchReject, handleFetchResolve } from "./apiRoutes";
import { TeacherPageInput } from "libs/zod";

export type TeacherPageResponse = { status: string };

export const postColabUrl = (
  input: TeacherPageInput
): Promise<Result<TeacherPageResponse>> => {
  return fetch("api/fetch", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(input),
  })
    .then((res) => handleFetchResolve<TeacherPageResponse>(res))
    .catch(handleFetchReject);
};
