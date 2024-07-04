import { Category, CategoryWithCount } from "@/models/category/category.ts";

export type GetMultiCategoryResponse = {
  data: CategoryWithCount[];
  message: string;
  pagination?: {
    currentPage?: number;
    pageSize?: number;
    totalPages?: number;
  };
};

export type PutSingleCategoryResponse = Category;
