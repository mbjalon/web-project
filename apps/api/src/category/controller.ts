import { Request, Response } from "express";
import { handleRepositoryErrors, parseRequest } from "../utils";
import {
  createCategoryRequestSchema,
  deleteCategoryRequestSchema,
  getCategoriesRequestSchema,
  getCategoryRequestSchema,
  updateCategoryRequestSchema,
} from "./validationSchema";
import categoryRepository from "./repository";

const createCategory = async (req: Request, res: Response) => {
  const request = await parseRequest(createCategoryRequestSchema, req, res);
  if (request === null) return;

  const category = request.body;

  const newCategory = await categoryRepository.create(category);
  if (newCategory.isErr) {
    handleRepositoryErrors(newCategory.error, res);
    return;
  }

  const response = {
    data: newCategory.value,
    message: "Category created successfully",
  };

  res.status(201).send(response);
};

const getCategory = async (req: Request, res: Response) => {
  const request = await parseRequest(getCategoryRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;

  const category = await categoryRepository.read(id);
  if (category.isErr) {
    handleRepositoryErrors(category.error, res);
    return;
  }

  const response = {
    data: category.value,
    message: "Category fetched successfully",
  };
  res.send(response);
};

const getCategories = async (req: Request, res: Response) => {
  const request = await parseRequest(getCategoriesRequestSchema, req, res);
  if (request === null) return;

  const categories = await categoryRepository.readMany(request.query);
  if (categories.isErr) {
    handleRepositoryErrors(categories.error, res);
    return;
  }

  const totalFilteredCategories = await categoryRepository.count(request.query);
  if (totalFilteredCategories.isErr) {
    handleRepositoryErrors(totalFilteredCategories.error, res);
    return;
  }

  const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE) || 24;
  const pageSize = request.query.pagination?.pageSize ?? defaultPageSize;
  const totalPages = Math.ceil(totalFilteredCategories.value / pageSize);

  const response = {
    data: categories.value,
    message: "Categories fetched successfully",
    pagination: {
      currentPage: request.query.pagination?.page ?? 0,
      pageSize: pageSize,
      totalPages: totalPages,
    },
  };

  res.send(response);
};

const deleteCategory = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteCategoryRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;

  const result = await categoryRepository.remove(id);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  res.status(204).send("Category deleted successfully");
};

const updateCategory = async (req: Request, res: Response) => {
  const request = await parseRequest(updateCategoryRequestSchema, req, res);
  if (request === null) return;

  const { id } = request.params;
  const data = request.body;

  const result = await categoryRepository.update(id, data);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const response = {
    data: result.value,
    message: "Category updated successfully",
  };
  res.send(response);
};

const categoryController = {
  createCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};

export default categoryController;
