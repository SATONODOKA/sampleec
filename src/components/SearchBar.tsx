'use client';

import { useState } from 'react';
import type { SearchFilters } from '@/types';
import { regionOptions, categoryOptions, targetAudienceOptions } from '@/lib/mockData';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    region: '全国',
    category: '全てのカテゴリ',
    targetAudience: '全ての層',
    keyword: '',
  });

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="card mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">商品を探す</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">地域</label>
          <select 
            className="select-field"
            value={filters.region}
            onChange={(e) => handleInputChange('region', e.target.value)}
          >
            {regionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">商材</label>
          <select 
            className="select-field"
            value={filters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">対象層</label>
          <select 
            className="select-field"
            value={filters.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          >
            {targetAudienceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="フリーワードで検索..."
          className="input-field flex-1"
          value={filters.keyword}
          onChange={(e) => handleInputChange('keyword', e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch} className="btn-primary px-8">
          検索
        </button>
      </div>
    </div>
  );
} 