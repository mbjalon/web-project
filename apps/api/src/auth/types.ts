import { DbResult, Pagination } from "../types";
import { User } from "@prisma/client";

export type UserCreateData = Omit<User, "id"> & {
  password: string;
};

export type UserUpdateData = Partial<Omit<User, "id" | "password">>;

export type UserCheckExistsResult = DbResult<boolean>;

export type UserReadResult = DbResult<User | null>;

export type UserDeleteResult = DbResult<null>;

export type UserCreateResult = DbResult<User>;

export type UserUpdateResult = DbResult<User>;

export type UserReadManyResult = DbResult<User[]>;

export type FilterCriteria = {
  email?: string;
  role?: string;
};

export type UserReadManyCriteria = FilterCriteria & {
  pagination?: Pagination;
};
