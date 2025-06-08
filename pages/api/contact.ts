import type { NextApiRequest, NextApiResponse } from 'next';
import { sendContactEmail } from '../../lib/sendEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      await sendContactEmail({ name, email, message });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Email send failed' });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
