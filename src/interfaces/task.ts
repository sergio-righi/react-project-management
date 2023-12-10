import { ICategory, IEnvironment, IFlow, IPriority, IProject, IState, IUser } from "interfaces";

export interface JournalType {
  message: string;
  updatedBy: string;
  updatedAt: string;
}

export interface ITask {
  _id: string;
  number: string;
  title: string;
  description: string;
  deadline: string;
  priority: string | IPriority;
  state: string | IState;
  category: string | ICategory;
  assignee: string | IUser;
  project: string | IProject;
  referenceTask: string | ITask;
  flow: string | IFlow;
  environment: string | IEnvironment;
  estimatedTime: string;
  createdBy: string;
  createdAt: string;
  journal: JournalType[];
}