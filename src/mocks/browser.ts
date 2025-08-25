/**
 * ブラウザ用MSW（Mock Service Worker）設定
 *
 * 【このファイルの役割】：
 * - ブラウザ環境でService Workerを使ったHTTPリクエストのモック化
 * - クライアントサイドでのAPI呼び出しをインターセプトしてモックレスポンスを返す
 *
 * 【重要な制約】：
 * - msw/browserはブラウザ環境（Service Worker API）に依存している
 * - サーバー環境では実行不可（next.config.jsでaliasによる無効化が必要）
 * - dynamic importを使用し、Webpackの静的解析問題を回避する
 *
 * 【シングルトンパターンの理由】：
 * Service Workerの重複登録を避けるため、インスタンスを使い回す
 */
import type { SetupWorker } from 'msw/browser';

// Service Workerインスタンスをシングルトンで管理
let workerInstance: SetupWorker | null = null;

export const getWorker = async (): Promise<SetupWorker> => {
  // 環境チェック：サーバー環境での実行を阻止
  if (typeof window === 'undefined') {
    throw new Error('getWorker() was called in a non-browser environment');
  }

  // 既存インスタンスがあれば再利用（Service Workerの重複登録防止）
  if (workerInstance) return workerInstance;

  // dynamic importでWebpackの静的解析を回避
  // next.config.jsのaliasと組み合わせて安全にブラウザ専用モジュールを読み込み
  const { setupWorker } = await import('msw/browser');
  const { handlers } = await import('./handlers');

  // Service Workerインスタンスを作成・キャッシュ
  workerInstance = setupWorker(...handlers);
  return workerInstance;
};
