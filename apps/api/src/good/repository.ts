import prisma from "../client";
import {
  GoodBuyData,
  GoodCountResult,
  GoodCreateData,
  GoodCreateResult,
  GoodsRequestQuery,
  GoodWithAmountReadManyResult,
  GoodWithAmountReadResult,
  FilterCriteria,
} from "./types";
import { Result } from "@badrap/result";
import { handleDatabaseError } from "../utils";
import { ConflictError } from "../errors";
import { DbResult } from "../types";

const create = async (data: GoodCreateData): GoodCreateResult => {
  try {
    const good = await prisma.good.create({
      data: {
        name: data.name,
        unit: data.unit,
        description: data.description,
        Category: {
          connect: { name: data.categoryName },
        },
      },
    });
    return Result.ok(good);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const read = async (
  id: number,
  withAmount: boolean,
): GoodWithAmountReadResult => {
  try {
    const good = await prisma.good.findUnique({
      where: { id },
      include: {
        Items: {
          select: {
            quantity: true,
          },
        },
      },
    });

    if (!good) {
      return Result.err(new ConflictError("Good not found"));
    }

    if (!withAmount) {
      return Result.ok(good);
    }

    const amount = good.Items.reduce((acc, item) => acc + item.quantity, 0);
    return Result.ok({ ...good, amount });
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const readMany = async (
  criteria: GoodsRequestQuery,
): GoodWithAmountReadManyResult => {
  const defaultPageSize = Number(process.env.DEFAULT_PAGE_SIZE) || 24;
  try {
    const goods = await prisma.good.findMany({
      where: {
        name: { startsWith: criteria.name },
        Category: { name: { startsWith: criteria.categoryName } },
        ...(criteria.withAmount && { Items: { some: {} } }),
      },
      include: {
        Items: {
          select: {
            id: true,
            quantity: true,
            pricePerUnit: true,
          },
        },
        Category: {
          select: {
            name: true,
          },
        },
      },
      skip: criteria.pagination
        ? (criteria.pagination.page - 1) *
          (criteria.pagination.pageSize || defaultPageSize)
        : undefined,
      take: criteria.pagination
        ? criteria.pagination.pageSize
        : defaultPageSize,
    });

    if (!criteria.withAmount) {
      return Result.ok(
        goods.map((good) => ({
          ...good,
          amount: good.Items.reduce((acc, item) => acc + item.quantity, 0),
        })),
      );
    }

    const goodsWithAmount = goods.map((good) => {
      const amount = good.Items.reduce((acc, item) => acc + item.quantity, 0);
      const value = good.Items.reduce(
        (acc, item) => acc + item.quantity * item.pricePerUnit,
        0,
      );
      return { ...good, amount, value };
    });
    return Result.ok(goodsWithAmount);
  } catch (error) {
    console.log((error as Error).message);
    return handleDatabaseError(error as Error);
  }
};

const update = async (id: number, data: GoodCreateData): GoodCreateResult => {
  try {
    const good = await prisma.good.update({
      where: { id },
      data: {
        name: data.name,
        unit: data.unit,
        description: data.description,
        Category: {
          connect: { name: data.categoryName },
        },
      },
    });
    return Result.ok(good);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const remove = async (id: number): DbResult<void> => {
  try {
    await prisma.good.delete({ where: { id } });
    return Result.ok(undefined);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const sell = async (id: number, amount: number): DbResult<number> => {
  return await prisma
    .$transaction(async (prisma) => {
      // Get items sorted by storageDate
      const items = await prisma.item.findMany({
        where: { goodId: id },
        orderBy: { storageDate: "asc" },
      });

      // Calculate total quantity available
      let totalQuantity = 0;
      for (const item of items) {
        totalQuantity += item.quantity;
        if (totalQuantity >= amount) break;
      }

      if (amount > totalQuantity) {
        return Result.err(
          new ConflictError(
            "Amount to sell exceeds the total quantity available in the warehouse",
          ),
        );
      }

      let remainingAmount = amount;

      for (const item of items) {
        if (remainingAmount <= 0) break;

        if (item.quantity <= remainingAmount) {
          // Delete item completely
          await prisma.item.delete({
            where: { id: item.id },
          });
          remainingAmount -= item.quantity;
        } else {
          // Update item with remaining quantity
          await prisma.item.update({
            where: { id: item.id },
            data: { quantity: item.quantity - remainingAmount },
          });
          remainingAmount = 0;
          break;
        }
      }

      return Result.ok(amount);
    })
    .catch((error) => {
      return handleDatabaseError(error as Error);
    });
};

const buy = async (id: number, data: GoodBuyData): DbResult<number> => {
  return await prisma
    .$transaction(async (prisma) => {
      const good = await prisma.good.findUnique({
        where: { id },
      });

      if (!good) {
        return Result.err(new ConflictError("Good not found"));
      }

      const user = await prisma.user.findUnique({
        where: { id: data.userId },
      });

      if (!user) {
        return Result.err(new ConflictError("User not found"));
      }

      // Get available shelves sorted by capacity
      const shelves = await prisma.shelf.findMany({
        orderBy: { capacity: "desc" },
      });

      let remainingQuantity = data.amount;

      for (const shelf of shelves) {
        if (remainingQuantity <= 0) break;

        const totalQuantity = (
          await prisma.item.aggregate({
            where: { shelfId: shelf.id },
            _sum: { quantity: true },
          })
        )._sum.quantity;

        // Check if shelf has enough capacity for the remaining quantity
        const availableCapacity = shelf.capacity - (totalQuantity ?? 0);

        if (availableCapacity <= 0) continue;

        const quantityToStore = Math.min(remainingQuantity, availableCapacity);

        await prisma.item.create({
          data: {
            pricePerUnit: data.pricePerUnit,
            quantity: quantityToStore,
            storageDate: new Date(),
            Good: {
              connect: { id },
            },
            Shelf: {
              connect: { id: shelf.id },
            },
            StockedBy: {
              connect: { id: data.userId },
            },
          },
        });

        remainingQuantity -= quantityToStore;
      }

      if (remainingQuantity > 0) {
        throw new ConflictError("Not enough shelf capacity to store all items");
      }

      return Result.ok(data.amount);
    })
    .catch((error) => {
      return handleDatabaseError(error as Error);
    });
};

const count = async (criteria: FilterCriteria): GoodCountResult => {
  try {
    const count = await prisma.good.count({
      where: {
        name: { startsWith: criteria.name },
        Category: { name: { startsWith: criteria.categoryName } },
      },
    });
    return Result.ok(count);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const goodRepository = {
  create,
  read,
  readMany,
  sell,
  buy,
  delete: remove,
  count,
  update,
};

export default goodRepository;
