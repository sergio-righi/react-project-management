import { useState, useEffect } from "react";
import { Custom } from "components";
import { useApp, useData, useTheme } from "contexts";
import { useForm } from "hooks";
import { Constants, Enums, ORM } from "utils";
import { Box, Grid, SelectChangeEvent } from "@mui/material";
import { Feedback, PairValue } from "types";
import { DEFAULT_TASK, IComponent, IProject, ITask } from "interfaces";
import { Auxiliars, Conversions, Sanitizes, Validations } from "helpers";

type Props = {
  task: ITask;
  onSubmit?: () => void;
};

export const Task = (props: Props) => {
  const { theme } = useTheme();
  const { setFeedback, t } = useApp();
  const {
    categories,
    flows,
    priorities,
    projects,
    states,
    tasks,
    user,
    users,
    setProjects,
    setTasks,
  } = useData();

  const fromJSON = {
    ...DEFAULT_TASK,
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

  const [components, setComponents] = useState<IComponent[]>([]);

  const [validationState, setValidationState] = useState({
    deadline: validation.deadline.valid,
  });

  const [state, setState] = useState<ITask | any>(fromJSON);
  const { onChange, onDropdownChange, onSubmit } = useForm(
    {},
    undefined,
    undefined,
    updateCallback
  );

  useEffect(() => setState(fromJSON), [props.task]);

  useEffect(() => {
    const project = projects.find(
      (item: IProject) => item._id === state.project._id
    );

    if (project) {
      setComponents(project.components);
    }
  }, [state.project]);

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

  async function handleOnSubmit() {
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
      const currentDate = new Date().toISOString();
      const index = tasks.findIndex((item: ITask) => item._id === state._id);
      if (index !== -1) {
        const updatedTasks = [...tasks] as ITask[];
        const values = {
          ...state,
          ...(state.isCompleted
            ? {
                flow: "",
                completedBy: user?._id || "",
                completedAt: currentDate,
              }
            : {}),
        } as ITask;
        updatedTasks[index] = values;
        setTasks(updatedTasks);
      } else {
        const response = ORM.populateTask(state as ITask);

        const subindex = projects.findIndex(
          (item: IProject) => item._id === (response.project as IProject)._id
        );

        if (subindex !== -1) {
          const updatedProjects = [...projects] as IProject[];

          response._id = Auxiliars.generateObjectId();
          response.number = updatedProjects[subindex].count + 1;

          if (response.isCompleted) {
            response.flow = "";
            response.completedBy = user?._id || "";
            response.completedAt = currentDate;
          }

          setTasks([...tasks, response] as ITask[]);

          updatedProjects[subindex].count += 1;
          setProjects(updatedProjects);
        }
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
    <Box component="form">
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
        <Grid item xs={12}>
          <Custom.TextField
            multiline
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
            value={state.category._id}
            items={Conversions.toPairValue(categories)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="priority"
            // required={true}
            label={t.label.priority}
            value={state.priority._id}
            items={Conversions.toPairValue(priorities)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="state"
            // required={true}
            label={t.label.state}
            value={state.state._id}
            items={Conversions.toPairValue(states)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="flow"
            // required={true}
            withNone={true}
            label={t.label.flow}
            value={state.flow._id}
            items={Conversions.toPairValue(flows)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="project"
            // required={true}
            label={t.label.project}
            value={state.project._id}
            items={Conversions.toPairValue(projects)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Custom.Select
            name="component"
            // required={true}
            label={t.label.component}
            value={state.component._id}
            items={Conversions.toPairValue(components)}
            onDropdownChange={onDropdownChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Custom.Select
            multiple
            name="assignees"
            // required={true}
            label={t.label.assignees}
            value={state.assignees._id}
            items={Conversions.toPairValue(users)}
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
        <Grid item xs={12} sm={6}>
          <Custom.TextField
            name="estimatedTime"
            onChange={onChange}
            label={t.label.estimatedTime}
            value={state.estimatedTime}
          />
        </Grid>
        <Grid item xs={12}>
          <Custom.Checkbox
            name="isCompleted"
            onChange={onChange}
            label={t.label.completed}
            checked={state.isCompleted}
            value={state.isCompleted}
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
