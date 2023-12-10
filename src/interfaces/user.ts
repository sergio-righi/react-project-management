import { IFlow } from "interfaces";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  name: string;
  flows: string[] | IFlow[];
}
