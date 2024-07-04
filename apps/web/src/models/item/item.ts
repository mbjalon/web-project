export type Item = {
  id: number;
  userId: number;
  pricePerUnit: number;
  quantity: number;
  storageDate: Date;
  goodId: number;
  Shelf: {
    id: number;
    row: number;
    position: number;
    level: number;
  };
};
