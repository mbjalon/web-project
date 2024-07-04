import { Router } from "express";
import categoryController from "./controller";
import passport from "passport";
import { isAdmin, isAuthenticated } from "../auth/middleware";

const categoryRouter = Router();
export default categoryRouter;

categoryRouter.get(
  "/:id",
  passport.session(),
  isAuthenticated,
  categoryController.getCategory,
);
categoryRouter.put(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  categoryController.updateCategory,
);
categoryRouter.delete(
  "/:id",
  passport.session(),
  isAuthenticated,
  isAdmin,
  categoryController.deleteCategory,
);
categoryRouter.get(
  "/",
  passport.session(),
  isAuthenticated,
  categoryController.getCategories,
);
categoryRouter.post(
  "/",
  passport.session(),
  isAuthenticated,
  isAdmin,
  categoryController.createCategory,
);
