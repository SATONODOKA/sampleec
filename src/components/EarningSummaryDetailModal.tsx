'use client';

import { useState } from 'react';
import type { EarningSummary } from '@/types';

interface EarningSummaryDetailModalProps {
  summary: EarningSummary;
  isOpen: boolean;
  onClose: () => void;
}

// モックデータ：詳細分析データ
const mockDetailedData = {
  demographics: [
    { age: '20-30代', percentage: 35, amount: 44030 },
    { age: '30-40代', percentage: 40, amount: 50320 },
    { age: '40-50代', percentage: 20, amount: 25160 },
    { age: '50代以上', percentage: 5, amount: 6290 }
  ],
  productSales: [
    { name: 'アロマディフューザー セット', amount: 86800, percentage: 69 },
    { name: 'ハンドメイド レザーバッグ', amount: 42000, percentage: 33.4 },
    { name: 'オーガニック コーヒー豆', amount: 27600, percentage: 21.9 },
    { name: 'ナチュラル スキンケアセット', amount: 39600, percentage: 31.5 }
  ]
};

export default function EarningSummaryDetailModal({ summary, isOpen, onClose }: EarningSummaryDetailModalProps) {
  const [hoveredDemographics, setHoveredDemographics] = useState<number | null>(null);
  const [hoveredProducts, setHoveredProducts] = useState<number | null>(null);

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const renderPieChart = (data: any[], type: 'demographics' | 'products', hoveredItem: number | null, setHoveredItem: (index: number | null) => void) => {
    let cumulativePercentage = 0;
    
    return (
      <div className="relative">
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
          {data.map((item, index) => {
            const percentage = item.percentage;
            const startAngle = (cumulativePercentage / 100) * 360;
            const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
            
            const startAngleRad = (startAngle - 90) * (Math.PI / 180);
            const endAngleRad = (endAngle - 90) * (Math.PI / 180);
            
            const largeArcFlag = percentage > 50 ? 1 : 0;
            
            const x1 = 100 + 80 * Math.cos(startAngleRad);
            const y1 = 100 + 80 * Math.sin(startAngleRad);
            const x2 = 100 + 80 * Math.cos(endAngleRad);
            const y2 = 100 + 80 * Math.sin(endAngleRad);
            
            const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            cumulativePercentage += percentage;
            
            const colors = ['#90D5FF', '#6DC5FF', '#B3E1FF', '#E8F4FF'];
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-opacity duration-200"
                style={{ 
                  opacity: hoveredItem === null || hoveredItem === index ? 1 : 0.6,
                  filter: hoveredItem === index ? 'brightness(110%)' : 'none'
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              />
            );
          })}
        </svg>
        
        {/* ホバー時の詳細表示 */}
        {hoveredItem !== null && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-lg border">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {type === 'demographics' ? (data[hoveredItem] as any).age : (data[hoveredItem] as any).name}
              </div>
              <div className="text-air-primary font-bold">
                {formatCurrency(data[hoveredItem].amount)}
              </div>
              <div className="text-sm text-gray-600">
                {data[hoveredItem].percentage}%
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">成果詳細分析</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* サマリー情報 */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="card text-center">
              <div className="text-sm text-gray-600 mb-1">今月の総売上</div>
              <div className="text-2xl font-bold text-air-primary">
                {formatCurrency(summary.monthlyEarnings)}
              </div>
            </div>
            <div className="card text-center">
              <div className="text-sm text-gray-600 mb-1">前月比</div>
              <div className={`text-2xl font-bold ${summary.growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {summary.growthRate > 0 ? '+' : ''}{summary.growthRate.toFixed(1)}%
              </div>
            </div>
            <div className="card text-center">
              <div className="text-sm text-gray-600 mb-1">取引件数</div>
              <div className="text-2xl font-bold text-gray-700">
                {mockDetailedData.demographics.reduce((sum, item) => sum + Math.round(item.amount / 1000), 0)}件
              </div>
            </div>
          </div>

                    {/* 2つのチャートを縦積み表示 */}
          <div className="space-y-6 mb-6">
            {/* 購入者属性分析 */}
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">年代別購入比率</h3>
              <div className="space-y-4">
                <div>
                  {renderPieChart(mockDetailedData.demographics, 'demographics', hoveredDemographics, setHoveredDemographics)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">詳細データ</h4>
                  <div className="space-y-2">
                    {mockDetailedData.demographics.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onMouseEnter={() => setHoveredDemographics(index)}
                        onMouseLeave={() => setHoveredDemographics(null)}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded"
                            style={{
                              backgroundColor: ['#90D5FF', '#6DC5FF', '#B3E1FF', '#E8F4FF'][index % 4]
                            }}
                          />
                          <span className="text-sm font-medium text-gray-900">{item.age}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-air-primary">
                            {formatCurrency(item.amount)}
                          </div>
                          <div className="text-xs text-gray-600">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 商品別売上構成 */}
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">商品別売上構成</h3>
              <div className="space-y-4">
                <div>
                  {renderPieChart(mockDetailedData.productSales, 'products', hoveredProducts, setHoveredProducts)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">詳細データ</h4>
                  <div className="space-y-2">
                    {mockDetailedData.productSales.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onMouseEnter={() => setHoveredProducts(index)}
                        onMouseLeave={() => setHoveredProducts(null)}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded"
                            style={{
                              backgroundColor: ['#90D5FF', '#6DC5FF', '#B3E1FF', '#E8F4FF'][index % 4]
                            }}
                          />
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-air-primary">
                            {formatCurrency(item.amount)}
                          </div>
                          <div className="text-xs text-gray-600">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={onClose} className="btn-secondary">
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 