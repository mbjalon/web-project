import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive(),
  pageSize: z.coerce.number().int().positive(),
});
