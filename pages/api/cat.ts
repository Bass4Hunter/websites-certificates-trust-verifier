import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { exec } = require("child_process");
  exec("cat public/result.txt ", (error: any, stdout: any, stderr: any) => {
    if (error) {
      return;
    }

    if (stderr) {
      return;
    }
    res.status(200).json({ result: stdout });
  });
}
