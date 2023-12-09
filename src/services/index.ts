import { TaskService, ITaskService } from "./task";

export interface IProvidedService {
  task: ITaskService
}

export const initializeService = (): IProvidedService => ({
  task: new TaskService(),
})