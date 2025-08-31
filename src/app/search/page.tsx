'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import RecommendedProductCard from '@/components/RecommendedProductCard';
import { mockRecommendedProducts } from '@/lib/mockData';
import type { SearchFilters, RecommendedProduct } from '@/types';

export default function SearchPage() {
  const [recommendedProducts, setRecommendedProducts] = useState(mockRecommendedProducts);
  const [searchResults, setSearchResults] = useState<RecommendedProduct[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

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
    alert(`「${product.name}」の詳細を表示します。`);
  };

  const handleRefreshRecommendations = () => {
    // おすすめ商品の順序をシャッフル
    const shuffled = [...mockRecommendedProducts].sort(() => Math.random() - 0.5);
    setRecommendedProducts(shuffled);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <SearchBar onSearch={handleSearch} />

      {hasSearched && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            検索結果 ({searchResults.length}件)
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="flex space-x-4 pb-4">
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
    </div>
  );
} 