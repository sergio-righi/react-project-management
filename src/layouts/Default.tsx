import "assets/scss/layouts/default.scss";

import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DataProvider, ServiceProvider, useTheme } from "contexts";
import { ThemeProvider } from "@mui/material/styles";
import { Themes } from "utils";
import { Common, Nav } from "components";

export const DefaultLayout = () => {
  const { theme } = useTheme();

  return (
    <ServiceProvider>
      <ThemeProvider theme={Themes.defaultTheme(theme)}>
        <DataProvider>
          <Stack
            height="1"
            direction="row"
            bgcolor={theme.palette.background.color}
          >
            <Nav.Navbar />
            <Outlet />
            <Common.Footer />
          </Stack>
        </DataProvider>
      </ThemeProvider>
    </ServiceProvider>
  );
};
