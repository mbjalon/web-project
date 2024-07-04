import { Request, Response } from "express";
import { handleRepositoryErrors, parseRequest } from "../utils";
import statsRepository from "./repository";
import { getWarehouseStatsRequestSchema } from "./validationSchema";
import { FilterCriteria, GetStatsResponse } from "./types";

const getWarehouseStats = async (req: Request, res: Response) => {
  const request = await parseRequest(getWarehouseStatsRequestSchema, req, res);
  if (request === null) return;

  const filter: FilterCriteria = { ...request.body };
  let stats: GetStatsResponse = {};
  if (request.query["total-amount"]) {
    const totalAmountResult = await statsRepository.getTotalAmount(filter);
    if (totalAmountResult.isErr) {
      handleRepositoryErrors(totalAmountResult.error, res);
      return;
    }
    stats = { ...stats, totalAmount: totalAmountResult.value };
  }

  if (request.query["total-value"]) {
    const totalValueResult = await statsRepository.getTotalValue(filter);
    if (totalValueResult.isErr) {
      handleRepositoryErrors(totalValueResult.error, res);
      return;
    }
    stats = { ...stats, totalValue: totalValueResult.value.totalValue };
  }

  if (request.query["total-capacity"]) {
    const totalCapacityResult = await statsRepository.getTotalCapacity();
    if (totalCapacityResult.isErr) {
      handleRepositoryErrors(totalCapacityResult.error, res);
      return;
    }
    stats = {
      ...stats,
      totalCapacity: totalCapacityResult.value.totalCapacity,
    };
  }

  const response = {
    data: stats,
    message: "Warehouse stats fetched successfully",
  };

  res.status(200).send(response);
};

const getTotalValue = async (_req: Request, res: Response) => {
  const totalValue = await statsRepository.getTotalValue({});
  if (totalValue.isErr) {
    handleRepositoryErrors(totalValue.error, res);
    return;
  }

  res.status(200).send(totalValue.value);
};

const getTotalAmount = async (_req: Request, res: Response) => {
  const totalAmount = await statsRepository.getTotalAmount({});
  if (totalAmount.isErr) {
    handleRepositoryErrors(totalAmount.error, res);
    return;
  }

  res.status(200).send(totalAmount.value);
};

const getTotalCapacity = async (_req: Request, res: Response) => {
  const totalCapacity = await statsRepository.getTotalCapacity();
  if (totalCapacity.isErr) {
    handleRepositoryErrors(totalCapacity.error, res);
    return;
  }

  res.status(200).send(totalCapacity.value);
};

const statsController = {
  getTotalValue,
  getTotalAmount,
  getTotalCapacity,
  getWarehouseStats,
};

export default statsController;
