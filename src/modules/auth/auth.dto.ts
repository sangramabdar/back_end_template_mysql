import {
  buildSchema,
  validateSchema,
  string,
} from "../../common/schema-validation/schema";
import { Request, Response } from "express";
import { trimAllStrings } from "../../common/helper/utils";
import { BadRequest } from "../../common/helper/exceptions";

interface SignUpDto {
  name: string;
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

const signUpDto = buildSchema<SignUpDto>({
  name: string().min(5).max(20).onlyAlphabets(),
  email: string().email(),
  password: string().min(8).max(20),
});

const loginDto = buildSchema<LoginDto>({
  email: string().email(),
  password: string().min(8).max(20),
});

async function validateLoginDto(req: Request, res: Response, next) {
  try {
    req.body = trimAllStrings(req.body);
    req.body = await validateSchema(loginDto, req.body, "complete");
    next();
  } catch (error) {
    error = new BadRequest(error.message);
    next(error);
  }
}

async function validateSignUpDto(req: Request, res: Response, next) {
  try {
    req.body = trimAllStrings(req.body);
    req.body = await validateSchema(signUpDto, req.body, "complete");
    next();
  } catch (error) {
    error = new BadRequest(error.message);
    next(error);
  }
}

export { validateSignUpDto, validateLoginDto, SignUpDto, LoginDto };
