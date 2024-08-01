import { Auxiliars } from "helpers";
import { ICategory, IComponent, IJournal, IPriority, IState, ITask } from "interfaces";

export interface IProject {
  _id: string;
  name: string;
  briefdescription: string;
  deadline: string;
  prefix: string;
  components: IComponent[];
  priority: string | IPriority;
  state: string | IState;
  category: string | ICategory;
  createdBy: string;
  createdAt: string;
  journal: IJournal[];
  tasks: ITask[];
}

export const DEFAULT_PROJECT: IProject = {
  _id: Auxiliars.generateObjectId(),
  name: "",
  briefdescription: "",
  deadline: "",
  prefix: "",
  components: [],
  priority: "",
  state: "",
  category: "",
  createdBy: "",
  createdAt: "",
  journal: [],
  tasks: [],
}