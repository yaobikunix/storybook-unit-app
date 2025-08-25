/** APIメソッドをエクスポートする */
export const mockUserResponse = {
  status: 200,
  meta: {
    page: 1, // 現在のページ
    perPage: 10, // 1ページあたりのアイテム数
    totalCount: 10, // ユーザーの総数
  },
  data: [
    {
      id: 1,
      name: 'MOCK User',
      username: 'mockuser',
      email: 'mock@example.com',
      // 必要なら他のフィールドも追加
    },
    {
      id: 2,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
  ],
};
