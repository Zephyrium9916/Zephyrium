// lib/sendEmail.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async ({
  name,
  email,
  message
}: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const data = await resend.emails.send({
      from: 'Zephyrium <onboarding@resend.dev>', // Replace with a verified domain later
      to: ['you@example.com'], // Change to your actual email
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from Zephyrium Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return data;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    throw error;
  }
};
