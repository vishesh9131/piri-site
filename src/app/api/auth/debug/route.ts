import { NextResponse } from 'next/server';

export async function GET() {
  const hasClientId = !!process.env.GOOGLE_CLIENT_ID;
  const hasClientSecret = !!process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const redirectUri = `${baseUrl}/api/auth/google`;

  return NextResponse.json({
    hasClientId,
    hasClientSecret,
    clientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    baseUrl,
    redirectUri,
    expectedRedirectUri: 'http://localhost:3000/api/auth/google',
    redirectUriMatches: redirectUri === 'http://localhost:3000/api/auth/google',
    note: 'Make sure your .env.local file exists and you restarted the dev server after creating it',
  });
}

