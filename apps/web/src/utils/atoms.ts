import { atom } from "jotai";
import { GetMultiShelfRequest } from "@/models/shelf/shelfRequests.ts";
import { GetMultiUserRequest } from "@/models/user/userRequest.ts";
import { GetMultiGoodRequest } from "@/models/good/goodRequests.ts";
import { GetMultiCategoryRequest } from "@/models/category/categoryRequests.ts";

export const shelfSearchParams = atom<GetMultiShelfRequest>({
  pagination: {
    page: "1",
    pageSize: sessionStorage.getItem("pageSize") ?? "24",
  },
});

export const userSearchParams = atom<GetMultiUserRequest>({
  pagination: {
    page: "1",
    pageSize: sessionStorage.getItem("pageSize") ?? "24",
  },
});

export const warehouseGoodSearchParams = atom<GetMultiGoodRequest>({
  withAmount: true,
  pagination: {
    page: "1",
    pageSize: sessionStorage.getItem("pageSize") ?? "24",
  },
});

export const storeGoodSearchParams = atom<GetMultiGoodRequest>({
  withAmount: false,
  pagination: {
    page: "1",
    pageSize: sessionStorage.getItem("pageSize") ?? "24",
  },
});

export const adminCategoryParams = atom<GetMultiCategoryRequest>({
  withAmount: true,
  pagination: {
    page: "1",
    pageSize: sessionStorage.getItem("pageSize") ?? "24",
  },
});

export const warehouseCategoryParams = atom<GetMultiCategoryRequest>({
  withAmount: false,
});
