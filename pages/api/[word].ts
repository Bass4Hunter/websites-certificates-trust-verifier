import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const word = req.query.word;
  const temp = word!.toString();
  const aea = temp.trim();
  const { exec } = require("child_process");
  exec(`cat ${aea}`, (error: any, stdout: any, stderr: any) => {
    if (error) {
      return;
    }

    if (stderr) {
      return;
    }
    res.status(200).json({ result: stdout });
  });
}
