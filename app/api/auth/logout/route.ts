import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/jwt';

export async function POST() {
  deleteSession();
  
  return NextResponse.json({
    success: true,
    message: '登出成功',
  });
}