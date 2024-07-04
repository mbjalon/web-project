import { Router } from "express";
import goodController from "./controller";
import passport from "passport";
import { isAdmin, isAuthenticated } from "../auth/middleware";
const goodRouter = Router();

goodRouter.post(
  "/",
  passport.session(),
  isAuthenticated,
  isAdmin,
  goodController.createGood,
);
goodRouter.post(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  goodController.buyGood,
);
goodRouter.put(
  "/admin/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  goodController.updateGood,
);
goodRouter.get(
  "/",
  passport.session(),
  isAuthenticated,
  goodController.getGoods,
);
goodRouter.get(
  "/:id",
  passport.session(),
  isAuthenticated,
  goodController.getGood,
);
goodRouter.delete(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  goodController.deleteGood,
);
goodRouter.put(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  goodController.sellGood,
);

export default goodRouter;
