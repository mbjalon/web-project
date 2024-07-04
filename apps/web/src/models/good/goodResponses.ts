import { GoodStore, GoodWarehouse } from "@/models/good/good.ts";
import { Unit } from "@/types/types.ts";

export type GetMultiGoodStoreResponse = {
  data: GoodStore[];
  message: string;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
};

export type GetMultiGoodWarehouseResponse = {
  data: GoodWarehouse[];
  message: string;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
};

export type PutSingleGoodResponse = {
  id: number;
  name: string;
  description: string;
  unit: Unit;
  categoryId: string;
};

export type PostSingleGoodResponse = {
  id: number;
  name: string;
  description: string;
  unit: Unit;
  categoryId: number;
};
