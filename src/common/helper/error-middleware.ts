import { Response, Request } from "express";
import {
  DataBaseConnectionError,
  NotFound,
  Unauthorized,
  WrongContent,
} from "./exceptions";
import ResponseBodyBuilder from "./response-body-builder";

async function statusHandler(
  error: Error,
  responseBody: ResponseBodyBuilder<string>,
  response: Response
) {
  if (error instanceof DataBaseConnectionError) {
    responseBody.setStatus(500);
    response.status(500);
  } else if (error instanceof NotFound) {
    responseBody.setStatus(404);
    response.status(404);
  } else if (error instanceof WrongContent) {
    responseBody.setStatus(422);
    response.status(422);
  } else if (error instanceof Unauthorized) {
    responseBody.setStatus(401);
    response.status(401);
  } else {
    responseBody.setStatus(400);
    response.status(400);
  }
}

async function errorHandlingMiddleWare(
  error,
  request: Request,
  response: Response,
  next
) {
  let responseBody = new ResponseBodyBuilder<string>();

  if (error instanceof Error) {
    responseBody.setError(error.message);
  } else {
    responseBody.setError(error);
  }

  await statusHandler(error, responseBody, response);
  return response.json(responseBody);
}

export { errorHandlingMiddleWare };
