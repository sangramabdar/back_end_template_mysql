import { Request, Response } from "express";

class RootController {
  static async get(req: Request, res: Response) {
    return res.send("app");
  }
}

export default RootController;
