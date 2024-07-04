export const isNumber = (value: string) => {
  return value === "" || /^\d+$/.test(value);
};
