import { Grid, Stack } from "@mui/material";
import { Common, Controller, Custom, Kanban } from "components";
import { useApp, useData, useTheme } from "contexts";
import { IProject, ITask } from "interfaces";

export const Task = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { getTasks, project, projects, setProject } = useData();

  return (
    <Common.Page
      header={t.title.task}
      subheader={t.subtitle.task}
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
      <Grid container width="1" spacing={theme.spacing.sm}>
        {getTasks().map((item: ITask) => {
          return (
            <Grid key={item._id} item xs={12} sm={6} md={3} lg={2}>
              <Kanban.Task elm={item} accent />
            </Grid>
          );
        })}
      </Grid>
    </Common.Page>
  );
};
