import { Box, Stack } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { UserAvatar } from "assets/images";
import { Nav } from "components";

// icons
import {
  AssignmentRounded,
  FactCheckRounded,
  GridOnRounded,
  LogoutRounded,
  SettingsRounded,
  ViewKanbanRounded,
} from "@mui/icons-material";
import { Routes } from "utils";

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
      <Stack width="1" height="1" direction="column" alignItems="center">
        <Nav.NavbarItem>
          <UserAvatar />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.board} to={Routes.strings.board}>
          <ViewKanbanRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.table} to={Routes.strings.table}>
          <GridOnRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.project} to={Routes.strings.projects}>
          <AssignmentRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.task} to={Routes.strings.tasks}>
          <FactCheckRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem label={t.title.settings} to={Routes.strings.settings}>
          <SettingsRounded />
        </Nav.NavbarItem>
        <Nav.NavbarItem sx={{ mt: "auto !important" }}>
          <LogoutRounded />
        </Nav.NavbarItem>
      </Stack>
    </Box>
  );
};
