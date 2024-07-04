import { Result } from "@badrap/result";
import argon2 from "argon2";
import { handleDatabaseError } from "../utils";
import { NotFoundError } from "../errors";
import prisma from "../client";
import {
  UserCheckExistsResult,
  UserCreateData,
  UserCreateResult,
  UserDeleteResult,
  UserReadResult,
  UserReadManyCriteria,
  UserUpdateData,
  UserUpdateResult,
  UserReadManyResult,
} from "./types";
import { UserRole } from "@prisma/client";

const create = async (user: UserCreateData): UserCreateResult => {
  try {
    const password = await argon2.hash(user.password);
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: password,
        role: user.role,
      },
    });

    return Result.ok(newUser);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const readMany = async (criteria: UserReadManyCriteria): UserReadManyResult => {
  const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE) || 24;
  try {
    const users = await prisma.user.findMany({
      where: {
        email: { startsWith: criteria.email },
        ...(criteria.role !== undefined && {
          role: { equals: criteria.role as UserRole },
        }),
        deletedAt: null,
      },
      skip: criteria.pagination
        ? (criteria.pagination.page - 1) *
          (criteria.pagination.pageSize || defaultPageSize)
        : undefined,
      take: criteria.pagination
        ? criteria.pagination.pageSize
        : defaultPageSize,
    });
    return Result.ok(users);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const checkExists = async (email: string): UserCheckExistsResult => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Result.ok(false);
    }

    return Result.ok(true);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const getByEmail = async (email: string): UserReadResult => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });

    if (!user) {
      return Result.err(new NotFoundError("User with id ${id} not found"));
    }

    return Result.ok(user);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const getById = async (id: number): UserReadResult => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return Result.err(new NotFoundError("User with id ${id} not found"));
    }

    return Result.ok(user);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const remove = async (id: number): UserDeleteResult => {
  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });

    return Result.ok(null);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const update = async (id: number, user: UserUpdateData): UserUpdateResult => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: user,
    });

    return Result.ok(updatedUser);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const authRepository = {
  create,
  checkExists,
  getByEmail,
  getById,
  update,
  readMany,
  delete: remove,
};

export default authRepository;
