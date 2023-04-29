// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);

  if (!req.body.username) {
    return res.status(400).json({ data: "name not found" });
  }

  res.status(200).json({ data: req.body.name });
}
