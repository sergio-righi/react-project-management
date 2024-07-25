import { ICategory, IFilter, IFlow, IPriority, IProject, IState, ITask, IUser } from "interfaces";

import Category from "assets/data/category.json";
import Filter from "assets/data/filter.json";
import Flow from "assets/data/flow.json";
import Priority from "assets/data/priority.json";
import Project from "assets/data/project.json";
import State from "assets/data/state.json";
import Task from "assets/data/task.json";
import User from "assets/data/user.json";

export const Categories = Category as ICategory[];
export const Filters = Filter as IFilter[];
export const Flows = Flow as IFlow[];
export const Priorities = Priority as IPriority[];
export const Projects = Project as IProject[];
export const States = State as IState[];
export const Tasks = Task as ITask[];
export const Users = User as IUser[];