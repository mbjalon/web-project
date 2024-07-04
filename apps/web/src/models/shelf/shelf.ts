export type ShelfCoords = {
  row?: string;
  position?: string;
  level?: string;
};

export type Shelf = ShelfCoords & {
  id: number;
  Items: { id: number }[];
  freeCapacity: string;
  capacity: string;
};
