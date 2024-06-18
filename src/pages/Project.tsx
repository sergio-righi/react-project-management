import { Grid, Stack } from "@mui/material";
import { Common, Kanban } from "components";
import { useApp, useService, useTheme } from "contexts";
import { IProject } from "interfaces";
import { useEffect, useState } from "react";

export const Project = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { project } = useService();
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setProjects(await project.projects());
    };
    fetchData();
  }, []);

  return (
    <Common.Page
      header={t.title.project}
      subheader={"Lorem ipsum dolor sit amet"}
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
