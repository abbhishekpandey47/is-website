import dns from 'dns/promises';
import { isEmail } from 'validator';
import { NextResponse } from 'next/server';

export async function validateEmail(email) {
  const value = (email || '').trim().toLowerCase();

  if (!isEmail(value)) {
    return { valid: false, reason: 'Invalid format', suggestion: null };
  }

  const domain = value.split('@')[1];

  try {
    const mx = await dns.resolveMx(domain);
    console.log('MX records:', mx);
    if (!mx || mx.length === 0) {
      return { valid: false, reason: 'No mail server found', suggestion: null };
    }
  } catch (e) {
    const domainResolves = await domainHasAddress(domain);
    if (domainResolves) {
      return {
        valid: true,
        reason: 'Domain resolves but has no MX records',
        suggestion: 'Mail delivery may still fail until MX records are added',
      };
    }

    return {
      valid: false,
      reason: 'Invalid email domain',
      suggestion: null,
    };
  }

  return { valid: true, reason: null, suggestion: null };
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const { email } = body || {};
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const result = await validateEmail(email);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Email validation failed:', err);
    return NextResponse.json({ error: 'Email validation failed' }, { status: 500 });
  }
}

async function domainHasAddress(domain) {
  try {
    const records = await dns.resolve(domain);
    return Boolean(records && records.length > 0);
  } catch (err) {
    try {
      const ipv6 = await dns.resolve6(domain);
      return Boolean(ipv6 && ipv6.length > 0);
    } catch (innerErr) {
      return false;
    }
  }
}

