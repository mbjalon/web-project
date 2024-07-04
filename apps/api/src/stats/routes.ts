import { Router } from "express";
import statsController from "./controller";
import passport from "passport";
import { isAuthenticated } from "../auth/middleware";

const statsRouter = Router();
export default statsRouter;

statsRouter.get(
  "/",
  passport.session(),
  isAuthenticated,
  statsController.getWarehouseStats,
);
