import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const certificate = req.body.certificate;
  const { exec } = require("child_process");
  exec(
    `echo \"${certificate}\" > public/website.pem && openssl x509 -in public/website.pem -noout -text`,
    (error: any, stdout: any, stderr: any) => {
      res.status(200).json({ stdout, error, stderr });
    }
  );
}
