import { Auxiliars } from "helpers";
import { ICategory, IComponent, IFlow, IJournal, IPriority, IProject, IState, IUser } from "interfaces";

export interface ITask {
  _id: string;
  number: string | number;
  title: string;
  description: string;
  deadline: string;
  priority: string | IPriority;
  state: string | IState;
  category: string | ICategory;
  component: string | IComponent;
  assignees: string[] | IUser[];
  project: string | IProject;
  referenceTask: string | ITask;
  flow: string | IFlow;
  workedTime: string;
  estimatedTime: string;
  createdBy: string;
  createdAt: string;
  comments: IJournal[];
  journal: IJournal[];
}

export const DEFAULT_TASK = {
  _id: "",
  number: "",
  title: "",
  description: "",
  deadline: "",
  priority: "",
  state: "",
  category: "",
  component: "",
  assignees: [],
  project: "",
  referenceTask: "",
  flow: "",
  workedTime: "",
  estimatedTime: "",
  createdBy: "",
  createdAt: "",
  comments: [],
  journal: [],
}