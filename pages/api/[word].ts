import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const word = req.query.word
  const temp = word!.toString()
  const aea = temp.trim()
  const { exec } = require('child_process');
  console.log(word)
  // exec(`openssl s_client -showcerts ${aea}:443 > result.txt`)
  exec(`openssl s_client -showcerts ${aea}:443 > result.txt`)
  res.status(200).json('done')
}