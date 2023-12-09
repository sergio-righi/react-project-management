import { Stack } from "@mui/material";
import { Custom, Icon } from "components";
import { useTheme } from "contexts";
import { ITask } from "interfaces";
import { Draggable } from "react-beautiful-dnd";

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
          Title Placeholder
        </Custom.Typography>
        <Custom.Typography size={theme.font.sm}>
          Project Name Placeholder
        </Custom.Typography>
      </Stack>
      <Stack direction="row" gap={theme.spacing.sm}>
        <Custom.Chip
          size="small"
          label="Improvement"
          sx={{
            color: theme.color.accent.text,
            backgroundColor: theme.color.accent.color,
          }}
        />
        <Custom.Chip
          size="small"
          label="DEV"
          sx={{
            color: theme.color.accent.text,
            backgroundColor: theme.color.accent.color,
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={theme.spacing.sm}>
          <Icon.Priority value="critical" />
          <Custom.Typography weight={theme.font.light} size={theme.font.xs}>
            Due in 3 days
          </Custom.Typography>
        </Stack>
        <Icon.Category value="story" />
      </Stack>
    </Stack>
  );
};
