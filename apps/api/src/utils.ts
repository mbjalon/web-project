import type { Request, Response } from "express";
import type { ZodSchema, ZodTypeDef } from "zod";
import { fromZodError } from "zod-validation-error";
import { Prisma } from "@prisma/client";
import { Result } from "@badrap/result";
import {
  AlreadyExistsError,
  ConflictError,
  InternalError,
  NotFoundError,
} from "./errors";

export const handleRepositoryErrors = (e: Error, res: Response) => {
  if (e instanceof NotFoundError) {
    res.status(404).send({
      name: e.name || "NotFoundError",
      message: e.message || "Entity not found",
      cause: e.cause,
    });
  } else if (e instanceof InternalError) {
    res.status(500).send({
      name: e.name || "InternalError",
      message: e.message || "Something went wrong on our side.",
      cause: e.cause,
    });
  } else if (e instanceof ConflictError) {
    res.status(400).send({
      name: e.name || "ConflictError",
      message: e.message || "Conflict",
      cause: e.cause,
    });
  } else {
    res.status(500).send({
      name: "UnknownError",
      message: "Something went wrong.",
    });
  }
};

export const parseRequest = async <
  Output,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(
  schema: ZodSchema<Output, Def, Input>,
  req: Request,
  res: Response,
) => {
  const parsedRequest = await schema.safeParseAsync(req);

  if (!parsedRequest.success) {
    const error = fromZodError(parsedRequest.error);
    const errorResponse: Error = {
      name: "ValidationError",
      message: error.message,
      cause: error.cause,
    };
    res.status(400).send(errorResponse);
    return null;
  }

  return parsedRequest.data;
};

const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
): Result<never, Error> => {
  switch (error.code) {
    case "P2002":
      return Result.err(
        new AlreadyExistsError("A record with the same id already exists."),
      );
    case "P2025":
      return Result.err(
        new NotFoundError("The requested record could not be found."),
      );
    default:
      return Result.err(new InternalError());
  }
};

export const handleDatabaseError = (error: Error): Result<never, Error> => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }
  return Result.err(new InternalError());
};

export const handleErrors = (e: Error, res: Response) => {
  if (e instanceof NotFoundError) {
    const { name, message, cause } = e;
    const response: Error = { name, message, cause };
    res.status(404).send(response);
    return;
  }

  const { name, message, cause } = e;
  if (!(e instanceof InternalError)) {
    e = new InternalError();
  }

  const response: Error = { name, message, cause };
  res.status(500).send(response);
};
