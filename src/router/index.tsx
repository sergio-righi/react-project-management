import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout, EmptyLayout } from "layouts";
import { Board } from "pages";
import { Error } from "components";
import { Routes as Urls } from "utils";
import { Protected } from "middlewares";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Board />} />
        </Route>

        <Route path="*" element={<EmptyLayout />}>
          <Route index element={<Error.Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
