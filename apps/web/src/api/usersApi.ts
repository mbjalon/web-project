import BaseApi from "./baseApi";

import {
  GetMultiUserResponse,
  PostLoginSingleUserResponse,
  PostSingleUserResponse,
  PutSingleUserResponse,
} from "@/models/user/userResponse.ts";
import {
  GetMultiUserRequest,
  PostLoginSingleUserRequest,
  PostSingleUserRequest,
  PutSingleUserRequest,
} from "@/models/user/userRequest.ts";

const USERS_PREFIX = "/auth";

async function getMultiple(params: GetMultiUserRequest) {
  return BaseApi.getMultiple<GetMultiUserResponse>(USERS_PREFIX, { params });
}

async function postSingle(payload: PostSingleUserRequest) {
  return BaseApi.postSingle<PostSingleUserResponse>(
    `${USERS_PREFIX}/register`,
    payload,
  );
}

async function putSingle(id: number, payload: PutSingleUserRequest) {
  return BaseApi.putSingle<PutSingleUserResponse>(
    `${USERS_PREFIX}/${id}`,
    payload,
  );
}

async function deleteSingle(id: number) {
  return BaseApi.deleteSingle(`${USERS_PREFIX}/${id}`);
}

async function postLoginSingle(payload: PostLoginSingleUserRequest) {
  return await BaseApi.loginSingle<PostLoginSingleUserResponse>(
    `${USERS_PREFIX}/login`,
    payload,
  );
}

async function getLogoutSingle() {
  return await BaseApi.getSingle(`${USERS_PREFIX}/logout`);
}

const UsersApi = {
  getMultiple,
  postSingle,
  putSingle,
  deleteSingle,
  postLoginSingle,
  getLogoutSingle,
};

export default UsersApi;
