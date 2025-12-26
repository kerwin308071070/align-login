import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/jwt';

const publicPaths = ['/login', '/api/auth/login'];
const authPaths = ['/dashboard', '/products'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 检查是否为公开路径
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));

  // 获取token
  const token = request.cookies.get('access-token')?.value;

  // 如果是API认证路由，直接通过
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // 如果访问受保护路径但没有token，重定向到登录
  if (isAuthPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 如果有token，验证token
  if (token && isAuthPath) {
    try {
      const decoded = await decrypt(token);
      if (!decoded) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 如果已登录但访问登录页，重定向到产品页
  if (pathname === '/login' && token) {
    try {
      const decoded = await decrypt(token);
      if (decoded) {
        return NextResponse.redirect(new URL('/products', request.url));
      }
    } catch (error) {
      // token无效，留在登录页
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};