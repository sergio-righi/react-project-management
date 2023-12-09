import { Box, Stack } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { UserAvatar } from "assets/images";
import { Nav } from "components";

// icons
import {
  AssignmentRounded,
  FactCheckRounded,
  LogoutRounded,
  SettingsRounded,
  ViewKanbanRounded,
} from "@mui/icons-material";

type Props = {};

export const Navbar = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  return (
    <Box
      width={75}
      height="1"
      component="aside"
      py={theme.spacing.md}
      bgcolor={theme.palette.theme}
    >
      <Stack
        width="1"
        height="1"
        direction="column"
        alignItems="center"
        spacing={theme.spacing.xl}
      >
        <Nav.NavbarItem>
          <UserAvatar />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.board}>
          <ViewKanbanRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.project}>
          <AssignmentRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.task}>
          <FactCheckRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.settings}>
          <SettingsRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem sx={{ mt: "auto !important" }}>
          <LogoutRounded />
        </Nav.NavbarItem>
      </Stack>
    </Box>
  );
};
