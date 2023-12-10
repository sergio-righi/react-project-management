import { Box, Stack } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";

type Props = {
  header: string;
  subheader: string;
  control?: React.ReactNode;
  children: React.ReactNode;
};

export const Page = (props: Props) => {
  const { theme } = useTheme();

  return (
    <Stack direction="column" width="1" flex="1">
      <Box component="header" width="1" p={theme.spacing.md}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="column" gap={theme.spacing.xxs}>
            <Custom.Typography
              size={theme.font.xs}
              color={theme.palette.font.accent}
            >
              {props.subheader}
            </Custom.Typography>
            <Custom.Typography size={theme.font.lg}>
              {props.header}
            </Custom.Typography>
          </Stack>
          <Stack direction="row" spacing={theme.spacing.lg}>
            {props.control}
          </Stack>
        </Stack>
      </Box>
      <Box
        flex="1"
        width="1"
        component="main"
        p={theme.spacing.md}
        sx={{ overflowY: "auto" }}
      >
        {props.children}
      </Box>
    </Stack>
  );
};
