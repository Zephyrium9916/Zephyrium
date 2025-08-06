import { NextRequest, NextResponse } from 'next/server';
import { z, ZodSchema, ZodError } from 'zod';

export function createValidationMiddleware(schema: ZodSchema) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json();
      const validated = schema.parse(body);
      return { success: true, data: validated };
    } catch (error) {
      if (error instanceof ZodError) {
        // Now TypeScript knows error is a ZodError
        console.log(error.issues);
      } else {
        // Handle other error types
        console.error(error);
      }
      return {
        success: false,
        error: {
          message: 'Validation failed',
          details: error instanceof ZodError ? error.issues : (error as Error).message
        }
      };
    }
  };
}

export function validateRequest(schema: ZodSchema) {
  return async (req: NextRequest) => {
    const result = await createValidationMiddleware(schema)(req);
    if (!result.success) {
      return NextResponse.json(result.error, { status: 400 });
    }
    return result.data;
  };
}
