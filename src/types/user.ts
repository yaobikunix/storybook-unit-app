export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type UserMeta = {
  page: number;
  perPage: number;
  totalCount: number;
};

export type UserResponse = {
  status: number;
  meta: UserMeta;
  data: User[] | undefined;
};
