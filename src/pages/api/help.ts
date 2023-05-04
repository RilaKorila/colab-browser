// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { ApiHandler, Result } from "../../../types";
import { succeed, failed } from "../../services/client/apiRoutes";
import { HelpFormResponse } from "../../services/client/postHelpForm";
import { helpFormSchema } from "libs/zod";

const handleHelpForm: ApiHandler<HelpFormResponse> = async (req, res) => {
  try {
    // API側でもvalidationを行う
    const payload = helpFormSchema.parse(req.body);
    res.status(200).json(succeed({ redirectUrl: "path/to/page", payload }));
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json(failed({ message: "Invalid Request" }));
      return;
    }
    res.status(500).json(failed({ message: "Internal Server Error" }));
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<HelpFormResponse>>
) {
  switch (req.method) {
    case "POST":
      return handleHelpForm(req, res);
    default:
      res.status(405).end();
      return;
  }
}
