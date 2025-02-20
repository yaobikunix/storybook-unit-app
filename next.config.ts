import type { NextConfig } from 'next';

/**
 * この修正が必要な理由
 * Next.js は ブラウザ用のバンドル でも msw/node を参照しようとすることがあります。
 * しかし、msw/node は require('fs') など Node.js 専用の API を使っているため、ブラウザでバンドルしようとするとエラーになります。
 * config.resolve.alias で "msw/node": false にすることで、Webpack に「このモジュールは無視していい」と指示できます。
 */
const nextConfig: NextConfig = {
  /* config options here */
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.alias["msw/node"] = false;
  //   }
  //   return config;
  // },
};

export default nextConfig;
