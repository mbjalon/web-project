import { DbResult, Pagination } from "../types";

export type CategoryCreateData = {
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type CategoryCreateResult = DbResult<Category>;

export type CategoryReadResult = DbResult<Category>;
export type CategoryReadManyResult = DbResult<
  (Category & { _count: { Goods: number } })[]
>;

export type CategoryRequestQuery = {
  name?: string;
  withAmount?: boolean;
  pagination?: Pagination;
};
