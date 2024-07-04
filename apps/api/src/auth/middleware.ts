import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
declare module "express-session" {
  interface SessionData {
    passport: {
      user: { id: number; email: string; role: UserRole };
    };
  }
}

export const isAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.session.passport?.user) next();
  else next("/login");
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.session.passport?.user?.role;

  if (userRole === UserRole.ADMIN) {
    return next();
  } else {
    res.status(403).send("Unauthorized");
  }
};
