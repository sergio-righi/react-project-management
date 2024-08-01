import { useState, useEffect } from "react";
import { Custom, Relationship } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { Constants, Enums } from "utils";
import { Box, Grid } from "@mui/material";
import { Feedback, PairValue } from "types";
import { IComponent, IProject } from "interfaces";
import { Auxiliars, Conversions, Sanitizes, Validations } from "helpers";
import { EnumColor } from "utils/enums";

type Props = {
  project: IProject;
  onSubmit?: () => void;
};

export const Project = (props: Props) => {
  const { theme } = useTheme();
  const { setFeedback, t } = useApp();
  const { categoryService, priorityService, projectService, stateService } =
    useService();

  const fromJSON = {
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
    submitCallback,
    updateCallback
  );

  const [states, setStates] = useState<PairValue[]>([]);
  const [projects, setProjects] = useState<PairValue[]>([]);
  const [components, setComponents] = useState<PairValue[]>([]);
  const [categories, setCategories] = useState<PairValue[]>([]);
  const [priorities, setPriorities] = useState<PairValue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await categoryService.asPairValue());
      setPriorities(await priorityService.asPairValue());
      setStates(await stateService.asPairValue());
      setProjects(await projectService.asPairValue());
    };
    fetchData();
  }, []);

  useEffect(() => setState(fromJSON), [props.project]);

  function toJSON(task: any) {
    return Auxiliars.removeFromObject({
      ...task,
    } as any);
  }

  function updateCallback(name: string, value: any) {
    if (name in state) {
      setState({ ...state, [name]: value });
    }
  }

  async function submitCallback() {
    const response = toJSON(state);
    console.log(response);

    let newValidationState: any = {};

    let valid = true;

    // let name: keyof typeof validation;
    // for (name in validation) {
    //   if (response.hasOwnProperty(name)) {
    //     if (validation[name].callback((response as any)[name])) {
    //       newValidationState[name] = validation[name].valid;
    //     } else {
    //       newValidationState[name] = validation[name].invalid;
    //       valid = false;
    //     }
    //   }
    // }

    setValidationState(newValidationState);

    if (!valid) return;

    // const response = await projectService.update(toJSON(state));
    // if (response) {
    //   setFeedback({
    //     message: t.message.feedback.request_success,
    //     severity: Enums.EnumFeedback.Success,
    //   } as Feedback);
    //   props.onSubmit && props.onSubmit();
    // } else {
    //   setFeedback({
    //     message: t.message.feedback.request_error,
    //     severity: Enums.EnumFeedback.Error,
    //   } as Feedback);
    // }
  }

  return (
    <Box component="form" onSubmit={onSubmit}>
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
            name="state"
            // required={true}
            label={t.label.state}
            value={state.state}
            items={states}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Custom.Select
            name="priority"
            // required={true}
            label={t.label.priority}
            value={state.priority}
            items={priorities}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="category"
            // required={true}
            label={t.label.category}
            value={state.category}
            items={categories}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.TextField
            name="deadline"
            required={true}
            error={validationState.deadline.error}
            helperText={validationState.deadline.helperText}
            onChange={onChange}
            label={t.label.deadline}
            mask={Constants.INPUT_MASK.DATE}
            // maskPlaceholder={Constants.INPUT_MASK_PLACEHOLDER.DATE}
            value={state.deadline}
          />
        </Grid>
        <Grid item xs={12}>
          <Relationship.Component
            items={(props.project?.components ?? []) as IComponent[]}
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Custom.Button>{t.action.save}</Custom.Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
