import { useState, useEffect } from "react";
import { Custom, Relationship } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { Box, Grid } from "@mui/material";
import { DEFAULT_COMPONENT, IComponent } from "interfaces";
import { Auxiliars, Conversions, Sanitizes, Validations } from "helpers";
import { EnumColor } from "utils/enums";

type Props = {
  component: IComponent;
  onSubmit?: (value: IComponent) => void;
};

export const Component = (props: Props) => {
  const { theme } = useTheme();
  const { setFeedback, t } = useApp();
  const { projectService } = useService();

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

  function toJSON(component: any) {
    return Auxiliars.removeFromObject({
      ...component,
    } as any);
  }

  function updateCallback(name: string, value: any) {
    if (name in state) {
      setState({ ...state, [name]: value });
    }
  }

  function handleOnSubmit() {
    const response = toJSON(state) as IComponent;
    if (response.name && response.color) {
      props.onSubmit && props.onSubmit(response);
    }
  }

  return (
    <Box component="div">
      <Grid container spacing={theme.spacing.sm}>
        <Grid item xs={12} sm={6}>
          <Custom.TextField
            name="name"
            onChange={onChange}
            label={t.label.name}
            value={state.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="color"
            label={t.label.color}
            value={state.color}
            items={Conversions.fromEnumToPairValue(EnumColor)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Custom.Button onClick={handleOnSubmit}>
              {t.action.save}
            </Custom.Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
