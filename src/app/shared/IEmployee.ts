import { ISkills } from './ISkills';

export interface IEmployee {
  empName?: string;
  email?: string;
  designation?: string;
  salary?: number;
  emp_code?: string;
  department?: number;
  skills?: ISkills[];
}
