import Express from "express";
import cors from "cors";

import initRoutes from "./init-routes";

import MysqlDatabase from "./db";
import { requestLogger } from "../common/helper/logger";

const PORT = process.env.PORT || 8080;

const app = Express();

async function initServer() {
  app.use(cors());
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  app.use(requestLogger);
  await MysqlDatabase.connectToDatabase();
  await initRoutes();
  app.listen(PORT, () => {
    console.log("server is started ");
  });
}

export { initServer, app };
