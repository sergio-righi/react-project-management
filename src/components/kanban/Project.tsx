import { Stack } from "@mui/material";
import { UserAvatar } from "assets/images";
import { Custom, Icon } from "components";
import { useApp, useTheme } from "contexts";
import { Conversions } from "helpers";
import { ICategory, IPriority, IProject, IState } from "interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "utils";

type Props = {
  elm: IProject;
  accent?: boolean;
};

export const Project = ({ accent = false, ...props }: Props) => {
  const { theme } = useTheme();
  const { locale, t } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  function navigateToProject() {
    navigate({
      pathname: location.pathname,
      search: Routes.pages.project.form(props.elm._id),
    });
  }

  return (
    <Stack
      p={theme.spacing.md}
      spacing={theme.spacing.sm}
      borderRadius={theme.border.radius}
      bgcolor={
        accent
          ? theme.palette.background.accent
          : theme.palette.background.color
      }
    >
      <Stack
        width={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="column">
          <Custom.Typography
            size={theme.font.xs}
            weight={theme.font.normal}
            color={theme.palette.font.accent}
            onClick={navigateToProject}
          >
            {props.elm.prefix}
          </Custom.Typography>
          <Custom.Typography
            size={theme.font.sm}
            className="o-ellipsis"
            weight={theme.font.bold}
          >
            {props.elm.name}
          </Custom.Typography>
        </Stack>
        <Custom.Typography size={theme.font.xs} weight={theme.font.normal}>
          ({props.elm.tasks.length} {t.label.task.toLowerCase()})
        </Custom.Typography>
      </Stack>
      <Stack direction="row" gap={theme.spacing.sm}>
        <Custom.Chip
          size="small"
          label={(props.elm.state as IState).name}
          sx={{
            color: theme.color.accent.text,
            backgroundColor: theme.color.accent.color,
          }}
        />
        <Custom.Chip
          size="small"
          label={(props.elm.category as ICategory).name}
          sx={{
            color: theme.color.accent.text,
            backgroundColor: theme.color.accent.color,
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={theme.spacing.sm}>
          <Icon.Priority
            value={(props.elm.priority as IPriority).name.toLowerCase()}
          />
          <Custom.Typography weight={theme.font.light} size={theme.font.xs}>
            {Conversions.toDueString(props.elm.deadline, t, locale)}
          </Custom.Typography>
        </Stack>
        <UserAvatar width={25} height={25} />
      </Stack>
    </Stack>
  );
};
