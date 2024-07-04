import { Request, Response } from "express";
import {
  deleteUserRequestSchema,
  editUserRequestSchema,
  getUsersRequestSchema,
  registerSchema,
} from "./validationSchema";
import { fromZodError } from "zod-validation-error";
import { handleErrors, handleRepositoryErrors, parseRequest } from "../utils";
import authRepository from "./repository";

const register = async (req: Request, res: Response) => {
  const validRequest = await registerSchema.safeParseAsync(req);

  if (!validRequest.success) {
    const error = fromZodError(validRequest.error);
    const errorResponse: Error = {
      name: "ValidationError",
      message: error.message,
      cause: error.cause,
    };
    res.status(400).send(errorResponse);
    return;
  }

  const { email, password, role } = validRequest.data.body;

  const userExists = await authRepository.checkExists(email);

  if (userExists.isErr) {
    handleErrors(userExists.error, res);
    return;
  }

  if (userExists.value) {
    res.status(400).send({ message: "User already exists" });
    return;
  }

  const user = await authRepository.create({
    email,
    password,
    role,
    deletedAt: null,
  });

  if (user.isErr) {
    handleErrors(user.error, res);
    return;
  }

  res.status(201).end();
};

const login = async (req: Request, res: Response) => {
  res.status(200).send(req.user);
};

const deleteUser = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteUserRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const user = await authRepository.delete(id);

  if (user.isErr) {
    handleErrors(user.error, res);
    return;
  }

  res.status(204).end("User deleted successfully");
};

const editUser = async (req: Request, res: Response) => {
  const request = await parseRequest(editUserRequestSchema, req, res);

  if (request === null) return;

  const { id } = request.params;
  const data = request.body;

  const result = await authRepository.update(id, data);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const response = {
    data: result.value,
    message: "User updated successfully",
  };

  res.send(response);
};

const readUsers = async (req: Request, res: Response) => {
  const request = await parseRequest(getUsersRequestSchema, req, res);
  if (request === null) return;

  const result = await authRepository.readMany(request.query);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  const response = {
    data: result.value,
    message: "Users fetched successfully",
  };

  res.send(response);
};

export const authController = {
  register,
  login,
  deleteUser,
  editUser,
  readUsers,
};
