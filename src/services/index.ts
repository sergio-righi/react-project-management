import { CategoryService, ICategoryService } from "./category";
import { FilterService, IFilterService } from "./filter";
import { FlowService, IFlowService } from "./flow";
import { PriorityService, IPriorityService } from "./priority";
import { ProjectService, IProjectService } from "./project";
import { StateService, IStateService } from "./state";
import { TaskService, ITaskService } from "./task";
import { UserService, IUserService } from "./user";

export interface IProvidedService {
  categoryService: ICategoryService
  filterService: IFilterService
  flowService: IFlowService
  priorityService: IPriorityService
  projectService: IProjectService
  stateService: IStateService
  taskService: ITaskService
  userService: IUserService
}

export const initializeService = (): IProvidedService => ({
  categoryService: new CategoryService(),
  filterService: new FilterService(),
  flowService: new FlowService(),
  priorityService: new PriorityService(),
  projectService: new ProjectService(),
  stateService: new StateService(),
  taskService: new TaskService(),
  userService: new UserService(),
})