import { Stack } from "@mui/material";
import { Custom, Icon } from "components";
import { useTheme } from "contexts";
import {
  ICategory,
  IEnvironment,
  IFlow,
  IPriority,
  IProject,
  ITask,
} from "interfaces";

type Props = {
  elm: ITask;
};

export const Task = (props: Props) => {
  const { theme } = useTheme();

  return (
    <Stack
      p={theme.spacing.md}
      spacing={theme.spacing.sm}
      borderRadius={theme.border.radius}
      bgcolor={theme.palette.background.color}
    >
      <Stack direction="column">
        <Custom.Typography
          size={theme.font.xs}
          color={theme.palette.font.accent}
        >
          {(props.elm.project as IProject).name}
        </Custom.Typography>
        <Custom.Typography size={theme.font.sm}>
          {props.elm.title}
        </Custom.Typography>
      </Stack>
      <Stack direction="row" gap={theme.spacing.sm}>
        <Custom.Chip
          size="small"
          label={(props.elm.flow as IFlow).name}
          sx={{
            color: theme.color.accent.text,
            backgroundColor: theme.color.accent.color,
          }}
        />
        <Custom.Chip
          size="small"
          label={(props.elm.environment as IEnvironment).name}
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
            {props.elm.deadline}
          </Custom.Typography>
        </Stack>
        <Icon.Category
          value={(props.elm.category as ICategory).name.toLowerCase()}
        />
      </Stack>
    </Stack>
  );
};
