'use client';

import { useState } from 'react';
import type { ContactInfo } from '@/types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  onUpdate: (contactInfo: ContactInfo) => void;
}

export default function ContactSection({ contactInfo, onUpdate }: ContactSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContactInfo, setEditedContactInfo] = useState(contactInfo);

  const handleEdit = () => {
    setEditedContactInfo(contactInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedContactInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContactInfo(contactInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setEditedContactInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isEditing) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">担当者連絡先編集</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">担当者名</label>
            <input
              type="text"
              className="input-field"
              value={editedContactInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
            <input
              type="tel"
              className="input-field"
              value={editedContactInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="03-1234-5678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
            <input
              type="email"
              className="input-field"
              value={editedContactInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="example@domain.com"
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
        <h3 className="text-lg font-semibold text-gray-900">担当者連絡先</h3>
        <button onClick={handleEdit} className="btn-secondary text-sm">
          ✏️ 編集
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">担当者名</span>
          <span className="font-medium">{contactInfo.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">電話番号</span>
          <span className="font-medium">{contactInfo.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">メールアドレス</span>
          <span className="font-medium">{contactInfo.email}</span>
        </div>
      </div>
    </div>
  );
} 