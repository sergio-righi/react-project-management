import React, { useEffect, useState } from "react";
import { Custom, Form, Progress } from "components";
import { useApp, useService } from "contexts";
import { IProject } from "interfaces";
import { SxProps } from "@mui/material";

type Props = {
  sx?: SxProps;
  open: boolean;
  projectId?: string;
  onClose?: () => void;
};

export const Project = (props: Props) => {
  const { t } = useApp();
  const { projectService } = useService();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [project, setProject] = useState<IProject>({} as IProject);

  const modalTitle = `${props.projectId ? t.action.edit : t.action.add} ${
    t.label.project
  }`;

  useEffect(() => {
    const fetchData = async () => {
      if (props.projectId) {
        const response = await projectService.find(props.projectId);
        if (response) setProject(response);
      }
      setLoaded(true);
    };
    fetchData();
  }, [projectService, props.open, props.projectId]);

  return (
    <Custom.Modal
      title={modalTitle}
      open={props.open}
      onClose={props.onClose}
      sx={{ maxHeight: "min(800px, 100vh)" }}
    >
      {loaded ? (
        <Form.Project project={project} onSubmit={props.onClose} />
      ) : (
        <Progress.PageProcess />
      )}
    </Custom.Modal>
  );
};
