import { useEffect } from "react";
import { useData, useService } from "contexts";

export const LoadData = ({ children }: { children: any }) => {
  const { flow, state, task, user } = useService();
  const { setFlows, setStates, setTasks, setUser } = useData();

  useEffect(() => {
    fetchUser();
    fetchTask();
    fetchFlow();
    fetchState();
  }, []);

  async function fetchFlow() {
    setFlows(await flow.flows());
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
