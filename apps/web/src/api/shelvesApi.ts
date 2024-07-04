import BaseApi from "./baseApi";
import {
  GetMultiShelfRequest,
  PostMultiShelfRequest,
  PostSingleShelfRequest,
  PutSingleShelfRequest,
} from "@/models/shelf/shelfRequests.ts";
import {
  GetCoordinatesResponse,
  GetMultiShelfResponse,
  GetSingleShelfResponse,
  PostMultiShelfResponse,
  PostSingleShelfResponse,
  PutSingleShelfResponse,
} from "@/models/shelf/shelfResponses.ts";

const SHELVES_PREFIX = "/shelves";

// USER
async function getSingle(id: number) {
  return BaseApi.getSingle<GetSingleShelfResponse>(`${SHELVES_PREFIX}/${id}`);
}

async function getMultiple(params: GetMultiShelfRequest) {
  return BaseApi.getMultiple<GetMultiShelfResponse>(SHELVES_PREFIX, {
    params,
  });
}

// ADMIN
async function postSingle(payload: PostSingleShelfRequest) {
  return BaseApi.postSingle<PostSingleShelfResponse>(
    `${SHELVES_PREFIX}/single`,
    payload,
  );
}

async function postMulti(payload: PostMultiShelfRequest) {
  return BaseApi.postSingle<PostMultiShelfResponse>(
    `${SHELVES_PREFIX}/bulk`,
    payload,
  );
}

async function putSingle(id: number, payload: PutSingleShelfRequest) {
  return BaseApi.putSingle<PutSingleShelfResponse>(
    `${SHELVES_PREFIX}/${id}`,
    payload,
  );
}

async function deleteSingle(id: number) {
  return BaseApi.deleteSingle(`${SHELVES_PREFIX}/${id}`);
}

async function getCoordinates() {
  return BaseApi.getSingle<GetCoordinatesResponse>(`${SHELVES_PREFIX}/coords`);
}

const ShelvesApi = {
  getSingle,
  getMultiple,
  postSingle,
  postMulti,
  putSingle,
  deleteSingle,
  getCoordinates,
};

export default ShelvesApi;
