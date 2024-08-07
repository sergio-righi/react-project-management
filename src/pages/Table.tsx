import { Stack } from "@mui/material";
import { Common, Controller, Custom, Kanban } from "components";
import { useApp, useData, useTheme } from "contexts";
import { IProject, IState, ITask } from "interfaces";

export const Table = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { getTasks, project, projects, setProject } = useData();

  return (
    <Common.Page
      header={t.title.table}
      subheader={t.subtitle.table}
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
        id="kanban-table-wip"
        title={t.header.wip}
        items={getTasks()}
      />
    </Common.Page>
  );
};
