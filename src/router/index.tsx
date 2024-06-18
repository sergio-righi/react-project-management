import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout, EmptyLayout } from "layouts";
import { Backlog, Board, Project, Settings, Table, Task, View } from "pages";
import { Error } from "components";
import { Routes as Urls } from "utils";
import { LoadData, Protected } from "middlewares";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Urls.aliases.board} element={<DefaultLayout />}>
          <Route
            path={Urls.pages.board.index}
            element={
              <LoadData>
                <Board />
              </LoadData>
            }
          />
        </Route>

        <Route path={Urls.aliases.table} element={<DefaultLayout />}>
          <Route
            path={Urls.pages.table.index}
            element={
              <LoadData>
                <Table />
              </LoadData>
            }
          />
        </Route>

        <Route path={Urls.aliases.task} element={<DefaultLayout />}>
          <Route
            path={Urls.pages.task.index}
            element={
              <LoadData>
                <Task />
              </LoadData>
            }
          />
          <Route path={Urls.pages.task.view} element={<View />} />
        </Route>

        <Route path={Urls.aliases.backlog} element={<DefaultLayout />}>
          <Route
            index
            element={
              <LoadData>
                <Backlog />
              </LoadData>
            }
          />
        </Route>

        <Route path={Urls.aliases.projects} element={<DefaultLayout />}>
          <Route index element={<Project />} />
        </Route>

        <Route path={Urls.aliases.settings} element={<DefaultLayout />}>
          <Route index element={<Settings />} />
        </Route>

        <Route path="*" element={<EmptyLayout />}>
          <Route index element={<Error.Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
