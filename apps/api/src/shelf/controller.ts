import { Request, Response } from "express";
import { handleRepositoryErrors, parseRequest } from "../utils";
import shelfRepository from "./repository";
import {
  createShelfRequestSchema,
  createShelvesRequestSchema,
  deleteShelfRequestSchema,
  getShelfRequestSchema,
  getShelvesRequestSchema,
  updateShelfRequestSchema,
} from "./validationSchema";

const createShelf = async (req: Request, res: Response) => {
  const request = await parseRequest(createShelfRequestSchema, req, res);
  if (request === null) return;

  const shelf = request.body;

  const newShelf = await shelfRepository.create(shelf);
  if (newShelf.isErr) {
    handleRepositoryErrors(newShelf.error, res);
    return;
  }

  const response = {
    data: newShelf.value,
    message: "Shelf created successfully",
  };

  res.status(201).send(response);
};

const createShelves = async (req: Request, res: Response) => {
  const request = await parseRequest(createShelvesRequestSchema, req, res);
  if (request === null) return;

  const params = request.body;

  const shelvesCreated = await shelfRepository.createMany(params);
  if (shelvesCreated.isErr) {
    handleRepositoryErrors(shelvesCreated.error, res);
    return;
  }

  const response = {
    data: shelvesCreated.value,
    message: "Shelves created successfully",
  };
  res.status(201).send(response);
};

const getShelf = async (req: Request, res: Response) => {
  const request = await parseRequest(getShelfRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;

  const shelf = await shelfRepository.read(id);
  if (shelf.isErr) {
    handleRepositoryErrors(shelf.error, res);
    return;
  }

  const response = {
    data: shelf.value,
    message: "Shelf fetched successfully",
  };
  res.send(response);
};

const getShelves = async (req: Request, res: Response) => {
  const request = await parseRequest(getShelvesRequestSchema, req, res);
  if (request === null) return;

  const shelves = await shelfRepository.readMany(request.query);
  if (shelves.isErr) {
    handleRepositoryErrors(shelves.error, res);
    return;
  }

  const totalFilteredShelves = await shelfRepository.count(request.query);
  if (totalFilteredShelves.isErr) {
    handleRepositoryErrors(totalFilteredShelves.error, res);
    return;
  }
  const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE) || 24;
  const pageSize = request.query.pagination?.pageSize ?? defaultPageSize;
  const totalPages = Math.ceil(totalFilteredShelves.value / pageSize);

  const response = {
    data: shelves.value,
    message: "Shelves fetched successfully",
    pagination: {
      currentPage: request.query.pagination?.page ?? 0,
      pageSize: pageSize,
      totalPages: totalPages,
    },
  };

  res.send(response);
};

const updateShelf = async (req: Request, res: Response) => {
  const request = await parseRequest(updateShelfRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;
  const shelf = request.body;

  const updatedShelf = await shelfRepository.update(id, shelf);
  if (updatedShelf.isErr) {
    handleRepositoryErrors(updatedShelf.error, res);
    return;
  }

  const response = {
    data: updatedShelf.value,
    message: "Shelf updated successfully",
  };
  res.send(response);
};

const deleteShelf = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteShelfRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;

  const deletedShelf = await shelfRepository.delete(id);
  if (deletedShelf.isErr) {
    handleRepositoryErrors(deletedShelf.error, res);
    return;
  }

  res.status(204).send("Shelf deleted");
};

const readCoordinates = async (_: Request, res: Response) => {
  const coordinates = await shelfRepository.readCoordinates();
  if (coordinates.isErr) {
    handleRepositoryErrors(coordinates.error, res);
    return;
  }

  const response = {
    data: coordinates.value,
    message: "Coordinates fetched successfully",
  };

  res.send(response);
};

const categoryController = {
  createShelf,
  createShelves,
  getShelf,
  getShelves,
  updateShelf,
  deleteShelf,
  readCoordinates,
};

export default categoryController;
