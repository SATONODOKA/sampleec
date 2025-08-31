// 商品情報の型定義
export interface Product {
  id: string;
  name: string;
  image: string;
  clickCount: number;
  purchaseCount: number;
  conversionRate: number;
  purchaseRate: number;
  commission: number; // 手数料（円）
  targetDemographics: string;
}

// 発注処理中アイテムの型定義
export interface OrderInProgress {
  id: string;
  productName: string;
  orderDate: string;
  expectedDeliveryDate: string;
  status: 'ordered' | 'processing' | 'shipped' | 'delivered';
}

// おすすめ商品の型定義
export interface RecommendedProduct {
  id: string;
  name: string;
  image: string;
  recommendationReason: 'nearby_popular' | 'industry_popular' | 'similar_past' | 'new_arrival';
  reasonIcon: string;
}

// 検索フィルターの型定義
export interface SearchFilters {
  region: string;
  category: string;
  targetAudience: string;
  keyword: string;
}

// 店舗プロフィールの型定義
export interface StoreProfile {
  storeName: string;
  address: string;
  businessType: string;
  size: string;
  mainCustomers: string;
}

// 支払い情報の型定義
export interface PaymentInfo {
  bankName: string;
  branchName: string;
  accountType: 'checking' | 'savings';
  accountNumber: string;
}

// 担当者連絡先の型定義
export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

// 成果サマリの型定義
export interface EarningSummary {
  monthlyEarnings: number;
  previousMonth: number;
  growthRate: number;
} 