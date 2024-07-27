import { ICategory, IComponent, IFlow, IJournal, IPriority, IProject, IState, IUser } from "interfaces";

export interface ITask {
  _id: string;
  number: string;
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