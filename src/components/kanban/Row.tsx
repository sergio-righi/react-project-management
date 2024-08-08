import { Stack } from "@mui/material";
import { UserAvatar } from "assets/images";
import { Custom, Icon } from "components";
import { useApp, useTheme } from "contexts";
import { Auxiliars, Conversions, Sanitizes } from "helpers";
import {
  ICategory,
  IComponent,
  IPriority,
  IProject,
  IState,
  ITask,
} from "interfaces";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "utils";
import { EnumColor, EnumModalType } from "utils/enums";

type Props = {
  elm: ITask;
  accent?: boolean;
};

export const Row = ({ accent = false, ...props }: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const [backgroundColor, setBackgroundColor] = useState<string>(
    theme.color.accent.color
  );

  useEffect(() => {
    setBackgroundColor(
      Conversions.fromEnumToValue(
        EnumColor,
        (props.elm.component as IComponent).color,
        theme.color.accent.color
      )
    );
  }, [props.elm.component]);

  function navigateToTask() {
    navigate({
      pathname: location.pathname,
      search: Routes.pages.task.form(props.elm._id),
    });
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={theme.spacing.sm}
      mt={theme.spacing.xxs}
      borderRadius={theme.border.radius}
      justifyContent="space-between"
      bgcolor={
        accent
          ? theme.palette.background.accent
          : theme.palette.background.color
      }
    >
      <Stack direction="row" alignItems="center" spacing={theme.spacing.sm}>
        <Icon.Priority
          value={(props.elm.priority as IPriority).name.toLowerCase()}
        />
        <Custom.Typography
          size={theme.font.sm}
          weight={theme.font.normal}
          color={theme.palette.font.accent}
          onClick={navigateToTask}
        >
          {Sanitizes.toUniqueNumber(
            (props.elm.project as IProject).prefix,
            props.elm.number.toString()
          )}
        </Custom.Typography>
        <Custom.Typography size={theme.font.sm} weight={theme.font.bold}>
          {props.elm.title}
        </Custom.Typography>
        {props.elm.isCompleted ? (
          <Custom.Chip
            size="small"
            label={t.header.done}
            sx={{
              color: theme.color.accent.text,
              backgroundColor: theme.color.accent.color,
            }}
          />
        ) : (
          <Custom.Chip
            size="small"
            label={(props.elm.state as IState).name}
            sx={{
              color: theme.color.accent.text,
              backgroundColor: theme.color.accent.color,
            }}
          />
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={theme.spacing.sm}>
        <Custom.Chip
          size="small"
          label={(props.elm.component as IComponent).name}
          sx={{
            color: Auxiliars.getContrast(backgroundColor),
            backgroundColor: backgroundColor,
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
        <UserAvatar width={25} height={25} />
      </Stack>
    </Stack>
  );
};
