'use client';

import { useState } from 'react';
import type { StoreProfile } from '@/types';

interface ProfileSectionProps {
  profile: StoreProfile;
  onUpdate: (profile: StoreProfile) => void;
}

export default function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof StoreProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isEditing) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">店舗プロフィール編集</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">店舗名</label>
            <input
              type="text"
              className="input-field"
              value={editedProfile.storeName}
              onChange={(e) => handleInputChange('storeName', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">住所</label>
            <input
              type="text"
              className="input-field"
              value={editedProfile.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">業態</label>
            <select
              className="select-field"
              value={editedProfile.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
            >
              <option value="カフェ・レストラン">カフェ・レストラン</option>
              <option value="小売店">小売店</option>
              <option value="美容・健康">美容・健康</option>
              <option value="宿泊・観光">宿泊・観光</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">規模</label>
            <select
              className="select-field"
              value={editedProfile.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
            >
              <option value="小規模 (10席以下)">小規模 (10席以下)</option>
              <option value="中規模 (11-50席)">中規模 (11-50席)</option>
              <option value="大規模 (50席以上)">大規模 (50席以上)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">主な顧客層</label>
            <input
              type="text"
              className="input-field"
              value={editedProfile.mainCustomers}
              onChange={(e) => handleInputChange('mainCustomers', e.target.value)}
              placeholder="例: 20-40代女性"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button onClick={handleSave} className="btn-primary">
              保存
            </button>
            <button onClick={handleCancel} className="btn-secondary">
              キャンセル
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">店舗プロフィール</h3>
        <button onClick={handleEdit} className="btn-secondary text-sm">
          ✏️ 編集
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">店舗名</span>
          <span className="font-medium">{profile.storeName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">住所</span>
          <span className="font-medium">{profile.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">業態</span>
          <span className="font-medium">{profile.businessType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">規模</span>
          <span className="font-medium">{profile.size}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">主な顧客層</span>
          <span className="font-medium">{profile.mainCustomers}</span>
        </div>
      </div>
    </div>
  );
} 