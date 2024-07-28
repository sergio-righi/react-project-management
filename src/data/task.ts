import { ApiResponse } from "types";
import { ITask } from "interfaces";
import { Enums, ORM } from "utils";
import { Auxiliars } from "helpers";
import { Tasks } from "assets/data";

export interface ITaskData {
  tasks(): Promise<ApiResponse<ITask[]>>;
  find(id: string): Promise<ApiResponse<ITask>>;
}

export class TaskData implements ITaskData {

  async tasks(): Promise<ApiResponse<ITask[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Tasks.map((item: ITask) => ORM.populateTask(item))
    }));
  }

  async find(id: string): Promise<ApiResponse<ITask>> {
    const response = Tasks.find((item: ITask) => item._id === id);
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: response ? ORM.populateTask(response) : null
    }));
  }
}