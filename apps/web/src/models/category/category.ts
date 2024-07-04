export type CategoryBasic = {
  name: string;
};

export type Category = CategoryBasic & {
  id: number;
};

export type CategoryWithCount = Category & { _count?: { Goods: number } };
