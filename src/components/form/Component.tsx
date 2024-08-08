import { useState, useEffect } from "react";
import { Custom, Relationship } from "components";
import { useApp, useData, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { Box, Grid } from "@mui/material";
import { DEFAULT_COMPONENT, IComponent, IProject } from "interfaces";
import { Auxiliars, Conversions, Sanitizes, Validations } from "helpers";
import { EnumColor } from "utils/enums";

type Props = {
  project: IProject;
  component: IComponent;
  onSubmit?: (value: IComponent) => void;
};

export const Component = (props: Props) => {
  const { theme } = useTheme();
  const { setFeedback, t } = useApp();
  const { projects, setProjects } = useData();

  const fromJSON = {
    ...DEFAULT_COMPONENT,
    ...props.component,
  } as IComponent;

  const [state, setState] = useState<IComponent>(fromJSON);
  const { onChange, onDropdownChange, onSubmit } = useForm(
    {},
    undefined,
    undefined,
    updateCallback
  );

  useEffect(() => setState(fromJSON), [props.component]);

  // function toJSON(component: any) {
  //   return Auxiliars.removeFromObject({
  //     ...component,
  //   } as any);
  // }

  function updateCallback(name: string, value: any) {
    if (name in state) {
      setState({ ...state, [name]: value });
    }
  }

  function handleOnSubmit(event: any) {
    event.preventDefault();

    const prevComponents = [...props.project.components];
    const index = prevComponents.findIndex(
      (component: IComponent) => component._id === state._id
    );

    const updatedComponents = [...prevComponents];
    if (index !== -1) {
      updatedComponents[index] = state;
    } else {
      state._id = Auxiliars.generateObjectId();
      updatedComponents.push(state);
    }

    const subindex = projects.findIndex(
      (item: IProject) => item._id === props.project._id
    );

    if (subindex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[subindex].components = updatedComponents;
      setProjects(updatedProjects);
    }

    props.onSubmit && props.onSubmit(state);
  }

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <Grid container spacing={theme.spacing.sm}>
        <Grid item xs={12} sm={6}>
          <Custom.TextField
            name="name"
            required={true}
            onChange={onChange}
            label={t.label.name}
            value={state.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="color"
            required={true}
            label={t.label.color}
            value={state.color}
            items={Conversions.fromEnumToPairValue(EnumColor)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Custom.Button submit>{t.action.save}</Custom.Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
