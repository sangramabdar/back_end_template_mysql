import { Response, Request } from "express";

import ResponseBodyBuilder from "../../common/helper/response-body-builder";
import { generateAccessToken } from "../../common/helper/validation";

import { loginService, signUpService } from "./auth.service";

class AuthController {
  static async login(req: Request, res: Response, next) {
    try {
      const user = await loginService(req);

      const accessToken = await generateAccessToken(user);

      const responseBody = new ResponseBodyBuilder()
        .setStatus(200)
        .setData({ accessToken, id: user.id });

      return res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async signup(req: Request, res: Response, next) {
    try {
      const result = await signUpService(req);

      const responseBody = new ResponseBodyBuilder()
        .setStatus(201)
        .setData(result);

      return res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
