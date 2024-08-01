import { Stack } from "@mui/material";
import { Custom, DataGrid, Form } from "components";
import { useApp, useTheme } from "contexts";
import { DEFAULT_COMPONENT, IComponent } from "interfaces";
import { useEffect, useState } from "react";

type Props = {
  items: IComponent[];
};

export const Component = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  const [component, setComponent] = useState<IComponent>(DEFAULT_COMPONENT);
  const [components, setComponents] = useState<IComponent[]>(
    [] as IComponent[]
  );

  useEffect(() => setComponents(props.items), [props.items]);

  function handleOnEdit(row: IComponent) {
    setComponent(row);
  }

  function handleOnSubmit(row: IComponent) {
    setComponents((prevComponents: IComponent[]) => {
      const index = prevComponents.findIndex(
        (component: IComponent) => component._id === row._id
      );
      if (index !== -1) {
        const updatedComponents = [...prevComponents];
        updatedComponents[index] = row;
        return updatedComponents;
      } else {
        return [...prevComponents, row];
      }
    });

    setComponent(DEFAULT_COMPONENT);
  }

  return (
    <Stack spacing={theme.spacing.sm} borderRadius={theme.border.radius}>
      <Custom.Typography size={theme.font.md} weight={theme.font.medium}>
        {t.header.component}
      </Custom.Typography>
      <Stack spacing={theme.spacing.md}>
        <Form.Component component={component} onSubmit={handleOnSubmit} />
        <DataGrid.Component items={components} onEdit={handleOnEdit} />
      </Stack>
    </Stack>
  );
};
