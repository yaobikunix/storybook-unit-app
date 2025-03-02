import type { NextConfig } from 'next';

/**
 * この修正が必要な理由
 * Next.js は ブラウザ用のバンドル でも msw/node を参照しようとすることがあります。
 * しかし、msw/node は require('fs') など Node.js 専用の API を使っているため、ブラウザでバンドルしようとするとエラーになります。
 * config.resolve.alias で "msw/node": false にすることで、Webpack に「このモジュールは無視していい」と指示できます。
 */
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,      // 'fs' モジュールを無効化
        path: false,    // 'path' モジュールを無効化
        os: false,      // 'os' モジュールを無効化
        ...config.resolve.fallback, // 既存の設定を引き継ぐ
      },
    };
    return config;
  },
};

export default nextConfig;
