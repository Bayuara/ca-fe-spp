export type SharedResult<T = unknown> = {
  data: T;
  message: string;
  status: string;
  page?: {
    totalItems: number;
  };
  totalAmount?: number;
};
