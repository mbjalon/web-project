import { Router } from "express";
import { authController } from "./controller";
import passport from "passport";
import { User } from "@prisma/client";
import { isAdmin, isAuthenticated } from "./middleware";

export const authRouter = Router();

authRouter.post(
  "/register",
  passport.session(),
  isAuthenticated,
  isAdmin,
  authController.register,
);
authRouter.post("/login", passport.authenticate("local"), authController.login);
authRouter.get(
  "/",
  passport.session(),
  isAuthenticated,
  isAdmin,
  authController.readUsers,
);
authRouter.put(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  authController.editUser,
);
authRouter.delete(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  authController.deleteUser,
);

authRouter.get("/logout", passport.session(), (req, res, next) => {
  req.logout(
    {
      keepSessionInfo: false,
    },
    (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).end();
    },
  );
});

passport.serializeUser((_user, cb) => {
  process.nextTick(() => {
    const user = _user as User;
    return cb(null, {
      id: user.id,
      email: user.email,
      role: user.role,
    });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user!);
  });
});
