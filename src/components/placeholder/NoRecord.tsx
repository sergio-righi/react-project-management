import { Stack } from "@mui/material";
import { Custom } from "components";
import { useApp, useTheme } from "contexts";
import { PlaceholderNoRecord } from "assets/images";

type Props = {};

export const NoRecord = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <Stack
      width={1}
      alignItems="center"
      p={theme.spacing.md}
      justifyContent="center"
    >
      <PlaceholderNoRecord />
      <Custom.Typography
        size={theme.font.sm}
        weight={theme.font.normal}
        color={theme.palette.font.accent}
      >
        {t.placeholder.no_record}
      </Custom.Typography>
    </Stack>
  );
};
