import { Request, Response } from "express";
import { trimAllStrings } from "../../common/helper/utils";
import {
  buildSchema,
  number,
  string,
  validateSchema,
} from "../../common/schema-validation/schema";

interface EmployeeDto {
  name: string;
  age: number;
  salary: number;
}

const employeeDto = buildSchema<EmployeeDto>({
  name: string().min(3).max(20),
  age: number().min(18).max(60),
  salary: number().min(1).max(Number.MAX_VALUE),
});

async function validateEmployeeDto(request: Request, response: Response, next) {
  try {
    request.body = trimAllStrings(request.body);

    request.body = await validateSchema(employeeDto, request.body, "complete");

    next();
  } catch (error) {
    next(error);
  }
}

export { validateEmployeeDto, EmployeeDto };
