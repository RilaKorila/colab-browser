import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "./auth/[...nextauth]";

type Data = {
  message: string;
};
const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req, secret });
  console.log("JSON Web Token", token);

  if (!session) {
    res.status(401).json({
      message: "You must be logged in",
    });
  }

  console.log("7//////////////////////////");
  console.log("[handler] session: ", session);
  console.log("[handler] token: ", token);
  console.log("7//////////////////////////");

  return res.json({
    message: "Success",
  });
};

export default handler;
