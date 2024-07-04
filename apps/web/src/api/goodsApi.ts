import BaseApi from "./baseApi";
import { GoodPurchase, GoodWarehouse } from "../models/good/good.ts";
import {
  GetMultiGoodRequest,
  GoodSellRequest,
  PostSingleGoodRequest,
  PutSingleGoodRequest,
} from "@/models/good/goodRequests.ts";
import {
  GetMultiGoodStoreResponse,
  GetMultiGoodWarehouseResponse,
  PostSingleGoodResponse,
  PutSingleGoodResponse,
} from "@/models/good/goodResponses.ts";

const GOODS_PREFIX = "/goods";

async function getSingle(id: number) {
  return BaseApi.getSingle<GoodWarehouse>(`${GOODS_PREFIX}/${id}`);
}

async function createSingle(payload: PostSingleGoodRequest) {
  return BaseApi.postSingle<PostSingleGoodResponse>(GOODS_PREFIX, payload);
}

async function getMultipleStore(params: GetMultiGoodRequest) {
  return BaseApi.getMultiple<GetMultiGoodStoreResponse>(GOODS_PREFIX, {
    params,
  });
}

async function getMultipleWarehouse(params: GetMultiGoodRequest) {
  return BaseApi.getMultiple<GetMultiGoodWarehouseResponse>(GOODS_PREFIX, {
    params,
  });
}

async function postSingle(id: number, payload: GoodPurchase) {
  return BaseApi.purchaseSingle<GoodPurchase>(`${GOODS_PREFIX}/${id}`, payload);
}

async function putSingle(id: number, payload: PutSingleGoodRequest) {
  return BaseApi.putSingle<PutSingleGoodResponse>(
    `${GOODS_PREFIX}/admin/${id}`,
    payload,
  );
}

async function sellSingle(id: number, payload: GoodSellRequest) {
  return BaseApi.putSingle<GoodWarehouse>(`${GOODS_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: number) {
  return BaseApi.deleteSingle(`${GOODS_PREFIX}/${id}`);
}

const GoodsApi = {
  getSingle,
  getMultipleStore,
  getMultipleWarehouse,
  postSingle,
  sellSingle,
  putSingle,
  deleteSingle,
  createSingle,
};

export default GoodsApi;
