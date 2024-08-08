import React, { useEffect, useState } from "react";
import { Custom, Form, Progress, Relationship } from "components";
import { useApp, useData, useService, useTheme } from "contexts";
import { DEFAULT_PROJECT, IComponent, IProject } from "interfaces";
import { Box, Stack, SxProps } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "utils";

type Props = {
  sx?: SxProps;
  open: boolean;
  onClose?: () => void;
};

export const ComponentList = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { projects } = useData();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [loaded, setLoaded] = useState<boolean>(true);
  const [project, setProject] = useState<IProject>(DEFAULT_PROJECT);

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

  function navigateToComponent() {
    navigate(Routes.pages.component.form(project._id));
  }

  return (
    <Custom.Modal
      title={t.header.component}
      open={props.open}
      onClose={props.onClose}
      sx={{ maxHeight: "min(800px, 100vh)" }}
    >
      {loaded ? (
        <Stack spacing={theme.spacing.md}>
          <Box>
            <Custom.Button onClick={navigateToComponent}>
              {t.action.add}
            </Custom.Button>
          </Box>
          <Relationship.Component id={project._id} items={project.components} />
        </Stack>
      ) : (
        <Progress.PageProcess />
      )}
    </Custom.Modal>
  );
};
