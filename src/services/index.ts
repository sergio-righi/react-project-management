import { CategoryService, ICategoryService } from "./category";
import { FilterService, IFilterService } from "./filter";
import { FlowService, IFlowService } from "./flow";
import { PriorityService, IPriorityService } from "./priority";
import { ProjectService, IProjectService } from "./project";
import { StateService, IStateService } from "./state";
import { TaskService, ITaskService } from "./task";
import { UserService, IUserService } from "./user";

export interface IProvidedService {
  category: ICategoryService
  filter: IFilterService
  flow: IFlowService
  priority: IPriorityService
  project: IProjectService
  state: IStateService
  task: ITaskService
  user: IUserService
}

export const initializeService = (): IProvidedService => ({
  category: new CategoryService(),
  filter: new FilterService(),
  flow: new FlowService(),
  priority: new PriorityService(),
  project: new ProjectService(),
  state: new StateService(),
  task: new TaskService(),
  user: new UserService(),
})