/**
 * MSW（Mock Service Worker）初期化処理
 *
 * 【重要】MSWの構造的制約について：
 * - MSWはブラウザ用（msw/browser）とNode.js用（msw/node）で完全に異なるパッケージを使用
 * - 両者は同一環境で共存できない（環境固有のAPIに依存）
 * - Next.jsのSSR/SSGでは同じコードが両環境で実行されるため構造的な不整合が発生
 *
 * 【なぜ関数分割できないか】：
 * Webpackの静的解析により、関数として存在するだけで内部のimportが解析される
 * 例：async function initClient() { await import('./browser'); }
 * → この関数が存在するだけでbrowser.ts内のmsw/browserが解析されエラーになる
 *
 * 【解決策】：
 * 条件付きdynamic importを直接記述することで、webpack aliasによる環境別無効化を活用
 */
let initialized = false;

export async function startMSW() {
  if (initialized) {
    console.log('MSW already initialized, skipping');
    return true;
  }

  try {
    if (typeof window === 'undefined') {
      // サーバーサイド処理：next.configでmsw/browserが無効化されているため安全に実行可能
      const { getServer } = await import('./server');
      const server = await getServer();
      server.listen();
      console.log('[MSW] server started (node)');
    } else {
      // クライアントサイド処理：next.configでmsw/nodeが無効化されているため安全に実行可能
      const { getWorker } = await import('./browser');
      const worker = await getWorker();
      await worker.start({ onUnhandledRequest: 'bypass' });
      console.log('[MSW] worker started (browser)');
    }

    initialized = true;
    console.log('[MSW] started successfully');
    return true;
  } catch (error) {
    console.error('[MSW] init error:', error);
    return false;
  }
}
