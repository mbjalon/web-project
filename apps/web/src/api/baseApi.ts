import axios, { AxiosRequestConfig } from "axios";

const SERVER_URI = import.meta.env.SERVER_URI || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
});

async function getSingle<T>(path: string) {
  const res = await axiosInstance.get<T>(path);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
}

async function getMultiple<T>(path: string, config?: AxiosRequestConfig) {
  const res = await axiosInstance.get<T>(path, config);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
}

async function putSingle<T>(path: string, payload: unknown) {
  const res = await axiosInstance.put<T>(path, payload);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
}

async function postSingle<T>(path: string, payload: unknown) {
  const res = await axiosInstance.post<T>(path, payload);
  if (res.status !== 201) {
    throw new Error(res.statusText);
  }
  return res.data;
}

async function purchaseSingle<T>(path: string, payload: unknown) {
  const res = await axiosInstance.post<T>(path, payload);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
}

async function loginSingle<T>(path: string, payload: unknown) {
  const res = await axiosInstance.post<T>(path, payload);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
}

async function deleteSingle(path: string) {
  const res = await axiosInstance.delete(path);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res.data;
}

const BaseApi = {
  getSingle,
  getMultiple,
  postSingle,
  putSingle,
  deleteSingle,
  loginSingle,
  purchaseSingle,
};

export default BaseApi;
