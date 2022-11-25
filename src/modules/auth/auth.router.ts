import { Router } from "express";
import AuthController from "./auth.controller";
import { validateLoginDto, validateSignUpDto } from "./auth.dto";

const authRouter = Router();

authRouter.post("/signup", validateSignUpDto, AuthController.signup);

authRouter.post("/login", validateLoginDto, AuthController.login);

export default authRouter;
