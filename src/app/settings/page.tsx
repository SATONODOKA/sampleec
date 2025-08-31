'use client';

import { useState } from 'react';
import ProfileSection from '@/components/ProfileSection';
import PaymentSection from '@/components/PaymentSection';
import ContactSection from '@/components/ContactSection';
import { mockStoreProfile, mockPaymentInfo, mockContactInfo } from '@/lib/mockData';
import type { StoreProfile, PaymentInfo, ContactInfo } from '@/types';

export default function SettingsPage() {
  const [storeProfile, setStoreProfile] = useState(mockStoreProfile);
  const [paymentInfo, setPaymentInfo] = useState(mockPaymentInfo);
  const [contactInfo, setContactInfo] = useState(mockContactInfo);

  const handleProfileUpdate = (profile: StoreProfile) => {
    setStoreProfile(profile);
    console.log('店舗プロフィール更新:', profile);
    alert('店舗プロフィールが更新されました。');
  };

  const handlePaymentUpdate = (payment: PaymentInfo) => {
    setPaymentInfo(payment);
    console.log('支払い情報更新:', payment);
    alert('支払い情報が更新されました。');
  };

  const handleContactUpdate = (contact: ContactInfo) => {
    setContactInfo(contact);
    console.log('担当者連絡先更新:', contact);
    alert('担当者連絡先が更新されました。');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">設定</h1>
      
      <div className="space-y-8">
        <ProfileSection 
          profile={storeProfile} 
          onUpdate={handleProfileUpdate} 
        />
        
        <PaymentSection 
          paymentInfo={paymentInfo} 
          onUpdate={handlePaymentUpdate} 
        />
        
        <ContactSection 
          contactInfo={contactInfo} 
          onUpdate={handleContactUpdate} 
        />
      </div>
    </div>
  );
} 