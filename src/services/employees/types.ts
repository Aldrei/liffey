import { IEmployees } from "@/database/models";
import { ITransformedEmployee } from "@/database/transformers/employee";

export type TEmployeeResponse = IEmployees & ITransformedEmployee