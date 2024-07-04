export const isFloatOrNumber = (value: string) => {
  return /^\d*\.?\d*$/.test(value);
};
