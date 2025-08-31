'use client';

import { useState, useEffect } from 'react';
import OrderInProgressCard from '@/components/OrderInProgressCard';
import { mockOrdersInProgress } from '@/lib/mockData';
import type { OrderInProgress } from '@/types';

export default function OrdersPage() {
  const [ordersInProgress, setOrdersInProgress] = useState<OrderInProgress[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderInProgress | null>(null);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

  // 初回ロード時とページに戻った時に発注リストを更新
  useEffect(() => {
    const loadOrders = () => {
      const storedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const allOrders = [...mockOrdersInProgress, ...storedOrders];
      // 重複削除（IDベース）
      const uniqueOrders = allOrders.filter((order, index, self) => 
        index === self.findIndex((o) => o.id === order.id)
      );
      setOrdersInProgress(uniqueOrders);
    };

    loadOrders();

    // ページがフォーカスされた時にも更新
    const handleFocus = () => loadOrders();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleOrderCancel = (orderId: string) => {
    const updatedOrders = ordersInProgress.filter(order => order.id !== orderId);
    setOrdersInProgress(updatedOrders);
    
    // localStorageからも削除
    const storedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const updatedStoredOrders = storedOrders.filter((order: OrderInProgress) => order.id !== orderId);
    localStorage.setItem('userOrders', JSON.stringify(updatedStoredOrders));
    
    alert('発注をキャンセルしました。');
  };

  const handleShowOrderDetails = (order: OrderInProgress) => {
    setSelectedOrder(order);
    setIsOrderDetailModalOpen(true);
  };

  const handleCloseOrderDetailModal = () => {
    setIsOrderDetailModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-xl font-bold text-gray-900 mb-6">発注処理中</h1>
      
      {ordersInProgress.length > 0 ? (
        <div className="space-y-4">
          {ordersInProgress.map((order) => (
            <OrderInProgressCard 
              key={order.id} 
              order={order}
              onCancel={handleOrderCancel}
              onShowDetails={handleShowOrderDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📦</div>
          <p className="text-gray-500">発注処理中の商品はありません</p>
        </div>
      )}
    </div>
  );
} 