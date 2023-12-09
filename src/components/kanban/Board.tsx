import { Box, Stack } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";
import { ITask } from "interfaces";
import { Droppable } from "react-beautiful-dnd";

type Props = {
  label: string;
  children: React.ReactNode;
};

export const Board = (props: Props) => {
  const { theme } = useTheme();

  return (
    <Stack
      height="1"
      direction="column"
      p={theme.spacing.md}
      gap={theme.spacing.md}
      bgcolor={theme.palette.theme}
      borderRadius={theme.border.radius}
    >
      <Custom.Typography
        size={theme.font.sm}
        weight={theme.font.medium}
        color={theme.palette.font.accent}
      >
        {props.label}
      </Custom.Typography>
      {props.children}
    </Stack>
  );
};
