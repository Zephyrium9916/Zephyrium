import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendEmail(name: string, email: string, message: string) {
  return resend.emails.send({
    from: 'Zephyrium <noreply@zephyrium.com>',
    to: ['admin@zephyrium.com'],
    subject: `New Contact from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message}</p>`
  })
}
