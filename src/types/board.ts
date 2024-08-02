import { IFlow, ITask } from "interfaces";

export interface BoardType {
  tasks: ITask[];
  flow: IFlow;
}