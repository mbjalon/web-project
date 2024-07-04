export type PutSingleCategoryRequest = {
  name?: string;
};

export type GetMultiCategoryRequest = {
  name?: string;
  withAmount?: boolean;
  pagination?: {
    page?: string;
    pageSize?: string;
  };
};
