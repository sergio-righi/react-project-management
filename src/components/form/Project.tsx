import { useState, useEffect } from "react";
import { Custom, Relationship } from "components";
import { useApp, useData, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { Constants, Enums, ORM } from "utils";
import { Box, Grid } from "@mui/material";
import { Feedback, PairValue } from "types";
import { DEFAULT_PROJECT, IComponent, IProject } from "interfaces";
import { Auxiliars, Conversions, Sanitizes, Validations } from "helpers";

type Props = {
  project: IProject;
  onSubmit?: () => void;
};

export const Project = (props: Props) => {
  const { theme } = useTheme();
  const { setFeedback, t } = useApp();
  const { categories, priorities, projects, states, setProjects } = useData();

  const fromJSON = {
    ...DEFAULT_PROJECT,
    ...props.project,
  } as any;

  const validation = {
    deadline: {
      valid: { error: false, helperText: "" },
      invalid: { error: true, helperText: "Invalid Date" },
      callback: (value: string) =>
        new Date(value).toString() !== "Invalid Date",
    },
  };

  const [validationState, setValidationState] = useState({
    deadline: validation.deadline.valid,
  });

  const [state, setState] = useState<IProject | any>(fromJSON);
  const { onChange, onDropdownChange, onSubmit } = useForm(
    {},
    undefined,
    undefined,
    updateCallback
  );

  useEffect(() => setState(fromJSON), [props.project]);

  // function toJSON(task: any) {
  //   return Auxiliars.removeFromObject({
  //     ...task,
  //   } as any);
  // }

  function updateCallback(name: string, value: any) {
    if (name in state) {
      setState({ ...state, [name]: value });
    }
  }

  async function handleOnSubmit(event: any) {
    event.preventDefault();

    let newValidationState: any = {};

    let valid = true;

    let name: keyof typeof validation;
    for (name in validation) {
      if (state.hasOwnProperty(name)) {
        if (validation[name].callback(state[name])) {
          newValidationState[name] = validation[name].valid;
        } else {
          newValidationState[name] = validation[name].invalid;
          valid = false;
        }
      }
    }

    setValidationState(newValidationState);

    if (!valid) return;

    if (state) {
      const index = projects.findIndex(
        (item: IProject) => item._id === state._id
      );
      if (index !== -1) {
        const updatedProjects = [...projects] as IProject[];
        updatedProjects[index] = state;
        setProjects(updatedProjects);
      } else {
        const response = ORM.populateProject(state as IProject);
        response._id = Auxiliars.generateObjectId();
        setProjects([...projects, response] as IProject[]);
      }

      // setFeedback({
      //   message: t.message.feedback.request_success,
      //   severity: Enums.EnumFeedback.Success,
      // } as Feedback);
      props.onSubmit && props.onSubmit();
    } else {
      // setFeedback({
      //   message: t.message.feedback.request_error,
      //   severity: Enums.EnumFeedback.Error,
      // } as Feedback);
    }
  }

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <Grid container spacing={theme.spacing.sm}>
        <Grid item xs={12}>
          <Custom.TextField
            name="name"
            required={true}
            onChange={onChange}
            label={t.label.name}
            value={state.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Custom.TextField
            name="briefdescription"
            required={true}
            onChange={onChange}
            label={t.label.briefdescription}
            value={state.briefdescription}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Custom.TextField
            name="prefix"
            required={true}
            onChange={onChange}
            label={t.label.prefix}
            value={state.prefix}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Custom.Select
            name="category"
            required={true}
            label={t.label.category}
            value={state.category._id}
            items={Conversions.toPairValue(categories)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Custom.Select
            name="priority"
            required={true}
            label={t.label.priority}
            value={state.priority._id}
            items={Conversions.toPairValue(priorities)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="state"
            required={true}
            label={t.label.state}
            value={state.state._id}
            items={Conversions.toPairValue(states)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.TextField
            name="deadline"
            error={validationState.deadline.error}
            helperText={validationState.deadline.helperText}
            onChange={onChange}
            label={t.label.deadline}
            mask={Constants.INPUT_MASK.DATE}
            // maskPlaceholder={Constants.INPUT_MASK_PLACEHOLDER.DATE}
            value={state.deadline}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Relationship.Component
            items={(props.project?.components ?? []) as IComponent[]}
          />
        </Grid> */}
        <Grid item xs={12}>
          <Box>
            <Custom.Button submit>{t.action.save}</Custom.Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
