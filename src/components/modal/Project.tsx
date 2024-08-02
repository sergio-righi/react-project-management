import React, { useEffect, useState } from "react";
import { Custom, Form, Progress } from "components";
import { useApp, useData, useService } from "contexts";
import { DEFAULT_PROJECT, IProject } from "interfaces";
import { SxProps } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type Props = {
  sx?: SxProps;
  open: boolean;
  onClose?: () => void;
};

export const Project = (props: Props) => {
  const { t } = useApp();
  const { projects } = useData();

  const [searchParams] = useSearchParams();
  const [loaded, setLoaded] = useState<boolean>(true);
  const [project, setProject] = useState<IProject>(DEFAULT_PROJECT);

  const modalTitle = `${
    searchParams.get("id") ? t.action.edit : t.action.add
  } ${t.label.project}`;

  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("id");
      if (id) {
        const response = projects.find((item: IProject) => item._id === id);
        if (response) setProject(response);
      } else {
        setProject(DEFAULT_PROJECT);
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
        <Form.Project project={project} onSubmit={props.onClose} />
      ) : (
        <Progress.PageProcess />
      )}
    </Custom.Modal>
  );
};
