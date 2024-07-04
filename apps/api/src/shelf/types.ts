import { Shelf } from "@prisma/client";
import { DbResult, Pagination } from "../types";

export type ShelfCreateData = {
  row: number;
  position: number;
  level: number;
  capacity: number;
};

export type ShelfCreateManyData = {
  fromRow: number;
  toRow: number;
  fromPosition: number;
  toPosition: number;
  fromLevel: number;
  toLevel: number;
  capacity: number;
};

export type ShelfWithItems = Shelf & {
  Items: {
    id: number;
    quantity: number;
  }[];
};

export type ShelfWithItemsAndFreeCapacity = ShelfWithItems & {
  freeCapacity: number;
};

export type ShelfCreateResult = DbResult<ShelfWithItemsAndFreeCapacity>;
export type ShelfCreateManyResult = DbResult<number>;
export type ShelfCountResult = DbResult<number>;
export type ShelfCoordsResult = DbResult<
  { row: number; position: number; level: number }[]
>;

export type ShelfReadResult = DbResult<ShelfWithItemsAndFreeCapacity>;

export type ShelfReadManyResult = DbResult<ShelfWithItemsAndFreeCapacity[]>;

export type FilterCriteria = {
  row?: number;
  position?: number;
  level?: number;
  freeCapacity?: number;
};

export type ShelvesRequestQuery = FilterCriteria & {
  pagination?: Pagination;
};
