import { app } from "./init-server";
import { errorHandlingMiddleWare } from "../common/helper/error-middleware";
import RootController from "../modules/root/root.controller";
import RootRouter from "../modules/root/root.router";
import authRouter from "../modules/auth/auth.router";
import employeeRouter from "../modules/employee/employee.router";

async function initRoutes() {
  //routers to handle different routes
  app.use("/", RootRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/employees", employeeRouter);
  app.use("*", RootController.wrongRoute);

  //global error handling middleware
  app.use(errorHandlingMiddleWare);
}

export default initRoutes;
