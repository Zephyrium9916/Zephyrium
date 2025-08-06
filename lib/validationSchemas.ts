import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email format').max(255, 'Email too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message too long'),
  token: z.string().min(1, 'reCAPTCHA token required')
});

export const blogDraftSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long'),
  content: z.string().min(50, 'Content must be at least 50 characters').max(50000, 'Content too long')
});

export const checkoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required')
});

export const authVerifySchema = z.object({
  oobCode: z.string().min(1, 'Verification code is required')
});

export const apiKeySchema = z.object({
  apiKey: z.string().min(32, 'Invalid API key format')
});
