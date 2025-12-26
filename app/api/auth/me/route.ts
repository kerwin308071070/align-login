import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/jwt';

export async function GET() {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json(
      { error: '未授权' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: user.userId,
      username: user.username,
    },
  });
}