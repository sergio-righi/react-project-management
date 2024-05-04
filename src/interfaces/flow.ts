import { IState } from "interfaces";

export interface IFlow {
  _id: string;
  name: string;
  briefdescription: string;
  states: {
    [key: string]: string;
  } | IState[]
}