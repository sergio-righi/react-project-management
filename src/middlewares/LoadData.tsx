import { useEffect } from "react";
import { useData, useService } from "contexts";

export const LoadData = ({ children }: { children: any }) => {
  const {
    categoryService,
    filterService,
    flowService,
    priorityService,
    projectService,
    stateService,
    taskService,
    userService,
  } = useService();
  const {
    setCategories,
    setFilters,
    setFlows,
    setPriorities,
    setProjects,
    setStates,
    setTasks,
    setUser,
    setUsers,
  } = useData();

  useEffect(() => {
    fetchUser();
    fetchProject();
    fetchTask();
    fetchCategory();
    fetchFilter();
    fetchFlow();
    fetchPriority();
    fetchState();
  }, []);

  async function fetchCategory() {
    setCategories(await categoryService.categories());
  }

  async function fetchFilter() {
    setFilters(await filterService.filters());
  }

  async function fetchFlow() {
    setFlows(await flowService.flows());
  }

  async function fetchPriority() {
    setPriorities(await priorityService.priorities());
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
    setUsers(users);
  }

  return children;
};
