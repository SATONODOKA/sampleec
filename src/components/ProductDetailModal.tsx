'use client';

import type { Product } from '@/types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full max-h-[85vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">詳細分析レポート</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>対象層: {product.targetDemographics}</span>
            </div>
          </div>

          {/* パフォーマンス指標 */}
          <div className="mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-4">パフォーマンス指標</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">総クリック数</span>
                  <span className="font-semibold text-air-primary">{product.clickCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">総購入数</span>
                  <span className="font-semibold text-air-primary">{product.purchaseCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">遷移率</span>
                  <span className="font-semibold text-green-600">{product.conversionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">購入率</span>
                  <span className="font-semibold text-green-600">{product.purchaseRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 購入者属性 */}
          <div className="mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-4">購入者属性</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600 block mb-3">年代別</span>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">20-30代</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-air-primary h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-xs text-gray-600 w-8 text-right">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">30-40代</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-air-primary h-2 rounded-full" style={{width: '35%'}}></div>
                        </div>
                        <span className="text-xs text-gray-600 w-8 text-right">35%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">40代以上</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-air-primary h-2 rounded-full" style={{width: '20%'}}></div>
                        </div>
                        <span className="text-xs text-gray-600 w-8 text-right">20%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 block mb-3">性別</span>
                  <div className="flex space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-air-primary rounded"></div>
                      <span className="text-sm">女性 (78%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <span className="text-sm">男性 (22%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="btn-secondary">
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 