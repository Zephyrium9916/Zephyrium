import type { NextApiRequest, NextApiResponse } from 'next'
const ipCache = new Map<string, { count: number; timestamp: number }>()

export async function rateLimit(req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const entry = ipCache.get(ip as string)

  if (entry && now - entry.timestamp < 60_000) {
    if (entry.count >= 3) {
      res.status(429).json({ message: 'Too many requests. Try again later.' })
      return false
    }
    entry.count++
  } else {
    ipCache.set(ip as string, { count: 1, timestamp: now })
  }
  return true
}
