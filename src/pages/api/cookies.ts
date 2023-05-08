import type { NextApiHandler } from "next";
import nookies from "nookies";

type Data = {
  isAuthorized: boolean;
};

const handler: NextApiHandler<Data> = (req, res) => {
  console.log(req);
  const cookies = nookies.get({ req });
  const isAuthorized = true;

  nookies.set({ res }, "isAuthorized", `${isAuthorized}`);
  res.status(200).json({ isAuthorized });
};
