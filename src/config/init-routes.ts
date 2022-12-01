import { app } from "./init-server";
import {
  errorHandlingMiddleWare,
  invalidPathHandler,
} from "../common/helper/error-middleware";
import RootController from "../modules/root/root.controller";
import RootRouter from "../modules/root/root.router";
import authRouter from "../modules/auth/auth.router";
import employeeRouter from "../modules/employee/employee.router";
import { errorLogger } from "../common/helper/logger";

async function initRoutes() {
  //routers to handle different routes
  app.use("/", RootRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/employees", employeeRouter);
  app.use("*", invalidPathHandler);

  //global error handling middleware
  app.use(errorLogger);
  app.use(errorHandlingMiddleWare);
}

export default initRoutes;
