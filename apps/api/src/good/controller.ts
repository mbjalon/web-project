import { Request, Response } from "express";
import {
  buyGoodRequestSchema,
  createGoodRequestSchema,
  deleteGoodRequestSchema,
  getGoodRequestSchema,
  getGoodsRequestSchema,
  sellGoodRequestSchema,
  updateGoodRequestSchema,
} from "./validationSchema";
import goodRepository from "./repository";
import { handleRepositoryErrors, parseRequest } from "../utils";

const createGood = async (req: Request, res: Response) => {
  const request = await parseRequest(createGoodRequestSchema, req, res);
  if (request === null) return;

  const data = request.body;

  const result = await goodRepository.create(data);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const response = {
    data: result.value,
    message: "Good created successfully",
  };
  res.status(201).send(response);
};

const getGood = async (req: Request, res: Response) => {
  const request = await parseRequest(getGoodRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;
  const withAmount = request.query.withAmount;

  const result = await goodRepository.read(id, withAmount);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const response = {
    data: result.value,
    message: "Good fetched successfully",
  };
  res.send(response);
};

const getGoods = async (req: Request, res: Response) => {
  const request = await parseRequest(getGoodsRequestSchema, req, res);
  if (request === null) return;

  const result = await goodRepository.readMany(request.query);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const totalFilteredGoods = await goodRepository.count(request.query);
  if (totalFilteredGoods.isErr) {
    handleRepositoryErrors(totalFilteredGoods.error, res);
    return;
  }

  const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE) || 24;
  const pageSize = request.query.pagination?.pageSize ?? defaultPageSize;
  const totalPages = Math.ceil(totalFilteredGoods.value / pageSize);

  const response = {
    data: result.value,
    message: "Goods fetched successfully",
    pagination: {
      currentPage: request.query.pagination?.page ?? 0,
      pageSize: pageSize,
      totalPages: totalPages,
    },
  };
  res.send(response);
};

const updateGood = async (req: Request, res: Response) => {
  const request = await parseRequest(updateGoodRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;
  const data = request.body;

  const result = await goodRepository.update(id, data);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const response = {
    data: result.value,
    message: "Good updated successfully",
  };
  res.send(response);
};

const deleteGood = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteGoodRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;

  const result = await goodRepository.delete(id);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  res.status(204).send("Good deleted successfully");
};

const sellGood = async (req: Request, res: Response) => {
  const request = await parseRequest(sellGoodRequestSchema, req, res);

  if (request === null) return;

  const { id } = request.params;
  const data = request.body;

  const result = await goodRepository.sell(id, data.quantity);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const response = {
    data: result.value,
    message: "Sold successfully",
  };
  res.send(response);
};

const buyGood = async (req: Request, res: Response) => {
  const request = await parseRequest(buyGoodRequestSchema, req, res);

  if (request === null) return;

  const { id } = request.params;
  const data = request.body;

  const result = await goodRepository.buy(id, data);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const response = {
    data: result.value,
    message: "Bought successfully",
  };
  res.send(response);
};

const goodController = {
  createGood,
  getGood,
  getGoods,
  updateGood,
  buyGood,
  sellGood,
  deleteGood,
};

export default goodController;
