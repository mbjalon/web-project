import { z } from "zod";

const filterSchema = z.object({
  goods: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const getWarehouseStatsRequestSchema = z.object({
  query: z.object({
    "total-value": z.boolean().optional(),
    "total-amount": z.boolean().optional(),
    "total-capacity": z.boolean().optional(),
  }),
  body: filterSchema.optional(),
});
