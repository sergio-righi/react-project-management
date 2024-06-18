import { ICategory, IJournal, IPriority, IState, ITask } from "interfaces";

export interface IProject {
  _id: string;
  name: string;
  briefdescription: string;
  deadline: string;
  priority: string | IPriority;
  state: string | IState;
  category: string | ICategory;
  createdBy: string;
  createdAt: string;
  journal: IJournal[];
  tasks: ITask[];
}