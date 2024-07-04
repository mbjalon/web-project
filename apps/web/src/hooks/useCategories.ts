import { useMutation, useQuery } from "@tanstack/react-query";
import categoriesApi from "@/api/categoriesApi.ts";
import { CategoryBasic } from "@/models/category/category.ts";
import {
  GetMultiCategoryRequest,
  PutSingleCategoryRequest,
} from "@/models/category/categoryRequests.ts";

export const useGetCategory = (id: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      return await categoriesApi.getSingle(id);
    },
  });
};

export const useGetCategories = (params: GetMultiCategoryRequest) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      return await categoriesApi.getMultiple(params);
    },
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (payload: CategoryBasic) => {
      return await categoriesApi.postSingle(payload);
    },
  });
};

export const useUpdateCategory = (id: number) => {
  return useMutation({
    mutationFn: async (payload: PutSingleCategoryRequest) => {
      return await categoriesApi.putSingle(id, payload);
    },
  });
};

export const useDeleteCategory = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await categoriesApi.deleteSingle(id);
    },
  });
};
