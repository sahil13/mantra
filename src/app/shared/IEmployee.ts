import { ISkills } from './ISkills';

export interface IEmployee {
  empName?: string;
  email?: string;
  designtion?: string;
  salary?: number;
  skills?: ISkills[];
}
