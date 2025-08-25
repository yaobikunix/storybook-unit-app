/**
 * MSW（Mock Service Worker）用Webpack設定
 *
 * 【この設定が必要な理由】：
 * MSWは環境固有のパッケージ（msw/browser、msw/node）を使用するが、
 * Next.jsでは同じコードが両環境で実行されるため、以下の問題が発生する：
 *
 * 1. サーバービルド時にmsw/browserが解析される
 *    → Service Worker APIが存在せずエラー
 *
 * 2. クライアントビルド時にmsw/nodeが解析される
 *    → Node.js固有API（fs、http等）が存在せずエラー
 *
 * 【解決方法】：
 * webpack aliasでトップレベルインポートを環境別に無効化することで、
 * 不要な環境でのモジュール解析を阻止する
 */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // サーバービルド時：ブラウザ専用モジュールを無効化
      // msw/browser内のService Worker APIアクセスを阻止
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/browser': false,
      };
    } else {
      // クライアントビルド時：Node.js専用モジュールを無効化
      // msw/node内のNode.js固有APIアクセスを阻止
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/node': false,
      };
    }
    return config;
  },
};

export default nextConfig;

/**
 * この修正が必要な理由
 * Next.js は ブラウザ用のバンドル でも msw/node を参照しようとすることがあります。
 * しかし、msw/node は require('fs') など Node.js 専用の API を使っているため、ブラウザでバンドルしようとするとエラーになります。
 * config.resolve.alias で "msw/node": false にすることで、Webpack に「このモジュールは無視していい」と指示できます。
 */
