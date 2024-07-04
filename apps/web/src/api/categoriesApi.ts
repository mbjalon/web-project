import BaseApi from "./baseApi";
import {
  GetMultiCategoryResponse,
  PutSingleCategoryResponse,
} from "@/models/category/categoryResponses.ts";
import { Category, CategoryBasic } from "@/models/category/category.ts";
import {
  GetMultiCategoryRequest,
  PutSingleCategoryRequest,
} from "@/models/category/categoryRequests.ts";

const CATEGORIES_PREFIX = "/categories";

async function getSingle(id: number) {
  return BaseApi.getSingle<Category>(`${CATEGORIES_PREFIX}/${id}`);
}

async function getMultiple(params: GetMultiCategoryRequest) {
  return BaseApi.getMultiple<GetMultiCategoryResponse>(CATEGORIES_PREFIX, {
    params,
  });
}

async function postSingle(payload: CategoryBasic) {
  return BaseApi.postSingle<Category>(CATEGORIES_PREFIX, payload);
}

async function putSingle(id: number, payload: PutSingleCategoryRequest) {
  return BaseApi.putSingle<PutSingleCategoryResponse>(
    `${CATEGORIES_PREFIX}/${id}`,
    payload,
  );
}

async function deleteSingle(id: number) {
  return BaseApi.deleteSingle(`${CATEGORIES_PREFIX}/${id}`);
}

const CategoriesApi = {
  getSingle,
  getMultiple,
  postSingle,
  putSingle,
  deleteSingle,
};

export default CategoriesApi;
