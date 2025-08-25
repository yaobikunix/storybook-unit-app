/**
 * MSW（モックサーバー）を有効判定
 * クライアントか、サーバーサイドかを判定した上でMSWを実行する
 */
let initialized = false;
export async function startMSW() {
  // let initialized = false;

  // すでに初期化されている場合は即座に完了を返す
  if (initialized) {
    console.log('MSW already initialized, skipping');
    return true;
  }

  // // サーバーサイド側でモックサーバーを起動する場合（windowかどうかをここでチェック）
  // if (typeof window === 'undefined') {
  //   console.log('use server');
  //   const { server } = await import('./server');
  //   return server.listen();
  // }

  // try {
  //   // クライアント側でモックサーバーを起動する場合（ブラウザ上での実行）
  //   const { worker } = await import('./browser');
  //   console.log('use client - starting MSW worker');
  //   // console.log('use client');
  //   await worker.start();
  //   console.log('MSW worker started successfully');
  //   initialized = true;
  //   return Promise.resolve();
  // } catch (error: unknown) {
  //   console.error('MSW（モックサーバー）の起動に失敗しました。:', error);
  //   return Promise.reject(error);
  // }

  try {
    if (typeof window === 'undefined') {
      console.log('use server');
      const { server } = await import('./server');
      await server.listen();
    } else {
      // クライアント側
      const { worker } = await import('./browser');
      console.log('use client - starting MSW worker');
      await worker.start({
        onUnhandledRequest: 'bypass', // 未処理のリクエストはバイパス
      });
      console.log('MSW worker started successfully');
    }
    initialized = true;
    return true;
  } catch (error) {
    console.error('MSW initialization error:', error);
    return false;
  }
}
