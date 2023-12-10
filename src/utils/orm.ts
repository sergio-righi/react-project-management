import { Enums } from "utils";
import { ICategory, IEnvironment, IFlow, IPriority, IProject, IState, ITask, IUser } from "interfaces";
import { Categories, Environments, Flows, Priorities, Projects, States, Tasks, Users } from "assets/data";

function populate<T extends {}>(values: T[], property: string, value: string): T {
  return values.find((item: T) => {
    const propValue = (item as Record<string, string>)[property];
    return propValue === value;
  }) || ({} as T);
}

function populates<T extends {}>(values: T[], property: string, value: string[]): T[] {
  return values.filter((item: T) => {
    const propValue = (item as Record<string, string>)[property];
    return value.includes(propValue);
  }) || ({} as T);
}

export function populateMany<T>(values: T[], fn: (item: T) => T): T[] {
  return values.map((item: T) => fn(item)) || [];
}

export function populateFlow(flow: IFlow): IFlow {
  const newFlow = { ...flow }
  newFlow.states = populates<IState>(States, "_id", newFlow.states as string[]);
  return newFlow
}

export function populateTask(task: ITask): ITask {
  const newTask = { ...task }
  newTask.category = findCategoryById(newTask.category.toString()) ?? {} as ICategory;
  newTask.environment = findEnvironmentById(newTask.environment.toString()) ?? {} as IEnvironment;
  newTask.flow = findFlowById(newTask.flow.toString()) ?? {} as IFlow;
  newTask.priority = findPriorityById(newTask.priority.toString()) ?? {} as IPriority;
  newTask.project = findProjectById(newTask.project.toString()) ?? {} as IProject;
  newTask.state = findStateById(newTask.state.toString()) ?? {} as IState;
  newTask.referenceTask = findTaskById(newTask.referenceTask.toString()) ?? {} as ITask;
  newTask.assignee = findUserById(newTask.assignee.toString()) ?? {} as IUser;
  return newTask;
}

export function populateUser(user: IUser): IUser {
  const newUser = { ...user }
  newUser.flows = newUser.flows.map((item: IFlow | string) => populateFlow(findFlowById(item.toString()) ?? {} as IFlow)) ?? [] as IFlow[];
  return newUser;
}

/**
 * function to find a category by id
 * @param {string} id category id 
 * @returns {ICategory} the category
 */

export function findCategoryById(id: string): ICategory | undefined {
  const category = Categories.find((item: ICategory) => item._id === id);
  return category ? category : undefined;
}

/**
 * function to find a environment by id
 * @param {string} id environment id 
 * @returns {IEnvironment} the environment
 */

export function findEnvironmentById(id: string): IEnvironment | undefined {
  const environment = Environments.find((item: IEnvironment) => item._id === id);
  return environment ? environment : undefined;
}

/**
 * function to find a flow by id
 * @param {string} id flow id 
 * @returns {IFlow} the flow
 */

export function findFlowById(id: string): IFlow | undefined {
  const flow = Flows.find((item: IFlow) => item._id === id);
  return flow ? flow : undefined;
}

/**
 * function to find a priority by id
 * @param {string} id priority id 
 * @returns {IPriority} the priority
 */

export function findPriorityById(id: string): IPriority | undefined {
  const priority = Priorities.find((item: IPriority) => item._id === id);
  return priority ? priority : undefined;
}

/**
 * function to find a project by id
 * @param {string} id project id 
 * @returns {IProject} the project
 */

export function findProjectById(id: string): IProject | undefined {
  const project = Projects.find((item: IProject) => item._id === id);
  return project ? project : undefined;
}

/**
 * function to find a state by id
 * @param {string} id state id 
 * @returns {IState} the state
 */

export function findStateById(id: string): IState | undefined {
  const state = States.find((item: IState) => item._id === id);
  return state ? state : undefined;
}

/**
 * function to find a task by id
 * @param {string} id task id 
 * @returns {ITask} the task
 */

export function findTaskById(id: string): ITask | undefined {
  const task = Tasks.find((item: ITask) => item._id === id);
  return task ? populateTask(task) : undefined;
}

/**
 * function to find a user by id
 * @param {string} id user id 
 * @returns {IUser} the user
 */

export function findUserById(id: string): IUser | undefined {
  const user = Users.find((item: IUser) => item._id === id);
  return user ? populateUser(user) : undefined;
}

/**
 * function to sign in the user
 * @param {string} email the email address
 * @param {string} password the password to sign in
 * @returns {IUser} the user object
 *

export function findByEmailPassword(email: string, password: string): IUser | undefined {
  const user = Users.find((item: IUser) => item.email === email && item.password === password);
  if (user) {
    switch (user.userType) {
      case Enums.EnumUser.Clinic:
        const clinic = findClinicById(user.userId);
        user.username = clinic?.name ?? "";
        break;
      case Enums.EnumUser.Patient:
        const patient = findPatientById(user.userId);
        user.username = patient?.firstName ?? "";
        break;
      case Enums.EnumUser.Provider:
        const provider = findProviderById(user.userId);
        user.username = provider?.firstName ?? "";
        break;
    }
    user.accessToken = Date.now().toString();
  }
  return user;
}

/**
 * function to find services by either clinic or provider or both
 * @param {string} clinicId the clinic id 
 * @param {string?} providerId the provider id 
 * @returns {IServiceOffering[]} a list of services
 *

export function findServiceByClinicProvider(clinicId: string, providerId?: string): IServiceOffering[] {
  const clinic = Clinics.find((item: IClinic) => item.clinicId === clinicId);
  if (clinic) {
    if (providerId) {
      const provider = Providers.find((item: IProvider) => item.providerId === providerId);
      if (provider) {
        return populateServices(provider.services.map((item: IServiceOffering) => String(item)).filter((item: string) => clinic.services.map((item: IServiceOffering) => String(item)).includes(item)))
      }
      return [];
    }
    return populateServices(clinic.services.map((item: IServiceOffering) => String(item)))
  }
  return []
}

/**
 * function to get all the clinics by service
 * @param {string} serviceId service id 
 * @returns {IClinic[]} a list of clinics
 *

export function findClinicByServiceAndProvider(serviceId: string, providerId?: string): IClinic[] {
  const clinics = Clinics.filter((item: IClinic) => item.services.map((item: IServiceOffering) => String(item)).includes(serviceId));
  if (clinics.length > 0) {
    if (providerId) {
      return populateMany<IClinic>(clinics.filter((item: IClinic) => item.providers.map((item: IProvider) => String(item)).includes(providerId)), populateClinic);
    }
    return populateMany<IClinic>(clinics, populateClinic);
  }
  return []
}

/**
 * function to get all providers by clinic and service
 * @param {string} clinicId clinic id 
 * @param {string} serviceId service id 
 * @returns {IProvider[]} a list of providers
 *

export function findByClinicAndService(clinicId: string, serviceId: string): IProvider[] {
  const clinic = Clinics.find((item: IClinic) => item.clinicId === clinicId);
  if (clinic) {
    const providers = Providers.filter((item: IProvider) => clinic.providers.map((item: IProvider) => String(item)).includes(item.providerId) && item.services.map((item: IServiceOffering) => String(item)).includes(serviceId));
    if (providers.length > 0) {
      return populateMany<IProvider>(providers, populateProvider);
    }
  }
  return []
}

*/