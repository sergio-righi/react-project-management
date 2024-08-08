import React, { useEffect, useState } from "react";
import { Custom, Form, Progress } from "components";
import { useApp, useData } from "contexts";
import {
  DEFAULT_COMPONENT,
  DEFAULT_PROJECT,
  IComponent,
  IProject,
} from "interfaces";
import { SxProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type Props = {
  sx?: SxProps;
  open: boolean;
  onClose?: () => void;
};

export const Component = (props: Props) => {
  const { t } = useApp();
  const { projects } = useData();

  const [searchParams] = useSearchParams();

  const [loaded, setLoaded] = useState<boolean>(true);
  const [project, setProject] = useState<IProject>(DEFAULT_PROJECT);
  const [component, setComponent] = useState<IComponent>(DEFAULT_COMPONENT);

  const modalTitle = `${
    searchParams.get("id") ? t.action.edit : t.action.add
  } ${t.label.component}`;

  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("id");
      const projectId = searchParams.get("ref_id") || "";
      const parent = projects.find(
        (item: IProject) => item._id === projectId
      ) as IProject;
      if (id) {
        const response = parent?.components.find(
          (item: IComponent) => item._id === id
        ) as IComponent;
        if (response) setComponent(response);
      } else {
        setComponent(DEFAULT_COMPONENT);
      }
      setProject(parent);
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
        <Form.Component
          project={project}
          component={component}
          onSubmit={props.onClose}
        />
      ) : (
        <Progress.PageProcess />
      )}
    </Custom.Modal>
  );
};
