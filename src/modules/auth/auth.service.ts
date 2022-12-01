import { hash, compare, genSalt } from "bcryptjs";
import { Request } from "express";
import {
  CustomError,
  EmailExists,
  NotRegistered,
} from "../../common/helper/exceptions";

import { getUserByEmail, saveUser } from "./auth.repository";

async function signUpService(req: Request) {
  let { email, password } = req.body;

  let user = await getUserByEmail(email);

  if (user) {
    throw new EmailExists();
  }

  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  let id = await saveUser({ ...req.body, password: hashPassword });

  return { id };
}

async function loginService(req: Request) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new NotRegistered();
  }

  const isMatched = await compare(password, user.password);

  if (!isMatched) {
    throw new CustomError("password is not matched", 402);
  }

  return {
    id: user.id,
    email: user.email,
  };
}

export { signUpService, loginService };
