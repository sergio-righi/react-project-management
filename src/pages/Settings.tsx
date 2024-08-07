import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Common, Input } from "components";
import { useApp, useData, useService, useTheme } from "contexts";
import { ICategory, IFlow, IPriority, IState } from "interfaces";

export const Settings = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const {
    categories,
    getFlows,
    priorities,
    states,
    setCategories,
    setFlows,
    setPriorities,
    setStates,
  } = useData();

  function handleCategoryOnUpdate(value: any) {
    setCategories(value as ICategory[]);
  }

  function handleFlowOnUpdate(value: any) {
    setFlows(value as IFlow[]);
  }

  function handlePriorityOnUpdate(value: any) {
    setPriorities(value as IPriority[]);
  }

  function handleStateOnUpdate(value: any) {
    setStates(value as IState[]);
  }

  return (
    <Common.Page
      header={t.title.settings}
      subheader={t.subtitle.settings}
      control={<></>}
    >
      <Grid container spacing={theme.spacing.sm}>
        <Grid item xs={12} md={3}>
          <Input.List
            label={t.label.category}
            title={t.label.category}
            onChange={handleCategoryOnUpdate}
            value={categories}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Input.List
            sortable
            label={t.label.flow}
            title={t.label.flow}
            onChange={handleFlowOnUpdate}
            value={getFlows()}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Input.List
            label={t.label.priority}
            title={t.label.priority}
            onChange={handlePriorityOnUpdate}
            value={priorities}
          />
        </Grid>
        <Grid item xs={12} md={3}>
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
