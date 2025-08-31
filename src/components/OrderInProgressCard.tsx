import type { OrderInProgress } from '@/types';

interface OrderInProgressCardProps {
  order: OrderInProgress;
}

const statusMap = {
  ordered: { label: '注文済み', color: 'text-blue-600 bg-blue-100' },
  processing: { label: '処理中', color: 'text-yellow-600 bg-yellow-100' },
  shipped: { label: '発送済み', color: 'text-green-600 bg-green-100' },
  delivered: { label: '配送完了', color: 'text-gray-600 bg-gray-100' },
};

export default function OrderInProgressCard({ order }: OrderInProgressCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'numeric',
      day: 'numeric',
    });
  };

  const status = statusMap[order.status];

  return (
    <div className="card bg-gray-50 border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1">{order.productName}</h4>
          <div className="text-sm text-gray-600">
            <span>注文日: {formatDate(order.orderDate)}</span>
            <span className="mx-2">•</span>
            <span>予定日: {formatDate(order.expectedDeliveryDate)}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
          {status.label}
        </div>
      </div>
    </div>
  );
} 