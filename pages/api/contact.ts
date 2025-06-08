import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/firestore'
import { sendEmail } from '../../lib/email'
import { rateLimit } from '../../middleware/ratelimit'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const passed = await rateLimit(req, res)
  if (!passed) return

  const { name, email, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required.' })

  try {
    await db.collection('contacts').add({ name, email, message, timestamp: new Date() })
    await sendEmail(name, email, message)
    res.status(200).json({ message: 'Message sent successfully.' })
  } catch (err) {
    res.status(500).json({ message: 'Error sending message.' })
  }
}
