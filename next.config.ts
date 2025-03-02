import type { NextConfig } from 'next';

/**
 * この修正が必要な理由
 * Next.js は ブラウザ用のバンドル でも msw/node を参照しようとすることがあります。
 * しかし、msw/node は require('fs') など Node.js 専用の API を使っているため、ブラウザでバンドルしようとするとエラーになります。
 * config.resolve.alias で "msw/node": false にすることで、Webpack に「このモジュールは無視していい」と指示できます。
 */
const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // サーバービルド時は `msw/browser` を無視
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/browser': false,
      };
    } else {
      // クライアントサイドビルド時は `msw/node` を無視
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/node': false,
      };
    }
    return config;
  },
};

export default nextConfig;
