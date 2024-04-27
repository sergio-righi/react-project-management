import { useEffect } from "react";
import { useData, useService } from "contexts";

export const LoadData = ({ children }: { children: any }) => {
  const { filter, flow, project, state, task, user } = useService();
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
    setFilters(await filter.filters());
  }

  async function fetchFlow() {
    setFlows(await flow.flows());
  }

  async function fetchProject() {
    setProjects(await project.projects());
  }

  async function fetchState() {
    setStates(await state.states());
  }

  async function fetchTask() {
    setTasks(await task.tasks());
  }

  async function fetchUser() {
    const users = await user.users();
    setUser(users[0]);
  }

  return children;
};
