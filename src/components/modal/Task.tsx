import React, { useEffect, useState } from "react";
import { Custom, Form, Progress } from "components";
import { useApp, useService } from "contexts";
import { DEFAULT_TASK, ITask } from "interfaces";
import { SxProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type Props = {
  sx?: SxProps;
  open: boolean;
  onClose?: () => void;
};

export const Task = (props: Props) => {
  const { t } = useApp();
  const { taskService } = useService();

  const [searchParams] = useSearchParams();
  const [loaded, setLoaded] = useState<boolean>(true);
  const [task, setTask] = useState<ITask>(DEFAULT_TASK);

  const modalTitle = `${task?._id ? t.action.edit : t.action.add} ${
    t.label.task
  }`;

  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("id");
      if (id) {
        setTask(await taskService.find(id));
      } else {
        setTask(DEFAULT_TASK);
      }
    };
    fetchData();
  }, [props.open, searchParams]);

  return (
    <Custom.Modal
      title={modalTitle}
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
