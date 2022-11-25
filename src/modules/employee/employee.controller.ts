import { Request, Response } from "express";
import ResponseBodyBuilder from "../../common/helper/response-body-builder";
import {
  deleteEmployeeService,
  getEmployeeService,
  getEmployeesService,
  saveEmployeeService,
  updateEmployeeService,
} from "./employee.service";

class EmployeeController {
  static async getEmployee(request: Request, response: Response, next: any) {
    try {
      const result = await getEmployeeService(request);
      const responseBody = new ResponseBodyBuilder().setData(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async getAllEmployees(
    request: Request,
    response: Response,
    next: any
  ) {
    try {
      const result = await getEmployeesService(request);
      let responseBody = new ResponseBodyBuilder().setData(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async saveEmployee(request: Request, response: Response, next: any) {
    try {
      const result = await saveEmployeeService(request);
      let responseBody = new ResponseBodyBuilder()
        .setStatus(201)
        .setData(result);
      return response.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployee(request: Request, response: Response, next: any) {
    try {
      const result = await updateEmployeeService(request);
      const responseBody = new ResponseBodyBuilder().setData(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async deleteEmployee(request: Request, response: Response, next: any) {
    try {
      const result = await deleteEmployeeService(request);
      const responseBody = new ResponseBodyBuilder().setData(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}

export default EmployeeController;
