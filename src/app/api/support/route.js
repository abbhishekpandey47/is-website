import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
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
      
      Sentry.addBreadcrumb({
        message: 'Contact form validation failed',
        category: 'validation',
        level: 'warning',
        data: { errors, ip: clientIP }
      });
      
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    const { name, email, message } = validationResult.data;
    
    // Log successful submission (you can replace this with actual email sending)
    console.log('Contact form submission:', {
      name,
      email,
      message: message.substring(0, 100) + '...', // Truncate for logging
      ip: clientIP,
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    });
    
    // TODO: Implement actual email sending logic here
    // For now, we'll simulate a successful submission
    
    // Add success breadcrumb to Sentry
    Sentry.addBreadcrumb({
      message: 'Contact form submitted successfully',
      category: 'contact',
      level: 'info',
      data: { 
        name, 
        email, 
        ip: clientIP,
        processingTime: Date.now() - startTime
      }
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
    // Capture error with Sentry
    Sentry.captureException(error, {
      tags: {
        section: 'contact_api',
        ip: clientIP
      },
      extra: {
        processingTime: Date.now() - startTime,
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer')
      }
    });
    
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
