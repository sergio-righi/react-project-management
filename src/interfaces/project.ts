import { ICategory, IComponent, IJournal, IPriority, IState, ITask } from "interfaces";

export interface IProject {
  _id: string;
  name: string;
  briefdescription: string;
  deadline: string;
  prefix: string;
  count: number;
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
  _id: "",
  name: "",
  briefdescription: "",
  deadline: "",
  prefix: "",
  count: 1,
  components: [],
  priority: "",
  state: "",
  category: "",
  createdBy: "",
  createdAt: "",
  journal: [],
  tasks: [],
}