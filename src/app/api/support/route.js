import { NextResponse } from 'next/server';
import { contactFormSchema } from '../../../lib/validations/contact.js';

export async function POST(request) {
  const startTime = Date.now();
  let clientIP = 'unknown';

  try {
    // Get client IP for logging
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');

    if (cfConnectingIP) clientIP = cfConnectingIP;
    else if (realIP) clientIP = realIP;
    else if (forwarded) clientIP = forwarded.split(',')[0].trim();
    else clientIP = '127.0.0.1';

    // Parse and validate request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});

      console.warn('Contact form validation failed:', { errors, ip: clientIP });

      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Log successful submission
    console.log('Contact form submission:', {
      name,
      email,
      message: message.substring(0, 100) + '...',
      ip: clientIP,
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    });

    return NextResponse.json(
      {
        message: 'Thank you for your message! We\'ll get back to you soon.',
        success: true
      },
      {
        status: 200
      }
    );

  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
