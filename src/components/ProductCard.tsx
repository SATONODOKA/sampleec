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

  const handleOrder = () => {
    onOrder(product.id);
  };

  const handleDelete = async () => {
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
      className="card cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onShowDetails(product)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
          📦
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="block font-medium">クリック数</span>
              <span className="text-air-primary font-semibold">{product.clickCount.toLocaleString()}</span>
            </div>
            <div>
              <span className="block font-medium">購入数</span>
              <span className="text-air-primary font-semibold">{product.purchaseCount.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOrder();
              }}
              className="btn-primary text-sm flex-1"
            >
              発注
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              disabled={isDeleting}
              className="btn-secondary text-sm px-3"
            >
              {isDeleting ? '削除中...' : '削除'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 