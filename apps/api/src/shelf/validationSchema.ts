import { z } from "zod";
import { paginationSchema } from "../validationSchema";

const shelfBodySchema = z.object({
  row: z.coerce.number().int(),
  position: z.coerce.number().int(),
  level: z.coerce.number().int(),
  capacity: z.coerce.number().int(),
});

export const createShelfRequestSchema = z.object({
  body: shelfBodySchema,
});

export const createShelvesRequestSchema = z.object({
  body: z.object({
    fromRow: z.coerce.number().int(),
    toRow: z.coerce.number().int(),
    fromPosition: z.coerce.number().int(),
    toPosition: z.coerce.number().int(),
    fromLevel: z.coerce.number().int(),
    toLevel: z.coerce.number().int(),
    capacity: z.coerce.number().int(),
  }),
});

export const getShelfRequestSchema = z.object({
  params: z.object({
    id: z.number().int(),
  }),
});

export const getShelvesRequestSchema = z.object({
  query: z.object({
    row: z.coerce.number().optional(),
    level: z.coerce.number().optional(),
    position: z.coerce.number().optional(),
    pagination: paginationSchema.optional(),
    freeCapacity: z.coerce.number().optional(),
  }),
});

export const updateShelfRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: shelfBodySchema,
});

export const deleteShelfRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
});
