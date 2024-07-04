import { UserRole } from "@/types/types.ts";

export type GetMultiUserRequest = {
  email?: string;
  role?: string;
  pagination?: {
    page?: string;
    pageSize?: string;
  };
};

export type PostSingleUserRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export type PostLoginSingleUserRequest = {
  email: string;
  password: string;
};

export type PutSingleUserRequest = {
  email?: string;
  password?: string;
  role?: string;
};
