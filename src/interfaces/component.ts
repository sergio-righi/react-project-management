import { Auxiliars } from "helpers";

export interface IComponent {
  _id: string;
  name: string;
  color: string;
  briefdescription: string;
}

export const DEFAULT_COMPONENT = {
  _id: Auxiliars.generateObjectId(),
  name: "",
  color: "",
  briefdescription: "",
}