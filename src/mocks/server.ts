/**
 * サーバー用MSW（Mock Service Worker）設定
 *
 * 【このファイルの役割】：
 * - Node.js環境でHTTPモジュールを直接フックしてHTTPリクエストをモック化
 * - SSR/SSG時のサーバーサイドAPI呼び出しをインターセプトしてモックレスポンスを返す
 * - テスト環境でのAPIモック化にも使用
 *
 * 【重要な制約】：
 * - msw/nodeはNode.js環境（fs、http等のNode.js API）に依存している
 * - ブラウザ環境では実行不可（next.config.jsでaliasによる無効化が必要）
 * - dynamic importを使用し、Webpackの静的解析問題を回避する
 *
 * 【シングルトンパターンの理由】：
 * HTTPモジュールフックの重複適用を避けるため、インスタンスを使い回す
 */
import type { SetupServerApi } from 'msw/node';

// サーバーインスタンスをシングルトンで管理
let serverInstance: SetupServerApi | null = null;

export const getServer = async (): Promise<SetupServerApi> => {
  // 環境チェック：ブラウザ環境での実行を阻止
  if (typeof window !== 'undefined') {
    throw new Error('getServer() was called in a browser environment');
  }

  // 既存インスタンスがあれば再利用（HTTPフックの重複適用防止）
  if (serverInstance) return serverInstance;

  // dynamic importでWebpackの静的解析を回避
  // next.config.jsのaliasと組み合わせて安全にNode.js専用モジュールを読み込み
  const { setupServer } = await import('msw/node');
  const { handlers } = await import('./handlers');

  // サーバーインスタンスを作成・キャッシュ
  serverInstance = setupServer(...handlers);
  return serverInstance;
};
