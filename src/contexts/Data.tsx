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
import { Auxiliars } from "helpers";

interface ProvidedValueType {
  board: () => BoardType[];
  // session
  environment: string;
  setEnvironment: (environment: string) => void;
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
  empty: "",
  array: [],
};

export const DataContext = createContext<ProvidedValueType>({
  board: () => [],
  // session
  environment: initialState.empty,
  setEnvironment: () => {},
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
        setFlow((newUser.flows[0] as IFlow)._id);
      }
      return newUser;
    });
  }, []);

  const board = React.useCallback(() => {
    if (!flow || !user) return [] as BoardType[];

    const filtered = tasks?.filter(
      (item: ITask) =>
        (item.flow as IFlow)._id === flow &&
        ((item.project as IProject)._id === project ||
          project === initialState.empty)
    );

    const states = Auxiliars.get<IFlow>(user?.flows as any, flow).states ?? [];

    return (states as IState[]).map((state: string | IState) => {
      const boardItem = {} as BoardType;
      boardItem.state = state as IState;
      boardItem.tasks = filtered?.filter(
        (item: ITask) => (item.state as IState)._id === (state as IState)._id
      );
      return boardItem;
    }) as BoardType[];
  }, [flow, project, tasks, user]);

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
