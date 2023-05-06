import { Zodios } from "@zodios/core";
import { z } from "zod";

export const helpFormApi = new Zodios("https://localhost:8080", [
  {
    method: "post",
    path: "/api/help", // auto detect :id and ask for it in apiClient get params
    alias: "postHelpForm", // optional alias to call this endpoint with it
    description: "post a help form",
    response: z.object({
      data: z.string(),
      err: z.string(),
    }),
  },
]);
