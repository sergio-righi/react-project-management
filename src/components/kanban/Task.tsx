import { Box, Stack } from "@mui/material";
import { UserAvatar } from "assets/images";
import { Custom, Icon } from "components";
import { useApp, useTheme } from "contexts";
import { Auxiliars, Conversions, Sanitizes } from "helpers";
import { ICategory, IComponent, IPriority, IProject, ITask } from "interfaces";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "utils";
import { EnumColor, EnumModalType } from "utils/enums";

type Props = {
  elm: ITask;
  accent?: boolean;
};

export const Task = ({ accent = false, ...props }: Props) => {
  const { theme } = useTheme();
  const { locale, t } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const bgColor = Conversions.fromEnumToValue(
    EnumColor,
    (props.elm.component as IComponent).color,
    theme.color.accent.color
  );

  function navigateToTask() {
    navigate({
      pathname: location.pathname,
      search: Routes.pages.task.popup(props.elm._id),
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
      <Stack width={1} direction="column">
        <Custom.Typography
          size={theme.font.xs}
          weight={theme.font.normal}
          color={theme.palette.font.accent}
          onClick={navigateToTask}
        >
          {Sanitizes.toUniqueNumber(
            (props.elm.project as IProject).prefix,
            props.elm.number.toString()
          )}
        </Custom.Typography>
        <Custom.Typography
          size={theme.font.sm}
          className="o-ellipsis"
          weight={theme.font.bold}
        >
          {props.elm.title}
        </Custom.Typography>
      </Stack>
      <Stack direction="row" gap={theme.spacing.sm}>
        <Custom.Chip
          size="small"
          label={(props.elm.component as IComponent).name}
          sx={{
            color: Auxiliars.getContrast(bgColor),
            backgroundColor: bgColor,
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
