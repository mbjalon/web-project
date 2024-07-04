import { Item, Shelf } from "@prisma/client";
import { DbResult } from "../types";

export type ItemCreateData = {
  goodId: number;
  shelfId: number;
  quantity: number;
  pricePerUnit: number;
  storageDate: Date;
  stockedById: number;
};

type ShelfData = {
  id?: number;
  row: number;
  position: number;
  level: number;
};

export type ItemWithShelf = Omit<Item, "shelfId"> & {
  Shelf: ShelfData;
};

export type ItemCreateManyData = ItemCreateData[];

export type ItemCreateResult = DbResult<ItemWithShelf>;

export type ItemCreateManyResult = DbResult<number>;

export type ItemReadResult = DbResult<ItemWithShelf>;

export type ItemReadManyResult = DbResult<ItemWithShelf[]>;

export type ItemMoveData = {
  amount: number;
  shelf: ShelfData;
};

export type ItemMoveResult = DbResult<{
  updatedItem: Item & {
    Shelf: Omit<Shelf, "id" | "capacity">;
  };
  newItem?: Item & {
    Shelf: Omit<Shelf, "id" | "capacity">;
  };
}>;
