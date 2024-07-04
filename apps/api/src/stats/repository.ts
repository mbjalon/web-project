import prisma from "../client";
import { Result } from "@badrap/result";
import { handleDatabaseError } from "../utils";
import {
  FilterCriteria,
  FilterObject,
  WarehouseTotalAmountResult,
  WarehouseTotalCapacityResult,
  WarehouseTotalValueResult,
} from "./types";

const getTotalValue = async (
  filter: FilterCriteria,
): WarehouseTotalValueResult => {
  try {
    const items = await prisma.item.findMany({
      where: generateFilter(filter),
    });

    const totalValue = items.reduce(
      (sum, item) => sum + item.quantity * item.pricePerUnit,
      0,
    );

    return Result.ok({ totalValue });
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const getTotalAmount = async (
  filter: FilterCriteria,
): WarehouseTotalAmountResult => {
  try {
    const totalAmountKg = await prisma.item.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        ...generateFilter(filter),
        Good: {
          unit: "kg",
        },
      },
    });

    const totalAmountPcs = await prisma.item.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        ...generateFilter(filter),
        Good: {
          unit: "pcs",
        },
      },
    });

    if (
      totalAmountKg._sum.quantity == null ||
      totalAmountPcs._sum.quantity == null
    ) {
      return Result.err(
        new Error("Quantity for either kg or pcs is null or undefined."),
      );
    }

    const totalAmount = {
      totalAmountKg: totalAmountKg._sum.quantity,
      totalAmountPcs: totalAmountPcs._sum.quantity,
    };
    return Result.ok(totalAmount);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const getTotalCapacity = async (): WarehouseTotalCapacityResult => {
  try {
    const totalCapacity = await prisma.shelf.aggregate({
      _sum: {
        capacity: true,
      },
    });

    if (totalCapacity._sum.capacity == null) {
      return Result.err(new Error("Capacity is null or undefined."));
    }

    const totalCapacityResult = {
      totalCapacity: totalCapacity._sum.capacity,
    };
    return Result.ok(totalCapacityResult);
  } catch (error) {
    return handleDatabaseError(error as Error);
  }
};

const generateFilter = (filter: FilterCriteria): FilterObject => {
  const filterObject: FilterObject = {};

  if (filter.goods?.name) {
    filterObject.Good = {
      ...filterObject.Good,
      name: {
        startsWith: filter.goods.name,
      },
    };
  }

  if (filter.goods?.category) {
    filterObject.Good = {
      ...filterObject.Good,
      Category: {
        name: {
          startsWith: filter.goods.category,
        },
      },
    };
  }

  return filterObject;
};

const statsRepository = {
  getTotalValue,
  getTotalAmount,
  getTotalCapacity,
};

export default statsRepository;
