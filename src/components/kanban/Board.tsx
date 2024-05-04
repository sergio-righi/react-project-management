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
    <Stack height={1} direction="column" gap={theme.spacing.xs}>
      <Box
        border={1}
        px={theme.spacing.md}
        py={theme.spacing.sm}
        borderColor={theme.palette.border}
        borderRadius={theme.border.radius}
        bgcolor={theme.palette.background.accent}
      >
        <Custom.Typography
          size={theme.font.sm}
          weight={theme.font.medium}
          // color={theme.palette.font.accent}
        >
          {props.label}
        </Custom.Typography>
      </Box>
      <Box
        height={1}
        p={theme.spacing.md}
        border={theme.border.radius}
        borderColor={theme.palette.border}
        borderRadius={theme.border.radius}
        bgcolor={theme.palette.background.accent}
      >
        {props.children}
      </Box>
    </Stack>
  );
};
