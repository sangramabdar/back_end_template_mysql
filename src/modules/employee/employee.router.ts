import { Router } from "express";
import { validateEmployeeDto } from "./employee.dto";

import { validateId, validateToken } from "../../common/helper/validation";
import EmployeeController from "./employee.controller";

const employeeRouter = Router();

employeeRouter.use("/", validateToken);

employeeRouter.post("/", validateEmployeeDto, EmployeeController.saveEmployee);

employeeRouter.get("/:id", validateId, EmployeeController.getEmployee);
employeeRouter.get("/", EmployeeController.getAllEmployees);

employeeRouter.put(
  "/:id",
  validateId,
  validateEmployeeDto,
  EmployeeController.updateEmployee
);
employeeRouter.delete("/:id", validateId, EmployeeController.deleteEmployee);

export default employeeRouter;
