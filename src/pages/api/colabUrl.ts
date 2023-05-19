import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { ApiHandler, Result } from "../../../types";
import { TeacherPageResponse } from "../../services/client/postColabUrl";
import { succeed, failed } from "../../services/client/apiRoutes";
import { teacherPageSchema } from "libs/zod";

const handleColabUrl: ApiHandler<TeacherPageResponse> = async (req, res) => {
  try {
    // API側でもvalidationを行う
    const payload = teacherPageSchema.parse(req.body);
    res.status(200).json(succeed({ status: "Successfully posted", payload }));
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json(failed({ message: "Invalid Request" }));
      return;
    }
    // user認証に失敗しているなら401

    // それ以外は500
    res.status(500).json(failed({ message: "Internal Server Error" }));
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<TeacherPageResponse>>
) {
  switch (req.method) {
    case "POST":
      return handleColabUrl(req, res);
    default:
      res.status(405).end();
      return;
  }
}
