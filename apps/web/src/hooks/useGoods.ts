import { useMutation, useQuery } from "@tanstack/react-query";
import goodApi from "../api/goodsApi.ts";
import { GoodPurchase } from "@/models/good/good.ts";
import {
  GetMultiGoodRequest,
  GoodSellRequest,
  PostSingleGoodRequest,
  PutSingleGoodRequest,
} from "@/models/good/goodRequests.ts";

export const useGetGood = (id: number) => {
  return useQuery({
    queryKey: ["good", id],
    queryFn: async () => {
      return await goodApi.getSingle(id);
    },
  });
};

export const useCreateGood = () => {
  return useMutation({
    mutationFn: async (payload: PostSingleGoodRequest) => {
      return await goodApi.createSingle(payload);
    },
  });
};

export const useGetStoreGoods = (params: GetMultiGoodRequest) => {
  return useQuery({
    queryKey: ["goodsStore", params],
    queryFn: async () => {
      return await goodApi.getMultipleStore(params);
    },
  });
};

export const useGetWarehouseGoods = (params: GetMultiGoodRequest) => {
  return useQuery({
    queryKey: ["goodsWarehouse", params],
    queryFn: async () => {
      return await goodApi.getMultipleWarehouse(params);
    },
  });
};

export const usePurchaseGood = (id: number) => {
  return useMutation({
    mutationFn: async (payload: GoodPurchase) => {
      return await goodApi.postSingle(id, payload);
    },
  });
};

export const useSellGood = (id: number) => {
  return useMutation({
    mutationFn: async (payload: GoodSellRequest) => {
      return await goodApi.sellSingle(id, payload);
    },
  });
};

export const useUpdateGood = (id: number) => {
  return useMutation({
    mutationFn: async (payload: PutSingleGoodRequest) => {
      return await goodApi.putSingle(id, payload);
    },
  });
};

export const useDeleteGood = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await goodApi.deleteSingle(id);
    },
  });
};
