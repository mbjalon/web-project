import { DbResult } from "../types";

export type WarehouseTotalValue = {
  totalValue: number;
};

export type WarehouseTotalAmount = {
  totalAmountKg: number;
  totalAmountPcs: number;
};

export type WarehouseTotalCapacity = {
  totalCapacity: number;
};

export type WarehouseTotalValueResult = DbResult<WarehouseTotalValue>;
export type WarehouseTotalAmountResult = DbResult<WarehouseTotalAmount>;
export type WarehouseTotalCapacityResult = DbResult<WarehouseTotalCapacity>;

export type FilterGoods = {
  name?: string;
  category?: string;
};

export type FilterCriteria = {
  goods?: FilterGoods;
};

export type FilterObject = {
  Good?: {
    name?: {
      startsWith?: string;
    };
    Category?: {
      name?: {
        startsWith?: string;
      };
    };
  };
};

export type GetStatsResponse = {
  totalValue?: number;
  totalAmount?: {
    totalAmountKg: number;
    totalAmountPcs: number;
  };
  totalCapacity?: number;
};
