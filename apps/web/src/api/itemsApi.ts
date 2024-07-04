import BaseApi from "./baseApi";
import {
  GetSingleItemResponse,
  MoveSingleItemResponse,
} from "@/models/item/itemResponses.ts";
import { MoveSingleItemRequest } from "@/models/item/itemRequests.ts";

const ITEMS_PREFIX = "/items";

async function getSingle(id: number) {
  return BaseApi.getSingle<GetSingleItemResponse>(`${ITEMS_PREFIX}/${id}`);
}

async function moveSingle(id: number, payload: MoveSingleItemRequest) {
  return BaseApi.putSingle<MoveSingleItemResponse>(
    `${ITEMS_PREFIX}/${id}`,
    payload,
  );
}

const ItemsApi = {
  getSingle,
  moveSingle,
};

export default ItemsApi;
