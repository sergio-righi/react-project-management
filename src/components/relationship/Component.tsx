import { Stack } from "@mui/material";
import { Custom, DataGrid, Form } from "components";
import { useApp, useTheme } from "contexts";
import { DEFAULT_COMPONENT, IComponent } from "interfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "utils";

type Props = {
  id: string;
  items: IComponent[];
};

export const Component = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  const navigate = useNavigate();

  const [components, setComponents] = useState<IComponent[]>(
    [] as IComponent[]
  );

  useEffect(() => setComponents(props.items), [props.items]);

  function handleOnEdit(row: IComponent) {
    navigate(Routes.pages.component.form(props.id, row._id));
  }

  return <DataGrid.Component items={components} onEdit={handleOnEdit} />;
};
