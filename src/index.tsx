import "./index.scss";

import ReactDOM from "react-dom/client";
import Routers from "router";
import { AppProvider, ThemeProvider } from "contexts";
import { Dark } from "themes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// document.documentElement.setAttribute("theme", "dark");

root.render(
  <AppProvider initLocale={"EN"}>
    <ThemeProvider initTheme={Dark}>
      <Routers />
    </ThemeProvider>
  </AppProvider>
);
