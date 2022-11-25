import e, { Request } from "express";
import { NotFound, Unauthorized } from "../../common/helper/exceptions";
import {
  deleteEmployeeById,
  getAllEmployeesOfSpecificUser,
  getEmployeeById,
  getEmployeeByIdOfSpecificUser,
  saveEmployee,
  updateEmployeeById,
} from "./employee.repository";

async function getEmployeesService(req: Request) {
  let userId = (req as any).user.id;
  let employees = await getAllEmployeesOfSpecificUser(userId);

  if (!employees) throw new NotFound("employees");

  return employees;
}

async function getEmployeeService(req: Request) {
  let id = Number.parseInt(req.params["id"]);
  let userId = (req as any).user.id;

  let employee = await getEmployeeByIdOfSpecificUser(id, userId);

  if (!employee) throw new NotFound("emlpoyee");

  return employee;
}

async function saveEmployeeService(req: Request) {
  let employee = req.body;
  let user = (req as any).user;

  employee.createdById = user.id;

  let id = await saveEmployee(employee);

  return {
    id,
  };
}

async function updateEmployeeService(req: Request) {
  let employee = req.body;
  let id = Number.parseInt(req.params["id"]);
  let userId = (req as any).user.id;

  let employeeExists = await checkEmployeeExistsOrNot(req);

  if (!employeeExists) throw new NotFound("employee");

  let result = await updateEmployeeById(id, employee, userId);

  if (!result) throw new Unauthorized();

  return result;
}

async function deleteEmployeeService(req: Request) {
  let id = Number.parseInt(req.params["id"]);
  let userId = (req as any).user.id;

  let employeeExists = await checkEmployeeExistsOrNot(req);

  if (!employeeExists) throw new NotFound("employee");

  let result = await deleteEmployeeById(id, userId);

  if (!result) throw new Unauthorized();

  return result;
}

async function checkEmployeeExistsOrNot(req: Request) {
  let id = Number.parseInt(req.params["id"]);
  let employee = await getEmployeeById(id);

  if (!employee) return false;
  return true;
}

export {
  getEmployeeService,
  deleteEmployeeService,
  getEmployeesService,
  updateEmployeeService,
  saveEmployeeService,
};
