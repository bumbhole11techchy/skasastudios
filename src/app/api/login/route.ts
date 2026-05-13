import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET;
if (!ADMIN_SECRET) {
  throw new Error('Please define ADMIN_SECRET in your environment variables');
}

const ADMIN_SECRET_VALUE: string = ADMIN_SECRET;

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== ADMIN_SECRET_VALUE) {
    return NextResponse.json({ error: 'Invalid admin password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_auth', ADMIN_SECRET_VALUE, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
