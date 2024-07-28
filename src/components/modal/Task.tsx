import React, { useEffect, useState } from "react";
import { Custom, Form, Progress } from "components";
import { useApp, useService } from "contexts";
import { ITask } from "interfaces";
import { SxProps } from "@mui/material";

type Props = {
  sx?: SxProps;
  open: boolean;
  taskId?: string;
  onClose?: () => void;
};

export const Task = (props: Props) => {
  const { t } = useApp();
  const { taskService } = useService();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [task, setTask] = useState<ITask>({} as ITask);

  useEffect(() => {
    const fetchData = async () => {
      if (props.taskId) {
        const response = await taskService.find(props.taskId);
        if (response) setTask(response);
      }
      setLoaded(true);
    };
    fetchData();
  }, [taskService, props.open, props.taskId]);

  return (
    <Custom.Modal
      title={t.title.task}
      open={props.open}
      onClose={props.onClose}
      sx={{ maxHeight: "min(800px, 100vh)" }}
    >
      {loaded ? (
        <Form.Task task={task} onSubmit={props.onClose} />
      ) : (
        <Progress.PageProcess />
      )}
    </Custom.Modal>
  );
};
