import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      console.error('GOOGLE_CLIENT_ID is not set in environment variables');
      return NextResponse.json(
        { error: 'OAuth client ID not configured. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/google`;
    const scope = 'openid email profile';
    
    // Check if user came from post-install page
    const referer = request.headers.get('referer') || '';
    const returnTo = searchParams.get('return_to');
    const returnToParam = returnTo || (referer.includes('/post-install') ? 'post-install' : '');
    
    // Store return_to in state parameter
    const stateData = JSON.stringify({ return_to: returnToParam });
    const state = Buffer.from(stateData).toString('base64');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}&access_type=offline&prompt=consent`;

    console.log('Redirecting to Google OAuth with:', { clientId, redirectUri });
    return NextResponse.redirect(authUrl);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/google`;

    if (!clientId || !clientSecret) {
      console.error('Missing OAuth credentials:', { hasClientId: !!clientId, hasClientSecret: !!clientSecret });
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?auth=error&reason=missing_credentials`);
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokens);
      throw new Error(`Failed to exchange code for tokens: ${JSON.stringify(tokens)}`);
    }

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const userInfo = await userInfoResponse.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Decode state to get return_to destination
    let redirectUrl = `${baseUrl}?auth=success`;
    try {
      if (state) {
        const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
        if (stateData.return_to === 'post-install') {
          redirectUrl = `${baseUrl}/post-install?auth=success`;
        }
      }
    } catch (e) {
      // If state decode fails, fallback to checking referer
      const referer = request.headers.get('referer') || '';
      if (referer.includes('/post-install')) {
        redirectUrl = `${baseUrl}/post-install?auth=success`;
      }
    }

    const response = NextResponse.redirect(redirectUrl);
    
    response.cookies.set('google_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set('google_refresh_token', tokens.refresh_token || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });

    response.cookies.set('user_email', userInfo.email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set('user_name', userInfo.name || '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    const saveResult = await saveToSheet({
      email: userInfo.email,
      name: userInfo.name || '',
      picture: userInfo.picture || '',
      timestamp: new Date().toISOString(),
    });

    if (!saveResult.success) {
      console.error('Failed to save user data to sheet');
    }

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?auth=error`);
  }
}

async function saveToSheet(userData: { email: string; name: string; picture: string; timestamp: string }) {
  try {
    const { google } = await import('googleapis');
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      console.error('Sheet ID not configured');
      return { success: false };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Read existing data to check for duplicates (email is in column C, index 2)
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!C:C',
    });

    const existingEmails = existingData.data.values || [];
    // Skip header row (index 0) and check if email already exists
    const emailExists = existingEmails.slice(1).some((row: any[]) => {
      return row[0] && row[0].toLowerCase().trim() === userData.email.toLowerCase().trim();
    });

    if (emailExists) {
      console.log(`User with email ${userData.email} already exists, skipping duplicate entry`);
      return { success: true, skipped: true };
    }
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[userData.timestamp, userData.name, userData.email, userData.picture]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving to sheet:', error);
    return { success: false };
  }
}

