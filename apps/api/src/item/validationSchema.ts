import { z } from "zod";
import { paginationSchema } from "../validationSchema";

const itemBodySchema = z.object({
  GoodId: z.coerce.number().int(),
  ShelfId: z.coerce.number().int(),
  quantity: z.coerce.number().int(),
  pricePerUnit: z.coerce.number(),
  storageDate: z.coerce.date(),
});

const itemUpdateBodySchemaOptional = z.object({
  GoodId: z.coerce.number().int().optional(),
  ShelfId: z.coerce.number().int().optional(),
  quantity: z.coerce.number().int().optional(),
  pricePerUnit: z.coerce.number().optional(),
  storageDate: z.coerce.date().optional(),
});

export const createItemRequestSchema = z.object({
  body: itemBodySchema,
});

export const createItemsRequestSchema = z.object({
  body: z.array(itemBodySchema),
});

export const getItemRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
});

export const getItemsRequestSchema = z.object({
  query: z.object({
    row: z.coerce.number().optional(),
    level: z.coerce.number().optional(),
    position: z.coerce.number().optional(),
    pagination: paginationSchema.optional(),
  }),
});

export const updateItemRequestSchema = z.object({
  params: z.object({
    id: z.number().int(),
  }),
  body: itemUpdateBodySchemaOptional,
});

export const deleteItemRequestSchema = z.object({
  params: z.object({
    id: z.number().int(),
  }),
});

export const moveItemRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: z.object({
    amount: z.coerce.number().int(),
    shelf: z.object({
      row: z.coerce.number().int(),
      position: z.coerce.number().int(),
      level: z.coerce.number().int(),
    }),
  }),
});
