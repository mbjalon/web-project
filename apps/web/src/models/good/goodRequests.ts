import { Unit } from "@/types/types.ts";

export type GetMultiGoodRequest = {
  name?: string;
  categoryName?: string;
  withAmount?: boolean;
  pagination?: {
    page?: string;
    pageSize?: string;
  };
};

export type GoodSellRequest = {
  quantity: number;
};

export type PutSingleGoodRequest = {
  name?: string;
  description?: string;
  unit?: Unit;
  categoryName?: string;
};

export type PostSingleGoodRequest = {
  name: string;
  description: string;
  unit: Unit;
  categoryName: string;
};
