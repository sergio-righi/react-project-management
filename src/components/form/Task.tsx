import { useState, useEffect } from "react";
import { Custom } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { Constants, Enums } from "utils";
import { Box, Grid } from "@mui/material";
import { Feedback, PairValue } from "types";
import { ITask } from "interfaces";
import { Auxiliars, Sanitizes, Validations } from "helpers";

type Props = {
  task: ITask;
  onSubmit?: () => void;
};

export const Task = (props: Props) => {
  const { theme } = useTheme();
  const { setFeedback, t } = useApp();
  const { taskService } = useService();

  const fromJSON = {
    ...props.task,
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

  const [state, setState] = useState<ITask | any>(fromJSON);
  const { onChange, onDropdownChange, onSubmit } = useForm(
    {},
    undefined,
    submitCallback,
    updateCallback
  );

  useEffect(() => setState(fromJSON), [props.task]);

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

    // const response = await taskService.update(toJSON(state));
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
            name="title"
            required={true}
            onChange={onChange}
            label={t.label.title}
            value={state.title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="state"
            // required={true}
            label={t.label.state}
            value={state.state}
            items={
              [
                // {
                //   key: Enums.EnumGender.Female,
                //   value: t.label.female,
                // } as PairValue,
              ]
            }
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="priority"
            // required={true}
            label={t.label.priority}
            value={state.priority}
            items={
              [
                // {
                //   key: Enums.EnumGender.Female,
                //   value: t.label.female,
                // } as PairValue,
              ]
            }
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Custom.TextField
            name="description"
            required={true}
            onChange={onChange}
            label={t.label.description}
            value={state.description}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="category"
            // required={true}
            label={t.label.category}
            value={state.category}
            items={
              [
                // {
                //   key: Enums.EnumGender.Female,
                //   value: t.label.female,
                // } as PairValue,
              ]
            }
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="project"
            // required={true}
            label={t.label.project}
            value={state.project}
            items={
              [
                // {
                //   key: Enums.EnumGender.Female,
                //   value: t.label.female,
                // } as PairValue,
              ]
            }
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="component"
            // required={true}
            label={t.label.component}
            value={state.component}
            items={
              [
                // {
                //   key: Enums.EnumGender.Female,
                //   value: t.label.female,
                // } as PairValue,
              ]
            }
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="assignees"
            // required={true}
            label={t.label.assignees}
            value={state.assignees}
            items={
              [
                // {
                //   key: Enums.EnumGender.Female,
                //   value: t.label.female,
                // } as PairValue,
              ]
            }
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
        <Grid item xs={12} sm={6}>
          <Custom.TextField
            name="estimatedTime"
            required={true}
            onChange={onChange}
            label={t.label.estimatedTime}
            value={state.estimatedTime}
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Custom.Button submit>{t.action.submit}</Custom.Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
