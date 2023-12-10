import React, { createContext, useContext } from "react";
import {
  ICategory,
  IEnvironment,
  IFlow,
  IPriority,
  IProject,
  IState,
  ITask,
} from "interfaces";

interface ProvidedValueType {
  environment: IEnvironment | null;
  setEnvironment: (environment: IEnvironment) => void;
  flow: IFlow | null;
  setFlow: (flow: IFlow) => void;
  project: IProject | null;
  setProject: (project: IProject) => void;
  task: ITask | null;
  setTask: (task: ITask) => void;
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
  environments: IEnvironment[];
  setEnvironments: (environments: IEnvironment[]) => void;
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
  environment: initialState.obj,
  setEnvironment: () => {},
  flow: initialState.obj,
  setFlow: () => {},
  project: initialState.obj,
  setProject: () => {},
  task: initialState.obj,
  setTask: () => {},
  categories: initialState.array,
  setCategories: () => {},
  environments: initialState.array,
  setEnvironments: () => {},
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
  const [flow, setFlow] = React.useState<IFlow | null>(initialState.obj);
  const [project, setProject] = React.useState<IProject | null>(
    initialState.obj
  );
  const [task, setTask] = React.useState<ITask | null>(initialState.obj);

  const [categories, setCategories] = React.useState<ICategory[]>(
    initialState.array
  );
  const [environments, setEnvironments] = React.useState<IEnvironment[]>(
    initialState.array
  );
  const [flows, setFlows] = React.useState<IFlow[]>(initialState.array);
  const [priorities, setPriorities] = React.useState<IPriority[]>(
    initialState.array
  );
  const [projects, setProjects] = React.useState<IProject[]>(
    initialState.array
  );
  const [states, setStates] = React.useState<IState[]>(initialState.array);
  const [tasks, setTasks] = React.useState<ITask[]>(initialState.array);

  // const setUserCallback = React.useCallback((newUser: PairValue[] | null) => {
  //   setUser((currentUser: PairValue[] | null) => newUser);
  // }, []);

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValueType = {
      environment,
      setEnvironment,
      flow,
      setFlow,
      project,
      setProject,
      task,
      setTask,
      categories,
      setCategories,
      environments,
      setEnvironments,
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
    categories,
    environment,
    environments,
    flow,
    flows,
    priorities,
    project,
    projects,
    states,
    task,
    tasks,
  ]);

  return (
    <DataContext.Provider value={MemoizedValue}>
      {children}
    </DataContext.Provider>
  );
});

export const useData = () => useContext(DataContext);
