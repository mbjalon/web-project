import { Unit } from "@/types/types.ts";

export type GoodStore = {
  id: number;
  name: string;
  description: string;
  unit: Unit;
  amount: number;
  categoryId: string;
  Category: { name: string };
};

export type GoodPurchase = {
  userId: string;
  amount: string;
  pricePerUnit: string;
};

export type GoodWarehouse = GoodStore & {
  value: number;
  Items: { quantity: number; id: number }[];
};
