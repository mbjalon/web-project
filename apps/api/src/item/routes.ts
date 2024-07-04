import { Router } from "express";
import itemController from "./controller";
import passport from "passport";
import { isAuthenticated } from "../auth/middleware";

const itemRouter = Router();
export default itemRouter;

itemRouter.get(
  "/:id",
  passport.session(),
  isAuthenticated,
  itemController.getItem,
);
itemRouter.put(
  "/:id",
  passport.session(),
  isAuthenticated,
  itemController.moveItem,
);
