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
  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Decode HTML entities first to prevent bypass attempts
  sanitized = sanitized
    .replace(/&amp;/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));

  // Remove all script tags and their contents (comprehensive)
  sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // Remove all style tags and their contents
  sanitized = sanitized.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove all HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Remove dangerous protocols and javascript
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/file:/gi, '')
    .replace(/about:/gi, '');

  // Remove dangerous attributes and event handlers
  const dangerousAttributes = [
    'onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate',
    'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus',
    'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate',
    'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'onclose',
    'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable',
    'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate',
    'ondrag', 'ondragdrop', 'ondragend', 'ondragenter', 'ondragleave',
    'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate',
    'onfilterchange', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout',
    'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete',
    'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave',
    'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel',
    'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange',
    'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart',
    'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll',
    'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop',
    'onsubmit', 'onunload'
  ];

  dangerousAttributes.forEach(attr => {
    const regex = new RegExp(`${attr}\\s*=`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  // Remove dangerous characters and patterns
  sanitized = sanitized
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/<object[^>]*>.*?<\/object>/gi, '')
    .replace(/<embed[^>]*>.*?<\/embed>/gi, '')
    .replace(/<applet[^>]*>.*?<\/applet>/gi, '')
    .replace(/<form[^>]*>.*?<\/form>/gi, '')
    .replace(/<input[^>]*>/gi, '')
    .replace(/<textarea[^>]*>.*?<\/textarea>/gi, '')
    .replace(/<button[^>]*>.*?<\/button>/gi, '')
    .replace(/<select[^>]*>.*?<\/select>/gi, '')
    .replace(/<option[^>]*>.*?<\/option>/gi, '')
    .replace(/<link[^>]*>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<base[^>]*>/gi, '')
    .replace(/<frame[^>]*>/gi, '')
    .replace(/<frameset[^>]*>/gi, '')
    .replace(/<noframes[^>]*>/gi, '');

  // Remove any remaining angle brackets and quotes
  sanitized = sanitized
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');

  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  // Final safety check - if still contains dangerous patterns, return empty string
  const dangerousPattern = /<(script|style|iframe|object|embed|form|input|textarea|button|select|option|link|meta|base|frame|frameset|noframes)\b/i;
  if (dangerousPattern.test(sanitized)) {
    return '';
  }

  return sanitized;
}

export function validateApiKey(req: NextRequest): string | null {
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey || apiKey.length < 32) {
    return null;
  }
  return apiKey;
}
