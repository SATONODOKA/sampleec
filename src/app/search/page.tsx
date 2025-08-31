'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import RecommendedProductCard from '@/components/RecommendedProductCard';
import RecommendedProductDetailModal from '@/components/RecommendedProductDetailModal';
import OrderConfirmModal from '@/components/OrderConfirmModal';
import { mockRecommendedProducts } from '@/lib/mockData';
import type { SearchFilters, RecommendedProduct, Product } from '@/types';

export default function SearchPage() {
  const [recommendedProducts, setRecommendedProducts] = useState(mockRecommendedProducts);
  const [searchResults, setSearchResults] = useState<RecommendedProduct[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<RecommendedProduct | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isOrderConfirmModalOpen, setIsOrderConfirmModalOpen] = useState(false);
  const [productToOrder, setProductToOrder] = useState<Product | null>(null);

  const handleSearch = (filters: SearchFilters) => {
    console.log('検索フィルター:', filters);
    
    // 実際のAPIコールの代わりにモックデータをフィルタリング
    let results = [...mockRecommendedProducts];
    
    if (filters.keyword) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    
    // 簡単なシミュレーション：検索条件によって結果を調整
    if (filters.category !== '全てのカテゴリ') {
      results = results.slice(0, 2); // カテゴリで絞り込まれた場合
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleProductSelect = (product: RecommendedProduct) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleRefreshRecommendations = () => {
    // おすすめ商品の順序をシャッフル
    const shuffled = [...mockRecommendedProducts].sort(() => Math.random() - 0.5);
    setRecommendedProducts(shuffled);
  };

  // RecommendedProductをProductに変換する関数
  const convertToProduct = (recommendedProduct: RecommendedProduct): Product => {
    return {
      id: recommendedProduct.id,
      name: recommendedProduct.name,
      image: recommendedProduct.image,
      clickCount: 0,
      purchaseCount: 0,
      conversionRate: 15.0, // デフォルト値
      purchaseRate: 8.5, // デフォルト値
      commission: 2500, // デフォルト値
      targetDemographics: '20-40代女性', // デフォルト値
    };
  };

  const handleOrder = (recommendedProduct: RecommendedProduct) => {
    const product = convertToProduct(recommendedProduct);
    setProductToOrder(product);
    setIsOrderConfirmModalOpen(true);
  };

  const handleOrderConfirm = (productId: string, quantity: number, expectedDate: string) => {
    console.log('発注確定:', { productId, quantity, expectedDate });
    
    if (productToOrder) {
      // localStorage から既存の商品リストを取得
      const existingProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
      
      // 新しい商品を追加（重複チェック）
      const isAlreadyAdded = existingProducts.some((p: Product) => p.id === productToOrder.id);
      
      if (!isAlreadyAdded) {
        const newProduct = { ...productToOrder };
        const updatedProducts = [...existingProducts, newProduct];
        localStorage.setItem('userProducts', JSON.stringify(updatedProducts));
        
        alert(`${productToOrder.name} を ${quantity}個 発注しました！\n希望到着日: ${expectedDate}\n\n商品が管理画面の商品一覧に追加されました。`);
      } else {
        alert(`${productToOrder.name} を ${quantity}個 発注しました！\n希望到着日: ${expectedDate}\n\nこの商品は既に商品一覧に存在します。`);
      }
      
      // 発注処理中にも追加
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const newOrder = {
        id: `order_${Date.now()}`,
        productName: productToOrder.name,
        quantity,
        expectedDeliveryDate: expectedDate,
        orderDate: new Date().toISOString().split('T')[0],
        status: 'ordered'
      };
      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    }
    
    setIsOrderConfirmModalOpen(false);
    setProductToOrder(null);
  };

  const handleCloseOrderConfirmModal = () => {
    setIsOrderConfirmModalOpen(false);
    setProductToOrder(null);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <SearchBar onSearch={handleSearch} />

      {hasSearched && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            検索結果 ({searchResults.length}件)
          </h2>
          {searchResults.length > 0 ? (
                         <div className="grid grid-cols-1 gap-4">
              {searchResults.map((product) => (
                <RecommendedProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              検索条件に該当する商品が見つかりませんでした。
            </div>
          )}
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">おすすめ商品</h2>
          <button 
            onClick={handleRefreshRecommendations}
            className="btn-secondary text-sm"
          >
            🔄 更新
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-3 pb-4">
            {recommendedProducts.map((product) => (
              <RecommendedProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        </div>
      </div>

      <RecommendedProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onOrder={handleOrder}
      />

      <OrderConfirmModal
        product={productToOrder}
        isOpen={isOrderConfirmModalOpen}
        onClose={handleCloseOrderConfirmModal}
        onConfirm={handleOrderConfirm}
      />
    </div>
  );
} 