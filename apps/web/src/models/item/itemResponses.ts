import { Item } from "@/models/item/item.ts";

export type GetSingleItemResponse = {
  data: Item;
  message: string;
};

export type MoveSingleItemResponse = GetSingleItemResponse;
