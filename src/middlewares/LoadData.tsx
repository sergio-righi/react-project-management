import { useEffect } from "react";
import { useData, useService } from "contexts";

export const LoadData = ({ children }: { children: any }) => {
  const {
    filterService,
    flowService,
    projectService,
    stateService,
    taskService,
    userService,
  } = useService();
  const { setFilters, setFlows, setProjects, setStates, setTasks, setUser } =
    useData();

  useEffect(() => {
    fetchUser();
    fetchProject();
    fetchTask();
    fetchFilter();
    fetchFlow();
    fetchState();
  }, []);

  async function fetchFilter() {
    setFilters(await filterService.filters());
  }

  async function fetchFlow() {
    setFlows(await flowService.flows());
  }

  async function fetchProject() {
    setProjects(await projectService.projects());
  }

  async function fetchState() {
    setStates(await stateService.states());
  }

  async function fetchTask() {
    setTasks(await taskService.tasks());
  }

  async function fetchUser() {
    const users = await userService.users();
    setUser(users[0]);
  }

  return children;
};
