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
  getBoard: () => BoardType[];
  getFlow: () => IFlow;
  getProject: () => IProject;
  getTasks: () => ITask[];
  // session
  filter: string;
  setFilter: (filter: string) => void;
  flow: string;
  setFlow: (flow: string) => void;
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
}

const initialState = {
  obj: null,
  empty: "",
  array: [],
};

export const DataContext = createContext<ProvidedValueType>({
  getBoard: () => initialState.array as BoardType[],
  getFlow: () => ({} as IFlow),
  getProject: () => ({} as IProject),
  getTasks: () => initialState.array as ITask[],
  // session
  filter: initialState.empty,
  setFilter: () => {},
  flow: initialState.empty,
  setFlow: () => {},
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
});

interface Props {
  children?: React.ReactNode;
}

export const DataProvider = React.memo<Props>(({ children }) => {
  const [environment, setEnvironment] = React.useState<string>(
    initialState.empty
  );
  const [filter, setFilter] = React.useState<string>(initialState.empty);
  const [flow, setFlow] = React.useState<string>(initialState.empty);
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

  const setUserCallback = React.useCallback((newUser: IUser | null) => {
    setUser((currentUser: IUser | null) => {
      if (newUser) {
        setFlow((newUser.flows[0] as IFlow)._id);
      }
      return newUser;
    });
  }, []);

  /**
   * function to return the flow object
   */

  const getFlow = React.useCallback(() => {
    return Auxiliars.get<IFlow>(flows, flow);
  }, [flow]);

  /**
   * function to return the project object
   */

  const getProject = React.useCallback(() => {
    return project === ""
      ? ({} as IProject)
      : Auxiliars.get<IProject>(projects, project);
  }, [project]);

  /**
   * function to return the filtered tasks
   */

  const getTasks = React.useCallback(() => {
    if (!flow || !user) return [] as ITask[];

    return tasks?.filter(
      (item: ITask) =>
        (item.flow as IFlow)._id === flow &&
        ((item.project as IProject)._id === project ||
          project === initialState.empty)
    );
  }, [flow, project]);

  /**
   * function to return the filtered tasks
   */

  const getBoard = React.useCallback(() => {
    if (!flow || !user) return [] as BoardType[];

    const states = Auxiliars.get<IFlow>(user?.flows as any, flow).states ?? [];

    return (states as IState[]).map((state: string | IState) => {
      const boardItem = {} as BoardType;
      boardItem.state = state as IState;
      boardItem.tasks = getTasks().filter(
        (item: ITask) => (item.state as IState)._id === (state as IState)._id
      );
      return boardItem;
    }) as BoardType[];
  }, [flow, project, user]);

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValueType = {
      getBoard,
      getFlow,
      getProject,
      getTasks,
      filter,
      setFilter,
      flow,
      setFlow,
      project,
      setProject,
      task,
      setTask,
      user,
      setUser: setUserCallback,
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
    };
    return value;
  }, [
    getBoard,
    getFlow,
    getTasks,
    categories,
    filter,
    filters,
    flow,
    flows,
    priorities,
    project,
    projects,
    states,
    task,
    tasks,
    user,
  ]);

  return (
    <DataContext.Provider value={MemoizedValue}>
      {children}
    </DataContext.Provider>
  );
});

export const useData = () => useContext(DataContext);
