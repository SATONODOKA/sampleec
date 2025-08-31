/// <reference types="next" />
/// <reference types="next/image-types/global" />

// 環境変数の型定義
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_APP_URL?: string
  }
}

// WindowのlocalStorageを安全に使用するための型拡張
declare global {
  interface Window {
    localStorage: Storage
  }
} 