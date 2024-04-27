import React, { createContext, useContext } from "react";
import {
  ICategory,
  IEnvironment,
  IFilter,
  IFlow,
  IPriority,
  IProject,
  IState,
  ITask,
  IUser,
} from "interfaces";
import { BoardType } from "types";

interface ProvidedValueType {
  board: () => BoardType[];
  environment: IEnvironment | null;
  setEnvironment: (environment: IEnvironment) => void;
  filter: IFilter | null;
  setFilter: (filter: IFilter) => void;
  flow: IFlow | null;
  setFlow: (flow: IFlow) => void;
  project: IProject | null;
  setProject: (project: IProject) => void;
  task: ITask | null;
  setTask: (task: ITask) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
  environments: IEnvironment[];
  setEnvironments: (environments: IEnvironment[]) => void;
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
  array: [],
};

export const DataContext = createContext<ProvidedValueType>({
  board: () => [],
  environment: initialState.obj,
  setEnvironment: () => {},
  filter: initialState.obj,
  setFilter: () => {},
  flow: initialState.obj,
  setFlow: () => {},
  project: initialState.obj,
  setProject: () => {},
  task: initialState.obj,
  setTask: () => {},
  user: initialState.obj,
  setUser: () => {},
  // data
  categories: initialState.array,
  setCategories: () => {},
  environments: initialState.array,
  setEnvironments: () => {},
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
  const [environment, setEnvironment] = React.useState<IEnvironment | null>(
    initialState.obj
  );
  const [filter, setFilter] = React.useState<IFilter | null>(initialState.obj);
  const [flow, setFlow] = React.useState<IFlow | null>(initialState.obj);
  const [project, setProject] = React.useState<IProject | null>(
    initialState.obj
  );
  const [task, setTask] = React.useState<ITask | null>(initialState.obj);
  const [user, setUser] = React.useState<IUser | null>(initialState.obj);

  const [categories, setCategories] = React.useState<ICategory[]>(
    initialState.array
  );
  const [environments, setEnvironments] = React.useState<IEnvironment[]>(
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
        setFlow(newUser.flows[0] as IFlow);
      }
      return newUser;
    });
  }, []);

  const board = React.useCallback(() => {
    if (!flow) return [] as BoardType[];
    return flow.states.map((state: string | IState) => {
      const boardItem = {} as BoardType;
      boardItem.state = state as IState;
      boardItem.tasks = tasks?.filter(
        (task: ITask) => (task.state as IState)._id === (state as IState)._id
      );
      return boardItem;
    }) as BoardType[];
  }, [flow, tasks, user]);

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValueType = {
      board,
      environment,
      setEnvironment,
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
      environments,
      setEnvironments,
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
    board,
    categories,
    environment,
    environments,
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
