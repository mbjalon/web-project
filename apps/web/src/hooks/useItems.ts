import { useMutation, useQuery } from "@tanstack/react-query";
import itemApi from "../api/itemsApi.ts";
import { MoveSingleItemRequest } from "@/models/item/itemRequests.ts";

export const useGetItem = (id: number) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      return await itemApi.getSingle(id);
    },
  });
};

export const useMoveItem = (id: number) => {
  return useMutation({
    mutationFn: async (payload: MoveSingleItemRequest) => {
      return await itemApi.moveSingle(id, payload);
    },
  });
};
