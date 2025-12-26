'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

// 隐适美产品数据
const alignersData = [
  {
    id: 1,
    name: "隐适美 Comprehensive",
    category: "综合矫正",
    description: "适用于各种复杂病例的全面矫正方案，包括拔牙病例",
    price: "¥28,000 - ¥45,000",
    duration: "12-24个月",
    features: ["适用于复杂病例", "可处理拔牙病例", "全程数字化监控"],
    rating: 4.8,
    imageColor: "bg-gradient-to-r from-blue-500 to-teal-400"
  },
  {
    id: 2,
    name: "隐适美 Lite",
    category: "轻度矫正",
    description: "针对轻度牙齿拥挤、间隙问题的经济型解决方案",
    price: "¥15,000 - ¥25,000",
    duration: "6-12个月",
    features: ["快速矫正", "经济实惠", "佩戴舒适"],
    rating: 4.5,
    imageColor: "bg-gradient-to-r from-green-400 to-emerald-500"
  },
  {
    id: 3,
    name: "隐适美 Teen",
    category: "青少年矫正",
    description: "专为青少年设计的矫正方案，包含替换牙套空间",
    price: "¥32,000 - ¥48,000",
    duration: "18-30个月",
    features: ["专为青少年设计", "包含替换牙套", "成长监测功能"],
    rating: 4.9,
    imageColor: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    id: 4,
    name: "隐适美 Moderate",
    category: "中度矫正",
    description: "针对中度牙齿排列问题的标准矫正方案",
    price: "¥22,000 - ¥35,000",
    duration: "9-18个月",
    features: ["标准矫正", "佩戴周期适中", "效果可预测"],
    rating: 4.7,
    imageColor: "bg-gradient-to-r from-orange-400 to-red-500"
  },
  {
    id: 5,
    name: "隐适美 Express",
    category: "快速矫正",
    description: "针对轻微问题的超快速矫正方案",
    price: "¥12,000 - ¥18,000",
    duration: "3-6个月",
    features: ["最快3个月完成", "仅需10-15副牙套", "维护简单"],
    rating: 4.3,
    imageColor: "bg-gradient-to-r from-yellow-400 to-amber-500"
  },
  {
    id: 6,
    name: "隐适美 Full",
    category: "全口矫正",
    description: "最全面的矫正方案，包含所有附加服务和保障",
    price: "¥38,000 - ¥55,000",
    duration: "24-36个月",
    features: ["最全面保障", "无限次牙套更换", "终身保持器"],
    rating: 4.9,
    imageColor: "bg-gradient-to-r from-indigo-500 to-blue-600"
  }
];

export default function ProductsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />

      {/* 产品列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            隐适美产品系列
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            选择适合您的隐形矫正方案，每款产品都经过精心设计，确保最佳的矫正效果和佩戴体验
          </p>
        </div>

        {/* 产品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alignersData.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* 产品图片区域 */}
              <div className={`h-48 ${product.imageColor} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                {/* 评分标签 */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <svg className="w-4 h-4 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                </div>
                {/* 分类标签 */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* 产品内容 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                {/* 价格和时长 */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-teal-600">{product.price}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">约 {product.duration}</span>
                  </div>
                </div>

                {/* 特性列表 */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium">
                    了解更多
                  </button>
                  <button className="flex-1 bg-white border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors font-medium">
                    咨询医生
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 统计信息 */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50万+</div>
              <div className="text-teal-100">成功案例</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-teal-100">用户满意度</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="text-teal-100">认证医生</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}