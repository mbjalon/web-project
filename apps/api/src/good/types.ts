import { DbResult, Pagination } from "../types";
import { Good } from "@prisma/client";

export type GoodCreateData = Omit<Good, "id" | "categoryId"> & {
  categoryName: string;
};

export type GoodBuyData = {
  userId: number;
  amount: number;
  pricePerUnit: number;
};

export type FilterCriteria = {
  name?: string;
  categoryName?: string;
  withAmount: boolean;
};

export type GoodWithAmount = Good & {
  amount?: number;
  value?: number;
};

export type GoodsRequestQuery = FilterCriteria & {
  pagination?: Pagination;
};

export type GoodCreateResult = DbResult<Good>;
export type GoodWithAmountReadResult = DbResult<GoodWithAmount>;
export type GoodWithAmountReadManyResult = DbResult<GoodWithAmount[]>;

export type GoodCountResult = DbResult<number>;
