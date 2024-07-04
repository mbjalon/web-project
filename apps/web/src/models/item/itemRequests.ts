export type MoveSingleItemRequest = {
  amount: number;
  shelf: {
    row: number;
    position: number;
    level: number;
  };
};
