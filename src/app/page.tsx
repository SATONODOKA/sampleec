'use client';

import { useState } from 'react';
import EarningSummary from '@/components/EarningSummary';
import ProductCard from '@/components/ProductCard';
import OrderInProgressCard from '@/components/OrderInProgressCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { mockEarningSummary, mockProducts, mockOrdersInProgress } from '@/lib/mockData';
import type { Product, OrderInProgress } from '@/types';

export default function HomePage() {
  const [products, setProducts] = useState(mockProducts);
  const [ordersInProgress, setOrdersInProgress] = useState(mockOrdersInProgress);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrder = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const newOrder: OrderInProgress = {
        id: `o${Date.now()}`,
        productName: product.name,
        orderDate: new Date().toISOString().split('T')[0],
        expectedDeliveryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'ordered',
      };
      setOrdersInProgress([...ordersInProgress, newOrder]);
      alert(`「${product.name}」の発注を開始しました。`);
    }
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleShowDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <EarningSummary summary={mockEarningSummary} />

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">商品一覧</h2>
        <div className="space-y-4">
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

      {ordersInProgress.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">発注処理中</h2>
          <div className="space-y-3">
            {ordersInProgress.map((order) => (
              <OrderInProgressCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
} 