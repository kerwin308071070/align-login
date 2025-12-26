import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/jwt';
import bcrypt from 'bcryptjs';

// 用户数据（实际项目中应使用数据库）
const users = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@example.com',
    // 密码: demo123
    // password: '$2a$10$N9qo8uLOickgx2ZMRZoMye8u8J8RcBqR4nO9B6ZQ6Q2kS2VQbL6G6',
    password: '$2b$10$e2t0Zzx0t/EpcEbb90dY2u7nGB5dakdzSBEI.XBeFsyXOTwLG7.A2',
    name: '演示用户',
    role: 'user',
  },
];

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '用户名和密码必填' },
        { status: 400 }
      );
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码（实际项目中应该从数据库查询）
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 创建会话
    await createSession(user.id, user.username);

    return NextResponse.json({
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
      redirectTo: '/products',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 创建演示用户的哈希密码（运行一次）
// async function createDemoUser() {
//   const hashedPassword = await bcrypt.hash('demo123', 10);
//   console.log('Hashed password for demo123:', hashedPassword);
// }