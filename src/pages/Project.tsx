import { Grid, Stack } from "@mui/material";
import { Common, Kanban } from "components";
import { useApp, useData, useService, useTheme } from "contexts";
import { IProject } from "interfaces";
import { useEffect, useState } from "react";

export const Project = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { projects } = useData();

  return (
    <Common.Page
      header={t.title.project}
      subheader={t.subtitle.project}
      control={<></>}
    >
      <Grid container width="1" spacing={theme.spacing.sm}>
        {projects.map((item: IProject) => {
          return (
            <Grid key={item._id} item xs={12} sm={6} md={3} lg={2}>
              <Kanban.Project elm={item} accent />
            </Grid>
          );
        })}
      </Grid>
    </Common.Page>
  );
};
