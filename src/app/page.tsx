'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EarningSummary from '@/components/EarningSummary';
import ProductCard from '@/components/ProductCard';
import OrderInProgressCard from '@/components/OrderInProgressCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import OrderConfirmModal from '@/components/OrderConfirmModal';
import EarningSummaryDetailModal from '@/components/EarningSummaryDetailModal';
import { mockEarningSummary, mockProducts, mockOrdersInProgress } from '@/lib/mockData';
import type { Product, OrderInProgress } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [ordersInProgress, setOrdersInProgress] = useState(mockOrdersInProgress);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderInProgress | null>(null);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [isEarningSummaryModalOpen, setIsEarningSummaryModalOpen] = useState(false);

  // 初回ロード時とページに戻った時に商品リストを更新
  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
      const allProducts = [...mockProducts, ...storedProducts];
      // 重複削除
      const uniqueProducts = allProducts.filter((product, index, self) => 
        index === self.findIndex((p) => p.id === product.id)
      );
      setProducts(uniqueProducts);
    };

    loadProducts();

    // ページがフォーカスされた時にも更新
    const handleFocus = () => loadProducts();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleOrder = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setOrderProduct(product);
      setIsOrderModalOpen(true);
    }
  };

  const handleOrderConfirm = (productId: string, quantity: number, expectedDate: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const newOrder: OrderInProgress = {
        id: `o${Date.now()}`,
        productName: `${product.name} (${quantity}個)`,
        orderDate: new Date().toISOString().split('T')[0],
        expectedDeliveryDate: expectedDate,
        status: 'ordered',
      };
      setOrdersInProgress([...ordersInProgress, newOrder]);
      alert(`「${product.name}」を${quantity}個発注しました。`);
    }
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleShowDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setOrderProduct(null);
  };

  const handleShowEarningSummaryDetails = () => {
    setIsEarningSummaryModalOpen(true);
  };

  const handleCloseEarningSummaryModal = () => {
    setIsEarningSummaryModalOpen(false);
  };

  const handleOrderCancel = (orderId: string) => {
    setOrdersInProgress(ordersInProgress.filter(order => order.id !== orderId));
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

  const handleGoToSearch = () => {
    router.push('/search');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <EarningSummary 
        summary={mockEarningSummary} 
        onShowDetails={handleShowEarningSummaryDetails}
      />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">商品一覧</h2>
          <button 
            onClick={handleGoToSearch}
            className="btn-secondary text-sm"
          >
            🔍 新たな商品を探す
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 max-w-full">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={handleOrder}
              onDelete={handleDelete}
              onShowDetails={handleShowDetails}
            />
          ))}
        </div>
      </div>



      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      <OrderConfirmModal
        product={orderProduct}
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        onConfirm={handleOrderConfirm}
      />

      <EarningSummaryDetailModal
        summary={mockEarningSummary}
        isOpen={isEarningSummaryModalOpen}
        onClose={handleCloseEarningSummaryModal}
      />
    </div>
  );
} 