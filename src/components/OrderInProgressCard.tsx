import type { OrderInProgress } from '@/types';

interface OrderInProgressCardProps {
  order: OrderInProgress;
  onCancel: (orderId: string) => void;
  onShowDetails: (order: OrderInProgress) => void;
}

const statusMap = {
  ordered: { label: '注文済み', color: 'text-blue-600 bg-blue-100' },
  processing: { label: '処理中', color: 'text-yellow-600 bg-yellow-100' },
  shipped: { label: '発送済み', color: 'text-green-600 bg-green-100' },
  delivered: { label: '配送完了', color: 'text-gray-600 bg-gray-100' },
};

export default function OrderInProgressCard({ order, onCancel, onShowDetails }: OrderInProgressCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'numeric',
      day: 'numeric',
    });
  };

  const status = statusMap[order.status];
  const canCancel = order.status === 'ordered' || order.status === 'processing';

  const handleCancel = () => {
    if (window.confirm(`「${order.productName}」の発注をキャンセルしますか？`)) {
      onCancel(order.id);
    }
  };

  return (
    <div className="card bg-gray-50 border-gray-300">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 mb-1">{order.productName}</h4>
          <div className="text-sm text-gray-600 mb-3">
            <span>注文日: {formatDate(order.orderDate)}</span>
            <span className="mx-2">•</span>
            <span>予定日: {formatDate(order.expectedDeliveryDate)}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onShowDetails(order)}
              className="btn-secondary text-xs py-1 px-3"
            >
              詳細確認
            </button>
            {canCancel && (
              <button
                onClick={handleCancel}
                className="text-xs py-1 px-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors duration-200"
              >
                キャンセル
              </button>
            )}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color} ml-4 flex-shrink-0`}>
          {status.label}
        </div>
      </div>
    </div>
  );
} 