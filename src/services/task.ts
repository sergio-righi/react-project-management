import { TaskData, ITaskData } from "data";
import { ITask } from "interfaces";

export interface ITaskService {
  tasks(): Promise<ITask[]>;
  find(id: string): Promise<ITask>;
}

export class TaskService implements ITaskService {
  taskData: ITaskData;

  constructor() {
    this.taskData = new TaskData();
  }

  /**
   * fetch all the tasks
   * @returns {ITask[]} a list of tasks
   */

  async tasks() {
    const { payload } = await this.taskData.tasks();
    return payload ?? [];
  }

  /**
   * fetch a task by id
   * @param {string} id the task id
   * @returns {ITask} a task if found
   */

  async find(id: string) {
    const { payload } = await this.taskData.find(id);
    return payload;
  }
}