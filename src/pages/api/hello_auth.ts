import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({
      message: "You must be logged in",
    });
  }

  return res.json({
    message: "Success",
  });
};

export default handler;
