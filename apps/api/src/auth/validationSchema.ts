import { z } from "zod";
import { UserRole } from "../types";
import { paginationSchema } from "../validationSchema";

export const registerSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z.string().min(8).max(255),
      confirmPassword: z.string().min(8).max(255),
      role: z.nativeEnum(UserRole),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
  }),
});

export const deleteUserRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
});

export const editUserRequestSchema = z.object({
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
    role: z.nativeEnum(UserRole),
  }),
});

export const getUsersRequestSchema = z.object({
  query: z.object({
    email: z.string().optional(),
    role: z.nativeEnum(UserRole).optional(),
    pagination: paginationSchema.optional(),
  }),
});
