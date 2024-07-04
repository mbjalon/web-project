import {
  ItemCreateData,
  ItemCreateManyData,
  ItemCreateManyResult,
  ItemCreateResult,
  ItemMoveData,
  ItemReadResult,
} from "./types";
import prisma from "../client";
import { Result } from "@badrap/result";
import { handleDatabaseError } from "../utils";
import { DbResult } from "../types";
import { ConflictError, NotFoundError } from "../errors";
import shelfRepository from "../shelf/repository";

const itemSelectFields = {
  id: true,
  quantity: true,
  pricePerUnit: true,
  storageDate: true,
  stockedById: true,
  goodId: true,
  Shelf: {
    select: {
      id: true,
      row: true,
      position: true,
      level: true,
    },
  },
};

const move = async (itemId: number, moveData: ItemMoveData) => {
  try {
    const transactionResult = await prisma.$transaction(async (prisma) => {
      const itemResult = await read(itemId);
      if (itemResult.isErr) {
        throw new Error(itemResult.error.message);
      }
      const item = itemResult.value;

      if (moveData.amount > item.quantity) {
        throw new ConflictError(
          "Amount is greater than the quantity of the item",
        );
      }

      const shelfResult = await shelfRepository.readByPosition(
        moveData.shelf.row,
        moveData.shelf.position,
        moveData.shelf.level,
      );
      if (shelfResult.isErr) {
        throw new Error(shelfResult.error.message);
      }
      const newShelf = shelfResult.value;
      if (newShelf.freeCapacity < moveData.amount) {
        throw new ConflictError(
          "Amount is greater than the free capacity of the shelf",
        );
      }

      const newShelfId = newShelf.id;

      let updatedItem;
      let newItem;

      if (moveData.amount === item.quantity) {
        // If the amount to move equals the current item quantity, only update shelfId
        updatedItem = await prisma.item.update({
          where: { id: itemId },
          data: { shelfId: newShelfId },
          select: itemSelectFields,
        });
      } else {
        // Create new item with the specified amount and update current item's quantity
        const updatedItemPromise = prisma.item.update({
          where: { id: itemId },
          data: { quantity: item.quantity - moveData.amount },
          select: itemSelectFields,
        });

        const newItemPromise = prisma.item.create({
          data: {
            quantity: moveData.amount,
            pricePerUnit: item.pricePerUnit,
            storageDate: item.storageDate,
            stockedById: item.stockedById,
            goodId: item.goodId,
            shelfId: newShelfId,
          },
          select: itemSelectFields,
        });

        [updatedItem, newItem] = await Promise.all([
          updatedItemPromise,
          newItemPromise,
        ]);
      }

      return { updatedItem, newItem };
    });

    return Result.ok(transactionResult);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const create = async (data: ItemCreateData): ItemCreateResult => {
  try {
    const item = await prisma.item.create({
      data: {
        quantity: data.quantity,
        pricePerUnit: data.pricePerUnit,
        storageDate: data.storageDate,
        StockedBy: {
          connect: { id: data.stockedById },
        },
        Good: {
          connect: { id: data.goodId },
        },
        Shelf: {
          connect: { id: data.shelfId },
        },
      },
      select: itemSelectFields,
    });
    return Result.ok(item);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const createMany = async (data: ItemCreateManyData): ItemCreateManyResult => {
  try {
    const items = await prisma.item.createMany({
      data: data.map((itemData) => ({
        quantity: itemData.quantity,
        pricePerUnit: itemData.pricePerUnit,
        storageDate: itemData.storageDate,
        stockedById: itemData.stockedById,
        goodId: itemData.goodId,
        shelfId: itemData.shelfId,
      })),
    });

    return Result.ok(items.count);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const read = async (id: number): ItemReadResult => {
  try {
    const item = await prisma.item.findUnique({
      where: { id },
      select: itemSelectFields,
    });
    if (!item) {
      return Result.err(new NotFoundError(`Item with id ${id} not found`));
    }
    return Result.ok(item);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const update = async (id: number, data: ItemCreateData): ItemCreateResult => {
  try {
    const item = await prisma.item.update({
      where: { id },
      data: {
        quantity: data.quantity,
        pricePerUnit: data.pricePerUnit,
        storageDate: data.storageDate,
        StockedBy: {
          connect: { id: data.stockedById },
        },
        Good: {
          connect: { id: data.goodId },
        },
        Shelf: {
          connect: { id: data.shelfId },
        },
      },
      select: itemSelectFields,
    });

    return Result.ok(item);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const remove = async (id: number): DbResult<void> => {
  try {
    await prisma.item.delete({ where: { id } });
    return Result.ok(undefined);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const itemRepository = {
  create,
  createMany,
  read,
  update,
  delete: remove,
  move,
};

export default itemRepository;
