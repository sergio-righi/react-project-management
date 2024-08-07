import React, { createContext, useContext } from "react";
import {
  ICategory,
  IFilter,
  IFlow,
  IPriority,
  IProject,
  IState,
  ITask,
  IUser,
} from "interfaces";
import { BoardType } from "types";
import { Auxiliars } from "helpers";

interface ProvidedValueType {
  getBacklog: () => ITask[];
  getBoard: () => BoardType[];
  getFlows: () => IFlow[];
  getProject: () => IProject;
  getTasks: () => ITask[];
  // session
  filter: string;
  setFilter: (filter: string) => void;
  project: string;
  setProject: (project: string) => void;
  task: string;
  setTask: (task: string) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  // data
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
  filters: IFilter[];
  setFilters: (filters: IFilter[]) => void;
  flows: IFlow[];
  setFlows: (flows: IFlow[]) => void;
  priorities: IPriority[];
  setPriorities: (priorities: IPriority[]) => void;
  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
  states: IState[];
  setStates: (states: IState[]) => void;
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

const initialState = {
  obj: null,
  empty: "",
  array: [],
};

export const DataContext = createContext<ProvidedValueType>({
  getBacklog: () => initialState.array as ITask[],
  getBoard: () => initialState.array as BoardType[],
  getFlows: () => initialState.array as IFlow[],
  getProject: () => ({} as IProject),
  getTasks: () => initialState.array as ITask[],
  // session
  filter: initialState.empty,
  setFilter: () => {},
  project: initialState.empty,
  setProject: () => {},
  task: initialState.empty,
  setTask: () => {},
  user: initialState.obj,
  setUser: () => {},
  // data
  categories: initialState.array,
  setCategories: () => {},
  filters: initialState.array,
  setFilters: () => {},
  flows: initialState.array,
  setFlows: () => {},
  priorities: initialState.array,
  setPriorities: () => {},
  projects: initialState.array,
  setProjects: () => {},
  states: initialState.array,
  setStates: () => {},
  tasks: initialState.array,
  setTasks: () => {},
  users: initialState.array,
  setUsers: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export const DataProvider = React.memo<Props>(({ children }) => {
  const [filter, setFilter] = React.useState<string>(initialState.empty);
  const [project, setProject] = React.useState<string>(initialState.empty);
  const [task, setTask] = React.useState<string>(initialState.empty);
  const [user, setUser] = React.useState<IUser | null>(initialState.obj);

  const [categories, setCategories] = React.useState<ICategory[]>(
    initialState.array
  );
  const [filters, setFilters] = React.useState<IFilter[]>(initialState.array);
  const [flows, setFlows] = React.useState<IFlow[]>(initialState.array);
  const [priorities, setPriorities] = React.useState<IPriority[]>(
    initialState.array
  );
  const [projects, setProjects] = React.useState<IProject[]>(
    initialState.array
  );
  const [states, setStates] = React.useState<IState[]>(initialState.array);
  const [tasks, setTasks] = React.useState<ITask[]>(initialState.array);
  const [users, setUsers] = React.useState<IUser[]>(initialState.array);

  /**
   * function to return the project object
   */

  const getProject = React.useCallback(() => {
    return project === ""
      ? ({} as IProject)
      : Auxiliars.get<IProject>(projects, project);
  }, [projects, project]);

  /**
   * function to return the flows in order
   */

  const getFlows = React.useCallback(() => {
    return (flows as IFlow[]).sort((a: IFlow, b: IFlow) => a.order - b.order);
  }, [flows]);

  /**
   * function to return the filtered tasks
   */

  const getTasks = React.useCallback(() => {
    return tasks?.filter(
      (item: ITask) =>
        item.flow !== "" &&
        Object.keys(item.flow).length > 0 &&
        ((item.project as IProject)._id === project ||
          project === initialState.empty)
    );
  }, [tasks, project]);

  /**
   * function to return the backlog tasks
   */

  const getBacklog = React.useCallback(() => {
    return tasks?.filter(
      (item: ITask) =>
        (item.flow === "" || Object.keys(item.flow).length === 0) &&
        ((item.project as IProject)._id === project ||
          project === initialState.empty)
    );
  }, [tasks, project]);

  /**
   * function to return the filtered tasks
   */

  const getBoard = React.useCallback(() => {
    return getFlows().map((flow: string | IFlow) => {
      const boardItem = {} as BoardType;
      boardItem.flow = flow as IFlow;
      boardItem.tasks = getTasks().filter(
        (item: ITask) => (item.flow as IFlow)._id === (flow as IFlow)._id
      );
      return boardItem;
    }) as BoardType[];
  }, [flows, tasks, project]);

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValueType = {
      getBoard,
      getBacklog,
      getFlows,
      getProject,
      getTasks,
      filter,
      setFilter,
      project,
      setProject,
      task,
      setTask,
      user,
      setUser,
      categories,
      setCategories,
      filters,
      setFilters,
      flows,
      setFlows,
      priorities,
      setPriorities,
      projects,
      setProjects,
      states,
      setStates,
      tasks,
      setTasks,
      users,
      setUsers,
    };
    return value;
  }, [
    getBoard,
    getProject,
    getTasks,
    getBacklog,
    categories,
    filter,
    filters,
    flows,
    priorities,
    project,
    projects,
    states,
    task,
    tasks,
    user,
    users,
    setUsers,
  ]);

  return (
    <DataContext.Provider value={MemoizedValue}>
      {children}
    </DataContext.Provider>
  );
});

export const useData = () => useContext(DataContext);
