'use client';

import type { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onOrder: (productId: string) => void;
  onDelete: (productId: string) => void;
  onShowDetails: (product: Product) => void;
}

export default function ProductCard({ product, onOrder, onDelete, onShowDetails }: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOrder(product.id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`「${product.name}」を削除しますか？`)) {
      setIsDeleting(true);
      // 実際のAPI呼び出しの代わりに短時間の待機
      setTimeout(() => {
        onDelete(product.id);
        setIsDeleting(false);
      }, 500);
    }
  };

  return (
    <div 
      className="card cursor-pointer hover:shadow-md transition-shadow duration-200 w-full"
      onClick={() => onShowDetails(product)}
    >
      {/* 商品画像エリア */}
      <div className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-2">
        📦
      </div>

      {/* 商品情報 */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-xs line-clamp-2 min-h-[2rem]">
          {product.name}
        </h3>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">購入率</span>
            <span className="font-semibold text-green-600">{product.purchaseRate}%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">手数料</span>
            <span className="font-semibold text-air-primary">¥{product.commission.toLocaleString()}</span>
          </div>
        </div>

        {/* ボタンエリア */}
        <div className="flex space-x-1 pt-1">
          <button
            onClick={handleOrder}
            className="btn-primary text-xs flex-1 py-1.5"
          >
            発注
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn-secondary text-xs px-2 py-1.5"
          >
            {isDeleting ? '削除中' : '削除'}
          </button>
        </div>
      </div>
    </div>
  );
} 