'use client';

import { useState } from 'react';
import type { Product } from '@/types';

interface OrderConfirmModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productId: string, quantity: number, expectedDate: string) => void;
}

export default function OrderConfirmModal({ product, isOpen, onClose, onConfirm }: OrderConfirmModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [expectedDate, setExpectedDate] = useState('');

  if (!isOpen || !product) return null;

  const handleConfirm = () => {
    if (!expectedDate) {
      alert('希望到着日を選択してください。');
      return;
    }
    onConfirm(product.id, quantity, expectedDate);
    onClose();
    setQuantity(1);
    setExpectedDate('');
  };

  const handleCancel = () => {
    onClose();
    setQuantity(1);
    setExpectedDate('');
  };

  // 今日から1週間後をデフォルトの最短日付とする
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full max-h-[85vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">発注確認</h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <div className="text-sm text-gray-600">
              手数料: ¥{product.commission.toLocaleString()} / 個
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">発注個数</label>
              <select
                className="select-field"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}個
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">希望到着日</label>
              <input
                type="date"
                className="input-field"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                min={minDateString}
              />
              <div className="text-xs text-gray-500 mt-1">
                ※ 最短で{minDate.toLocaleDateString('ja-JP')}以降
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-600 mb-2">発注内容確認</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>商品名:</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span>個数:</span>
                <span className="font-medium">{quantity}個</span>
              </div>
              <div className="flex justify-between">
                <span>希望到着日:</span>
                <span className="font-medium">
                  {expectedDate ? new Date(expectedDate).toLocaleDateString('ja-JP') : '未選択'}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-semibold">予想手数料:</span>
                <span className="font-semibold text-air-primary">
                  ¥{(product.commission * quantity).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button onClick={handleCancel} className="btn-secondary flex-1">
              キャンセル
            </button>
            <button onClick={handleConfirm} className="btn-primary flex-1">
              発注確定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 