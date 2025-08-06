import { NextRequest, NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';

export async function validateRequestBody<T>(schema: ZodSchema<T>, req: NextRequest): Promise<T | NextResponse> {
  try {
    const body = await req.json();
    const validated = schema.parse(body);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

export function validateApiKey(req: NextRequest): string | null {
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey || apiKey.length < 32) {
    return null;
  }
  return apiKey;
}
