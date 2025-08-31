import type { EarningSummary } from '@/types';

interface EarningSummaryProps {
  summary: EarningSummary;
  onShowDetails: () => void;
}

export default function EarningSummary({ summary, onShowDetails }: EarningSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const isPositiveGrowth = summary.growthRate > 0;

  return (
    <div 
      className="card mb-8 cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={onShowDetails}
    >
      <div className="text-center">
        <div className="flex items-center justify-between mb-2 text-left">
          <h2 className="text-lg font-semibold text-gray-700">今月の成果サマリ</h2>
                      <button className="text-air-primary hover:text-air-dark text-xs font-medium">
            詳細を見る →
          </button>
        </div>
        <div className="text-4xl font-bold text-air-primary mb-4">
          {formatCurrency(summary.monthlyEarnings)}
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <span>前月: {formatCurrency(summary.previousMonth)}</span>
          <div className={`flex items-center space-x-1 ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
            <span>{isPositiveGrowth ? '↗' : '↘'}</span>
            <span>{Math.abs(summary.growthRate).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
} 