import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const url = req.query.word?.toString().trim();
  const { exec } = require("child_process");
  exec(
    `echo \"\" | openssl s_client -showcerts ${url}:443`,
    (error: any, stdout: any, stderr: any) => {
      res.status(200).json({ url, stdout, error, stderr });
    }
  );
}
