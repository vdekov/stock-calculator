export type GetStockHistoryParams = {
  from: Date;
  to: Date;
};

export type GetStockHistoryResponse = {
  minDateTime: string;
  minPrice: number;
  maxDateTime: string;
  maxPrice: number;
};
