import { useMutation, useQuery } from "@tanstack/react-query";
import userApi from "@/api/usersApi.ts";
import {
  GetMultiUserRequest,
  PostSingleUserRequest,
  PutSingleUserRequest,
  PostLoginSingleUserRequest,
} from "@/models/user/userRequest.ts";

export const useGetUsers = (params: GetMultiUserRequest) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      return await userApi.getMultiple(params);
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (payload: PostSingleUserRequest) => {
      return await userApi.postSingle(payload);
    },
  });
};

export const useUpdateUser = (id: number) => {
  return useMutation({
    mutationFn: async (payload: PutSingleUserRequest) => {
      return await userApi.putSingle(id, payload);
    },
  });
};

export const useDeleteUser = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await userApi.deleteSingle(id);
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (payload: PostLoginSingleUserRequest) => {
      return await userApi.postLoginSingle(payload);
    },
  });
};

export const useLogout = () => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      return await userApi.getLogoutSingle();
    },
  });
};
