import { Stack } from "@mui/material";
import { Common, Controller, Custom, Kanban } from "components";
import { useApp, useData, useTheme } from "contexts";
import { IProject, IState, ITask } from "interfaces";
import { useEffect, useState } from "react";

export const Table = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { getTasks, project, projects, setProject, states } = useData();
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    // TODO : it has to be improved
    const stateCondition = states
      .filter((item: IState) => item.name !== "Draft")
      .map((item: IState) => item._id);
    const tasks = getTasks().filter(
      (item: ITask) =>
        stateCondition.includes((item.state as IState)._id) &&
        ((item.project as IProject)._id === project || project === "")
    );
    setTasks(tasks);
  }, [project]);

  return (
    <Common.Page
      header={t.title.table}
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
        elms={tasks}
      />
    </Common.Page>
  );
};
