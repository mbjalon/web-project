import prisma from "../client";
import { Result } from "@badrap/result";
import { handleDatabaseError } from "../utils";
import { NotFoundError } from "../errors";
import {
  CategoryCreateData,
  CategoryCreateResult,
  CategoryReadManyResult,
  CategoryReadResult,
  CategoryRequestQuery,
} from "./types";
import { DbResult } from "../types";
import { GoodCountResult } from "../good/types";

const create = async (data: CategoryCreateData): CategoryCreateResult => {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
      },
    });
    return Result.ok(category);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const read = async (id: number): CategoryReadResult => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return Result.err(new NotFoundError(`Category with id ${id} not found`));
    }

    return Result.ok(category);
  } catch (error) {
    return Result.err(error as Error);
  }
};

const readMany = async (
  criteria: CategoryRequestQuery,
): CategoryReadManyResult => {
  const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE) || 24;
  try {
    const categories = await prisma.category.findMany({
      ...(criteria.withAmount && {
        where: {
          name: { startsWith: criteria.name },
        },
      }),
      select: {
        id: true,
        name: true,
        ...(criteria.withAmount && {
          _count: {
            select: {
              Goods: true,
            },
          },
        }),
      },
      ...(criteria.withAmount && {
        skip: criteria.pagination
          ? (criteria.pagination.page - 1) *
            (criteria.pagination.pageSize || defaultPageSize)
          : undefined,
        take: criteria.pagination
          ? criteria.pagination.pageSize
          : defaultPageSize,
      }),
    });

    return Result.ok(categories);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const remove = async (id: number): DbResult<void> => {
  try {
    await prisma.category.delete({ where: { id } });
    return Result.ok(undefined);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const update = async (
  id: number,
  data: CategoryCreateData,
): CategoryCreateResult => {
  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
    return Result.ok(category);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const count = async (criteria: CategoryRequestQuery): GoodCountResult => {
  try {
    const count = await prisma.category.count({
      where: {
        name: { startsWith: criteria.name },
      },
    });
    return Result.ok(count);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const categoryRepository = {
  create,
  read,
  readMany,
  remove,
  update,
  count,
};

export default categoryRepository;
