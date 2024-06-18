import { Stack } from "@mui/material";
import { UserAvatar } from "assets/images";
import { Custom, Icon } from "components";
import { useTheme } from "contexts";
import { ICategory, IPriority, IProject, IState, ITask } from "interfaces";

type Props = {
  elm: ITask;
  accent?: boolean;
};

export const Row = ({ accent = false, ...props }: Props) => {
  const { theme } = useTheme();

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
        <Custom.Chip
          size="small"
          label={(props.elm.category as ICategory).name}
          sx={{
            color: theme.color.accent.text,
            backgroundColor: theme.color.accent.color,
          }}
        />
        <Custom.Typography
          size={theme.font.sm}
          weight={theme.font.normal}
          color={theme.palette.font.accent}
        >
          {props.elm.number}
        </Custom.Typography>
        <Custom.Typography size={theme.font.sm} weight={theme.font.bold}>
          {props.elm.title}
        </Custom.Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={theme.spacing.sm}>
        <Custom.Chip
          size="small"
          label={(props.elm.project as IProject).name}
          sx={{
            color: theme.color.accent.text,
            backgroundColor: theme.color.accent.color,
          }}
        />
        <Custom.Chip
          size="small"
          label={(props.elm.state as IState).name}
          sx={{
            color: theme.color.accent.text,
            backgroundColor: theme.color.accent.color,
          }}
        />
        <Icon.Priority
          value={(props.elm.priority as IPriority).name.toLowerCase()}
        />
        <UserAvatar width={25} height={25} />
      </Stack>
    </Stack>
  );
};
