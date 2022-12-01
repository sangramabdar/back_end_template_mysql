import { Response, Request, NextFunction } from "express";
import { CustomError } from "./exceptions";
import ResponseBodyBuilder from "./response-body-builder";

async function errorHandlingMiddleWare(
  error: CustomError | string | any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  let responseBody = new ResponseBodyBuilder<string>();

  if (typeof error === "string") {
    responseBody.setError(error);
  } else {
    responseBody.setError(error.message);

    if (!error.statusCode) {
      //to handle implicit error
      response.status(500);
      responseBody.setStatusCodeCode(500);
    } else {
      //to handle explicit error
      response.status(error.statusCode);
      responseBody.setStatusCodeCode(error.statusCode);
    }
  }

  return response.json(responseBody);
}

function invalidPathHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(404).json({
    message: "invalid path",
  });
}

export { errorHandlingMiddleWare, invalidPathHandler };
