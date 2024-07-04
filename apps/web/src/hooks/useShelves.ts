import { useMutation, useQuery } from "@tanstack/react-query";
import shelfApi from "@/api/shelvesApi.ts";
import {
  GetMultiShelfRequest,
  PostMultiShelfRequest,
  PostSingleShelfRequest,
  PutSingleShelfRequest,
} from "@/models/shelf/shelfRequests.ts";

// USER
export const useGetShelf = (id: number) => {
  return useQuery({
    queryKey: ["shelf", id],
    queryFn: async () => {
      return await shelfApi.getSingle(id);
    },
  });
};

export const useGetShelves = (params: GetMultiShelfRequest) => {
  return useQuery({
    queryKey: ["shelves", params],
    queryFn: async () => {
      return await shelfApi.getMultiple(params);
    },
  });
};

// ADMIN
export const useCreateShelf = () => {
  return useMutation({
    mutationFn: async (payload: PostSingleShelfRequest) => {
      return await shelfApi.postSingle(payload);
    },
  });
};

export const useCreateShelves = () => {
  return useMutation({
    mutationFn: async (payload: PostMultiShelfRequest) => {
      return await shelfApi.postMulti(payload);
    },
  });
};

export const useUpdateShelf = (id: number) => {
  return useMutation({
    mutationFn: async (payload: PutSingleShelfRequest) => {
      return await shelfApi.putSingle(id, payload);
    },
  });
};

export const useDeleteShelf = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await shelfApi.deleteSingle(id);
    },
  });
};

export const useGetCoordinates = () => {
  return useQuery({
    queryKey: ["coordinates"],
    queryFn: async () => {
      return await shelfApi.getCoordinates();
    },
  });
};
