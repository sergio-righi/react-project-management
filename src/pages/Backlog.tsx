import { Box, Stack } from "@mui/material";
import { Common, Controller, Custom, Kanban } from "components";
import { useApp, useData, useTheme } from "contexts";
import { IProject, IState, ITask } from "interfaces";
import { useEffect, useState } from "react";

export const Backlog = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { getBacklog, project, projects, setProject, states } = useData();

  return (
    <Common.Page
      header={t.title.backlog}
      subheader={"Lorem ipsum dolor sit amet"}
      control={
        <>
          <Stack direction="row" spacing={theme.spacing.sm} alignItems="center">
            <Custom.Typography
              size={theme.font.xs}
              weight={theme.font.medium}
              color={theme.palette.font.accent}
            >
              {t.title.project}
            </Custom.Typography>
            <Controller.Button
              size="small"
              selected={project}
              items={[
                {
                  id: "",
                  children: t.filter.all,
                },
                ...projects.map((item: IProject) => ({
                  id: item._id,
                  children: item.name,
                })),
              ]}
              onSelect={(value: string) => setProject(value)}
            />
          </Stack>
        </>
      }
    >
      <Kanban.Table
        id="abc"
        title={"Lorem ipsum dolor sit amet"}
        elms={getBacklog()}
      />
    </Common.Page>
  );
};
