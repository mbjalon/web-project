import { UserRole } from "@/types/types.ts";

export type User = {
  email: string;
  password: string;
  role: UserRole;
  deletedAt: Date;
};

export type UserWithId = User & { id: number };
