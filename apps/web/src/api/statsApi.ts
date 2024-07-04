import BaseApi from "./baseApi";
import {
  GetTotalValueResponse,
  GetTotalAmountResponse,
  GetTotalCapacityResponse,
} from "../models/stat/statResponses.ts";

const STATS_PREFIX = "/stats";

async function getTotalValue() {
  return BaseApi.getSingle<GetTotalValueResponse>(
    `${STATS_PREFIX}/total-value`,
  );
}

async function getTotalAmount() {
  return BaseApi.getSingle<GetTotalAmountResponse>(
    `${STATS_PREFIX}/total-amount`,
  );
}

async function getTotalCapacity() {
  return BaseApi.getSingle<GetTotalCapacityResponse>(
    `${STATS_PREFIX}/total-capacity`,
  );
}

const StatsApi = {
  getTotalValue,
  getTotalAmount,
  getTotalCapacity,
};

export default StatsApi;
