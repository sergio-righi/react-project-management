import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Common, Input } from "components";
import { useApp, useData, useService, useTheme } from "contexts";
import { ICategory, IPriority, IState } from "interfaces";

export const Settings = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const {
    categories,
    priorities,
    states,
    setCategories,
    setPriorities,
    setStates,
  } = useData();

  function handleCategoryOnUpdate(value: any) {
    console.log(value);
    setCategories(value as ICategory[]);
  }

  function handlePriorityOnUpdate(value: any) {
    setPriorities(value as IPriority[]);
  }

  function handleStateOnUpdate(value: any) {
    setStates(value as IState[]);
  }

  return (
    <Common.Page
      header="Settings"
      subheader="Lorem ipsum dolor sit amet"
      control={<></>}
    >
      <Grid container spacing={theme.spacing.sm}>
        <Grid item xs={12} sm={4}>
          <Input.List
            label={t.label.category}
            title={t.label.category}
            onChange={handleCategoryOnUpdate}
            value={categories}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input.List
            label={t.label.priority}
            title={t.label.priority}
            onChange={handlePriorityOnUpdate}
            value={priorities}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input.List
            label={t.label.state}
            title={t.label.state}
            onChange={handleStateOnUpdate}
            value={states}
          />
        </Grid>
      </Grid>
    </Common.Page>
  );
};
