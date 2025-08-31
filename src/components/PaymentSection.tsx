'use client';

import { useState } from 'react';
import type { PaymentInfo } from '@/types';

interface PaymentSectionProps {
  paymentInfo: PaymentInfo;
  onUpdate: (paymentInfo: PaymentInfo) => void;
}

export default function PaymentSection({ paymentInfo, onUpdate }: PaymentSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPaymentInfo, setEditedPaymentInfo] = useState(paymentInfo);

  const handleEdit = () => {
    setEditedPaymentInfo(paymentInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedPaymentInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPaymentInfo(paymentInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    setEditedPaymentInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const maskAccountNumber = (accountNumber: string) => {
    return accountNumber.replace(/./g, '*').slice(0, -3) + accountNumber.slice(-3);
  };

  if (isEditing) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">支払い情報編集</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">銀行名</label>
            <input
              type="text"
              className="input-field"
              value={editedPaymentInfo.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">支店名</label>
            <input
              type="text"
              className="input-field"
              value={editedPaymentInfo.branchName}
              onChange={(e) => handleInputChange('branchName', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">口座種別</label>
            <select
              className="select-field"
              value={editedPaymentInfo.accountType}
              onChange={(e) => handleInputChange('accountType', e.target.value as 'checking' | 'savings')}
            >
              <option value="checking">普通預金</option>
              <option value="savings">貯蓄預金</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">口座番号</label>
            <input
              type="text"
              className="input-field"
              value={editedPaymentInfo.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              placeholder="7桁の数字"
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
        <h3 className="text-lg font-semibold text-gray-900">支払い情報</h3>
        <button onClick={handleEdit} className="btn-secondary text-sm">
          ✏️ 編集
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">銀行名</span>
          <span className="font-medium">{paymentInfo.bankName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">支店名</span>
          <span className="font-medium">{paymentInfo.branchName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">口座種別</span>
          <span className="font-medium">
            {paymentInfo.accountType === 'checking' ? '普通預金' : '貯蓄預金'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">口座番号</span>
          <span className="font-medium">{maskAccountNumber(paymentInfo.accountNumber)}</span>
        </div>
      </div>
    </div>
  );
} 