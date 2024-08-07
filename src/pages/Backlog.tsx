import { Box, Stack } from "@mui/material";
import { Common, Controller, Custom, Kanban } from "components";
import { useApp, useData, useTheme } from "contexts";
import { IProject, IState, ITask } from "interfaces";
import { useEffect, useState } from "react";

export const Backlog = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { getBacklog, project, projects, setProject, states } = useData();

  const [todo, setTodo] = useState<ITask[]>([]);
  const [done, setDone] = useState<ITask[]>([]);

  useEffect(() => {
    const tasks = getBacklog();
    setTodo(tasks.filter((item: ITask) => !item.isCompleted));
    setDone(tasks.filter((item: ITask) => item.isCompleted));
  }, [getBacklog]);

  return (
    <Common.Page
      header={t.title.backlog}
      subheader={t.subtitle.backlog}
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
      <Stack spacing={theme.spacing.sm}>
        <Kanban.Table
          id="kanban-backlog-todo"
          title={t.header.todo}
          items={todo}
        />
        <Kanban.Table
          id="kanban-backlog-done"
          title={t.header.done}
          items={done}
        />
      </Stack>
    </Common.Page>
  );
};
