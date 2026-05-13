import { NextRequest } from 'next/server';

export function isAdminRequest(request: NextRequest): boolean {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET) {
    throw new Error('Please define ADMIN_SECRET in your environment variables');
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  return token === ADMIN_SECRET;
}

export function hasValidAdminCookie(request: NextRequest): boolean {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET) {
    throw new Error('Please define ADMIN_SECRET in your environment variables');
  }

  const adminCookie = request.cookies.get('admin_session');
  return adminCookie?.value === ADMIN_SECRET;
}