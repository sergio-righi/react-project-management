import { IState, ITask } from "interfaces";

export interface BoardType {
  tasks: ITask[];
  state: IState;
}