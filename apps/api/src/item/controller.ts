import { Request, Response } from "express";
import { handleRepositoryErrors, parseRequest } from "../utils";
import {
  getItemRequestSchema,
  moveItemRequestSchema,
} from "./validationSchema";
import itemRepository from "./repository";

const getItem = async (req: Request, res: Response) => {
  const request = await parseRequest(getItemRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;

  const item = await itemRepository.read(id);
  if (item.isErr) {
    handleRepositoryErrors(item.error, res);
    return;
  }

  const response = {
    data: item.value,
    message: "Item fetched successfully",
  };
  res.send(response);
};

const moveItem = async (req: Request, res: Response) => {
  const request = await parseRequest(moveItemRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;
  const data = request.body;

  const item = await itemRepository.move(id, data);
  if (item.isErr) {
    handleRepositoryErrors(item.error, res);
    return;
  }

  const response = {
    data: item.value,
    message: "Moved successfully",
  };
  res.send(response);
};

const itemController = {
  getItem,
  moveItem,
};

export default itemController;
