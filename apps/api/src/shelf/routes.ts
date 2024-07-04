import { Router } from "express";
import shelfController from "./controller";
import passport from "passport";
import { isAdmin, isAuthenticated } from "../auth/middleware";

const shelfRouter = Router();
export default shelfRouter;

shelfRouter.get(
  "/coords",
  passport.session(),
  isAuthenticated,
  shelfController.readCoordinates,
);
shelfRouter.get(
  "/:id",
  passport.session(),
  isAuthenticated,
  shelfController.getShelf,
);
shelfRouter.get(
  "/",
  passport.session(),
  isAuthenticated,
  shelfController.getShelves,
);
shelfRouter.post(
  "/single",
  passport.session(),
  isAuthenticated,
  isAdmin,
  shelfController.createShelf,
);
shelfRouter.post(
  "/bulk",
  passport.session(),
  isAuthenticated,
  isAdmin,
  shelfController.createShelves,
);
shelfRouter.put(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  shelfController.updateShelf,
);
shelfRouter.delete(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  shelfController.deleteShelf,
);
