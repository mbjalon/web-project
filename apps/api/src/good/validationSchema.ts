import { z } from "zod";
import { Unit } from "../types";
import { paginationSchema } from "../validationSchema";

const goodBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  unit: z.enum([Unit.pcs, Unit.kg]),
  categoryName: z.string().min(1),
});

export const sellGoodRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: z.object({
    quantity: z.coerce.number().int(),
  }),
});

export const buyGoodRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: z.object({
    userId: z.coerce.number().int(),
    amount: z.coerce.number().int(),
    pricePerUnit: z.coerce.number(),
  }),
});

export const deleteGoodRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
});

export const createGoodRequestSchema = z.object({
  body: goodBodySchema,
});

export const getGoodRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  query: z.object({
    withAmount: z
      .string()
      .toLowerCase()
      .transform((x) => x === "true")
      .pipe(z.boolean()),
  }),
});

export const getGoodsRequestSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    categoryName: z.string().optional(),
    pagination: paginationSchema.optional(),
    withAmount: z
      .string()
      .toLowerCase()
      .transform((x) => x === "true")
      .pipe(z.boolean()),
  }),
});

export const updateGoodRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: goodBodySchema,
});
