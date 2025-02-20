/**
 * ブラウザでのみMSWを有効化する
 */
export async function startMSW() {
  let initialized = false;

  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    return server.listen();
  }

  if (initialized) {
    return Promise.resolve();
  }

  try {
    const { worker } = await import('./browser');
    // 明示的に worker.start() のみを呼び出す
    await worker.start();
    initialized = true;
    return Promise.resolve();
  } catch (error) {
    console.error('MSW initialization failed:', error);
    return Promise.reject(error);
  }
}
