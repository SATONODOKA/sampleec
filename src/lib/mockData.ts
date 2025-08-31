import { Product, OrderInProgress, RecommendedProduct, EarningSummary, StoreProfile, PaymentInfo, ContactInfo } from '@/types';

export const mockEarningSummary: EarningSummary = {
  monthlyEarnings: 125800,
  previousMonth: 98400,
  growthRate: 27.8,
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'オーガニック コーヒー豆 (500g)',
    image: '/images/coffee.jpg',
    clickCount: 156,
    purchaseCount: 23,
    conversionRate: 14.7,
    purchaseRate: 8.2,
    commission: 1200,
    targetDemographics: '30-50代女性',
  },
  {
    id: '2',
    name: 'ハンドメイド レザーバッグ',
    image: '/images/bag.jpg',
    clickCount: 89,
    purchaseCount: 12,
    conversionRate: 13.5,
    purchaseRate: 6.1,
    commission: 3500,
    targetDemographics: '20-40代女性',
  },
  {
    id: '3',
    name: 'アロマディフューザー セット',
    image: '/images/aroma.jpg',
    clickCount: 203,
    purchaseCount: 31,
    conversionRate: 15.3,
    purchaseRate: 9.4,
    commission: 2800,
    targetDemographics: '25-45代女性',
  },
  {
    id: '4',
    name: 'ナチュラル スキンケアセット',
    image: '/images/skincare.jpg',
    clickCount: 134,
    purchaseCount: 18,
    conversionRate: 13.4,
    purchaseRate: 7.1,
    commission: 2200,
    targetDemographics: '20-40代女性',
  },
];

export const mockOrdersInProgress: OrderInProgress[] = [
  {
    id: 'o1',
    productName: 'オーガニック コーヒー豆 (500g)',
    orderDate: '2024-01-15',
    expectedDeliveryDate: '2024-01-25',
    status: 'processing',
  },
  {
    id: 'o2',
    productName: 'アロマディフューザー セット',
    orderDate: '2024-01-18',
    expectedDeliveryDate: '2024-01-28',
    status: 'shipped',
  },
];

export const mockRecommendedProducts: RecommendedProduct[] = [
  {
    id: 'r1',
    name: 'プレミアム グリーンティー',
    image: '/images/tea.jpg',
    recommendationReason: 'nearby_popular',
    reasonIcon: '📍',
  },
  {
    id: 'r2',
    name: 'エコフレンドリー タンブラー',
    image: '/images/tumbler.jpg',
    recommendationReason: 'industry_popular',
    reasonIcon: '🔥',
  },
  {
    id: 'r3',
    name: 'ナチュラル スキンケアセット',
    image: '/images/skincare.jpg',
    recommendationReason: 'similar_past',
    reasonIcon: '⭐',
  },
  {
    id: 'r4',
    name: 'オーガニック ハチミツ',
    image: '/images/honey.jpg',
    recommendationReason: 'new_arrival',
    reasonIcon: '🆕',
  },
];

export const mockStoreProfile: StoreProfile = {
  storeName: 'カフェ・ナチュール',
  address: '東京都渋谷区恵比寿1-2-3',
  businessType: 'カフェ・レストラン',
  size: '小規模 (10席以下)',
  mainCustomers: '20-40代女性',
};

export const mockPaymentInfo: PaymentInfo = {
  bankName: 'みずほ銀行',
  branchName: '恵比寿支店',
  accountType: 'checking',
  accountNumber: '1234567',
};

export const mockContactInfo: ContactInfo = {
  name: '田中 花子',
  phone: '03-1234-5678',
  email: 'hanako.tanaka@example.com',
};

export const regionOptions = [
  '全国',
  '関東',
  '関西',
  '中部',
  '九州',
  '北海道',
  '東北',
  '中国',
  '四国',
];

export const categoryOptions = [
  '全てのカテゴリ',
  'フード・ドリンク',
  'ファッション・アクセサリー',
  'ライフスタイル・雑貨',
  'ヘルス・ビューティー',
  'ホーム・ガーデン',
  'テック・ガジェット',
];

export const targetAudienceOptions = [
  '全ての層',
  '10-20代',
  '30-40代',
  '50-60代',
  '70代以上',
  '男性',
  '女性',
  'ファミリー',
]; 