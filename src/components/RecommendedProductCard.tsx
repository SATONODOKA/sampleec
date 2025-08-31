import type { RecommendedProduct } from '@/types';

interface RecommendedProductCardProps {
  product: RecommendedProduct;
  onSelect: (product: RecommendedProduct) => void;
}

const reasonLabels = {
  nearby_popular: '近隣人気',
  industry_popular: '同業人気',
  similar_past: '過去人気類似',
  new_arrival: '新着',
};

export default function RecommendedProductCard({ product, onSelect }: RecommendedProductCardProps) {
  return (
    <div 
      className="card min-w-[240px] cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onSelect(product)}
    >
      <div className="relative">
        <div className="w-full h-28 bg-gray-200 rounded-lg overflow-hidden mb-3">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // 画像読み込みエラー時のフォールバック
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500" style={{display: 'none'}}>
            🎁
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
          <span className="text-lg">{product.reasonIcon}</span>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
      
              <div className="flex items-center justify-between">
          <span className="text-xs text-white bg-air-primary px-3 py-1 rounded-full font-medium shadow-sm">
            {reasonLabels[product.recommendationReason]}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="text-sm text-air-primary hover:text-air-dark font-medium"
          >
            詳細 →
          </button>
        </div>
    </div>
  );
} 