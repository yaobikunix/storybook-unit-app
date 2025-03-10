/**
 * MSW（モックサーバー）を有効判定
 * クライアントか、サーバーサイドかを判定した上でMSWを実行する
 */
export async function startMSW() {
  let initialized = false;

  // サーバーサイド側でモックサーバーを起動（windowかどうかをここでチェック）
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    return server.listen();
  }

  // 初期化がすでに行われている場合、何もしない
  if (initialized) {
    return Promise.resolve();
  }

  try {
    // ブラウザ上でモックサーバーを起動（クライアント側での実行）
    const { worker } = await import('./browser');
    await worker.start();
    initialized = true;
    return Promise.resolve();
  } catch (error: unknown) {
    console.error('MSW（モックサーバー）の起動に失敗しました。:', error);
    return Promise.reject(error);
  }
}
