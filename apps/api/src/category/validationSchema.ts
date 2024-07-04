import { z } from "zod";
import { paginationSchema } from "../validationSchema";

const categoryBodySchema = z.object({
  name: z.string(),
});

export const createCategoryRequestSchema = z.object({
  body: categoryBodySchema,
});

export const getCategoryRequestSchema = z.object({
  params: z.object({
    id: z.number().int(),
  }),
});

export const deleteCategoryRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
});

export const updateCategoryRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: categoryBodySchema,
});

export const getCategoriesRequestSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    pagination: paginationSchema.optional(),
    withAmount: z
      .string()
      .toLowerCase()
      .transform((x) => x === "true")
      .pipe(z.boolean())
      .optional(),
  }),
});
