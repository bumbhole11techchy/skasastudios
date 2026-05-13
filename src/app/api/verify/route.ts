import { NextRequest, NextResponse } from 'next/server';
import { hasValidAdminCookie } from '@/backend/lib/adminAuth';

export async function GET(request: NextRequest) {
  if (!hasValidAdminCookie(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
