/* Use this generic type to type the return value of your repository calls */
import { Result } from "@badrap/result";

export type DbResult<T> = Promise<Result<T>>;

export type Pagination = {
  page: number;
  pageSize?: number;
};

export enum Unit {
  pcs = "pcs",
  kg = "kg",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
