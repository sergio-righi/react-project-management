import { useState } from "react";
import { useApp, useTheme } from "contexts";
import { useLocation, useNavigate } from "react-router-dom";

// icons
import { AddRounded } from "@mui/icons-material";
import { Controller, Custom, Modal } from "components";
import { EnumModalType } from "utils/enums";
import { Stack } from "@mui/material";
import { Routes } from "utils";

type Props = {};

export const Footer = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const isProject = location.pathname.includes("project");

  function handleProjectOnClick() {
    navigate(Routes.pages.project.popup());
  }

  function handleTaskOnClick() {
    navigate(Routes.pages.task.popup());
  }

  return (
    <Stack
      direction="row"
      position="fixed"
      spacing={theme.spacing.sm}
      right={theme.spacing.default}
      bottom={theme.spacing.default}
    >
      {!isProject && (
        <Custom.Fab
          // size="medium"
          // text={t.label.task}
          onStateChange={handleTaskOnClick}
        >
          <AddRounded />
        </Custom.Fab>
      )}
      {isProject && (
        <Custom.Fab
          // size="medium"
          // text={t.label.project}
          onStateChange={handleProjectOnClick}
        >
          <AddRounded />
        </Custom.Fab>
      )}
    </Stack>
  );
};
