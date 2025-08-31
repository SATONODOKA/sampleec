import type { EarningSummary } from '@/types';

interface EarningSummaryProps {
  summary: EarningSummary;
}

export default function EarningSummary({ summary }: EarningSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const isPositiveGrowth = summary.growthRate > 0;

  return (
    <div className="card mb-8">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">今月の成果サマリ</h2>
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