'use client';

import type { RecommendedProduct } from '@/types';

interface RecommendedProductDetailModalProps {
  product: RecommendedProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onOrder: (product: RecommendedProduct) => void;
}

// モックデータ：実際のAPIから取得される商品詳細情報
const getProductDetails = (productId: string) => {
  const mockDetails = {
    r1: {
      description: '厳選された茶葉を使用した、香り高いプレミアムグリーンティーです。無農薬栽培にこだわり、自然本来の味わいを大切にしています。',
      manufacturer: {
        name: '京都茶園株式会社',
        features: '創業100年の老舗茶園。伝統的な製法と最新技術を融合した高品質な茶葉を生産。',
        strengths: '・無農薬・有機栽培へのこだわり\n・職人による手摘み茶葉\n・独自の発酵技術',
        message: '日本の茶文化を世界に広めることをミッションとし、健康と美味しさを両立した商品をお届けします。'
      },
      specifications: {
        price: '¥2,800',
        weight: '100g',
        origin: '京都府宇治市',
        expiry: '製造から2年'
      }
    },
    r2: {
      description: '環境に優しい素材を使用したタンブラーです。保温・保冷機能に優れ、デザイン性も抜群。日常使いからアウトドアまで幅広くご利用いただけます。',
      manufacturer: {
        name: 'エコライフ製品株式会社',
        features: '持続可能な社会の実現を目指し、環境負荷の少ない製品開発に特化した企業。',
        strengths: '・100%リサイクル可能素材使用\n・優れた保温性能（6時間キープ）\n・スタイリッシュなデザイン',
        message: '地球環境を守りながら、快適な生活をサポートする製品をお届けします。'
      },
      specifications: {
        price: '¥3,200',
        capacity: '350ml',
        material: 'ステンレス鋼（リサイクル材）',
        colors: '5色展開'
      }
    },
    r3: {
      description: '天然由来成分100%のスキンケアセットです。敏感肌の方にも安心してお使いいただける、肌に優しい処方となっています。',
      manufacturer: {
        name: 'ナチュラルビューティー株式会社',
        features: '自然の力を活かした化粧品の研究開発に25年間取り組む専門企業。',
        strengths: '・天然由来成分100%\n・パラベン・合成香料フリー\n・皮膚科医監修の安全性テスト実施',
        message: '自然の恵みを活かし、すべての方に美しく健やかな肌をお届けすることが私たちの使命です。'
      },
      specifications: {
        price: '¥4,500',
        contents: '洗顔料・化粧水・乳液（各30ml）',
        ingredients: 'アロエベラ、ホホバオイル、ヒアルロン酸',
        skinType: '全肌質対応'
      }
    },
    r4: {
      description: '養蜂家が丹精込めて作った100%純粋なオーガニックハチミツです。花の種類にこだわり、季節ごとの味わいをお楽しみいただけます。',
      manufacturer: {
        name: '山田養蜂場',
        features: '3代続く老舗養蜂場。ミツバチの健康管理から蜜の採取まで一貫して手がける。',
        strengths: '・無添加・非加熱処理\n・抗菌作用のあるマヌカハニー配合\n・トレーサビリティ完備',
        message: 'ミツバチと自然環境を大切にし、安心・安全で美味しいハチミツをお届けします。'
      },
      specifications: {
        price: '¥1,800',
        volume: '250g',
        flowers: 'アカシア・クローバー・さくら',
        harvest: '国産（長野県）'
      }
    }
  };
  
  return mockDetails[productId as keyof typeof mockDetails] || mockDetails.r1;
};

export default function RecommendedProductDetailModal({ product, isOpen, onClose, onOrder }: RecommendedProductDetailModalProps) {
  if (!isOpen || !product) return null;

  const details = getProductDetails(product.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full max-h-[85vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">商品詳細</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* 商品基本情報 */}
          <div className="mb-6">
            <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{details.description}</p>
          </div>

          {/* 商品仕様 */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">商品仕様</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(details.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key === 'price' ? '価格' : key === 'weight' ? '内容量' : key === 'origin' ? '産地' : key === 'expiry' ? '賞味期限' : key === 'capacity' ? '容量' : key === 'material' ? '素材' : key === 'colors' ? 'カラー' : key === 'contents' ? 'セット内容' : key === 'ingredients' ? '主要成分' : key === 'skinType' ? '対応肌質' : key === 'volume' ? '内容量' : key === 'flowers' ? '花の種類' : key === 'harvest' ? '産地' : key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* メーカー情報 */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">メーカー情報</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-1">{details.manufacturer.name}</h5>
                <p className="text-sm text-gray-600">{details.manufacturer.features}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-2">特徴・強み</h5>
                <div className="text-sm text-gray-600 whitespace-pre-line">
                  {details.manufacturer.strengths}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-2">メッセージ</h5>
                <p className="text-sm text-gray-600 italic">
                  "{details.manufacturer.message}"
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="btn-secondary">
              閉じる
            </button>
            <button 
              onClick={() => {
                onOrder(product);
                onClose();
              }} 
              className="btn-primary"
            >
              発注
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 