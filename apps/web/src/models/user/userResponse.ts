import { UserWithId } from "@/models/user/user.ts";

export type GetMultiUserResponse = {
  data: UserWithId[];
  message: string;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
};

export type PostSingleUserResponse = {
  data: UserWithId;
  message: string;
};

export type PutSingleUserResponse = PostSingleUserResponse;

export type PostLoginSingleUserResponse = UserWithId;
