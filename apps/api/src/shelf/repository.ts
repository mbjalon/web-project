import {
  FilterCriteria,
  ShelfCoordsResult,
  ShelfCountResult,
  ShelfCreateData,
  ShelfCreateManyData,
  ShelfCreateManyResult,
  ShelfCreateResult,
  ShelfReadManyResult,
  ShelfReadResult,
  ShelvesRequestQuery,
} from "./types";
import prisma from "../client";
import { Result } from "@badrap/result";
import { handleDatabaseError } from "../utils";
import { DbResult } from "../types";
import { ConflictError, NotFoundError } from "../errors";

const shelfIncludeFields = {
  Items: {
    select: {
      id: true,
      quantity: true,
    },
  },
};

const create = async (data: ShelfCreateData): ShelfCreateResult => {
  try {
    const shelf = await prisma.shelf.create({
      data: {
        row: data.row,
        position: data.position,
        level: data.level,
        capacity: data.capacity,
      },
      include: shelfIncludeFields,
    });
    const shelfWithFreeCapacity = { ...shelf, freeCapacity: data.capacity };
    return Result.ok(shelfWithFreeCapacity);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const createMany = async (data: ShelfCreateManyData): ShelfCreateManyResult => {
  try {
    const newShelves = Array.from(
      { length: data.toRow - data.fromRow + 1 },
      (_, row) => {
        return Array.from(
          { length: data.toPosition - data.fromPosition + 1 },
          (_, position) => {
            return Array.from(
              { length: data.toLevel - data.fromLevel + 1 },
              (_, level) => {
                return {
                  row: row + data.fromRow,
                  position: position + data.fromPosition,
                  level: level + data.fromLevel,
                  capacity: data.capacity,
                };
              },
            );
          },
        );
      },
    ).flat(2);

    const shelves = await prisma.shelf.createMany({
      data: newShelves,
      skipDuplicates: true,
    });

    return Result.ok(shelves.count);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const read = async (id: number): ShelfReadResult => {
  try {
    const shelf = await prisma.shelf.findUnique({
      where: {
        id,
      },
      include: shelfIncludeFields,
    });

    if (!shelf) {
      return Result.err(new NotFoundError(`Shelf with id ${id} not found`));
    }

    // Query to get the total quantity of items on the shelf
    const totalQuantity = await prisma.item.aggregate({
      where: { shelfId: shelf.id },
      _sum: { quantity: true },
    });

    const freeCapacity = shelf.capacity - (totalQuantity._sum.quantity || 0);
    const shelfWithFreeCapacity = { ...shelf, freeCapacity };
    return Result.ok(shelfWithFreeCapacity);
  } catch (error) {
    return Result.err(error as Error);
  }
};

const readByPosition = async (
  row: number,
  position: number,
  level: number,
): ShelfReadResult => {
  try {
    const shelf = await prisma.shelf.findFirst({
      where: {
        row,
        position,
        level,
      },
      include: shelfIncludeFields,
    });

    if (!shelf) {
      return Result.err(
        new NotFoundError(
          `Shelf with row ${row}, position ${position}, level ${level} not found`,
        ),
      );
    }

    // Query to get the total quantity of items on the shelf
    const totalQuantity = await prisma.item.aggregate({
      where: { shelfId: shelf.id },
      _sum: { quantity: true },
    });

    const freeCapacity = shelf.capacity - (totalQuantity._sum.quantity || 0);
    const shelfWithFreeCapacity = { ...shelf, freeCapacity };
    return Result.ok(shelfWithFreeCapacity);
  } catch (error) {
    return Result.err(error as Error);
  }
};

const readMany = async (criteria: ShelvesRequestQuery): ShelfReadManyResult => {
  const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE) || 24;
  try {
    const shelves = await prisma.shelf.findMany({
      where: {
        ...(criteria.row !== undefined && { row: criteria.row }),
        ...(criteria.level !== undefined && { level: criteria.level }),
        ...(criteria.position !== undefined && { position: criteria.position }),
      },
      include: shelfIncludeFields,
      skip: criteria.pagination
        ? (criteria.pagination.page - 1) *
          (criteria.pagination.pageSize || defaultPageSize)
        : undefined,
      take: criteria.pagination
        ? criteria.pagination.pageSize
        : defaultPageSize,
    });
    const shelvesWithTotalQuantity = shelves.map((shelf) => {
      const totalQuantity = shelf.Items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      const freeCapacity = shelf.capacity - totalQuantity;
      return { ...shelf, freeCapacity };
    });

    if (criteria.freeCapacity !== undefined) {
      return Result.ok(
        shelvesWithTotalQuantity.filter(
          (shelf) => shelf.freeCapacity >= (criteria.freeCapacity || 0),
        ),
      );
    }

    return Result.ok(shelvesWithTotalQuantity);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const update = async (id: number, data: ShelfCreateData): ShelfCreateResult => {
  try {
    const currentShelfResult = await read(id);
    if (currentShelfResult.isErr) {
      return currentShelfResult;
    }
    const currentShelf = currentShelfResult.value;
    const totalQuantity = currentShelf.capacity - currentShelf.freeCapacity;
    if (totalQuantity > data.capacity) {
      return Result.err(
        new ConflictError(
          "Cannot update shelf with less capacity than the total quantity of items",
        ),
      );
    }
    const shelf = await prisma.shelf.update({
      where: { id },
      data: {
        row: data.row,
        position: data.position,
        level: data.level,
        capacity: data.capacity,
      },
      include: shelfIncludeFields,
    });

    const shelfWithFreeCapacity = {
      ...shelf,
      freeCapacity: data.capacity - totalQuantity,
    };
    return Result.ok(shelfWithFreeCapacity);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const remove = async (id: number): DbResult<void> => {
  try {
    await prisma.shelf.delete({ where: { id } });
    return Result.ok(undefined);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const count = async (criteria: FilterCriteria): ShelfCountResult => {
  try {
    const count = await prisma.shelf.count({
      where: {
        ...(criteria.row !== undefined && { row: criteria.row }),
        ...(criteria.level !== undefined && { level: criteria.level }),
        ...(criteria.position !== undefined && { position: criteria.position }),
      },
    });
    return Result.ok(count);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const readCoordinates = async (): ShelfCoordsResult => {
  try {
    const coordinates = await prisma.shelf.findMany({
      select: {
        row: true,
        position: true,
        level: true,
      },
    });
    return Result.ok(coordinates);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const shelfRepository = {
  create,
  createMany,
  read,
  readByPosition,
  readMany,
  update,
  delete: remove,
  count,
  readCoordinates,
};

export default shelfRepository;
