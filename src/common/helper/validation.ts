import { Request, Response } from "express";
import jwt from "jsonwebtoken";

async function validateId(req: Request, res: Response, next) {
  let id = req.params["id"];
  let isValid = Number.isNaN(Number.parseInt(id));

  if (isValid) {
    return next("id is in wrong format");
  }
  next();
}

async function validateBody(req: Request, res: Response, next) {
  if (Object.keys(req.body).length == 0)
    return next("body should not be empty");
  next();
}

async function validateToken(req: Request, res: Response, next) {
  try {
    const token = req.headers["authorization"];

    if (!token) return next("authorization header is not provided in headers");

    const tokenPart = token.split(" ")[1];

    if (!tokenPart)
      return next("authorization header is not in correct format");

    const user = await verifyAccessToken(tokenPart);

    req.user = user;

    next();
  } catch (error) {
    next("token is invalid");
  }
}

async function generateAccessToken(payload: any, expiresIn: string = "") {
  let accessToken;
  if (expiresIn == "") {
    accessToken = await jwt.sign(payload, process.env.ACCESS_KEY);
  } else {
    accessToken = await jwt.sign(payload, process.env.ACCESS_KEY, {
      expiresIn,
    });
  }

  return accessToken;
}

async function generateRefreshToken(payload: any, expiresIn: string = "") {
  let refreshToken;
  if (expiresIn == "") {
    refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY);
  } else {
    refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY, {
      expiresIn,
    });
  }

  return refreshToken;
}

async function verifyAccessToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.ACCESS_KEY);
  delete data.iat;
  delete data.exp;
  return data;
}

async function verifyRefreshToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.REFRESH_KEY);
  delete data.iat;
  delete data.exp;
  return data;
}

async function validateAccess(req: Request, res: Response, next) {
  const id = req.params["id"];
  const { _id } = req.body.user;

  if (id !== _id) {
    return next("this token can not be used to access this route");
  }

  // let db = await Database.getDb();

  // if (!db) {
  //   return next(new DataBaseConnectionError());
  // }

  // to check user is present or not in db
  // let result = await db?.collection("users").findOne({
  //   _id: new ObjectId(id),
  // });

  // if (!result) {
  //   return next(new Error("user is already deleted"));
  // }
  delete req.body.user;
  next();
}

export {
  validateId,
  validateBody,
  validateToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
  validateAccess,
};
