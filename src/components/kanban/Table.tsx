import { Grid, Stack } from "@mui/material";
import { Custom, Kanban, Placeholder } from "components";
import { useApp, useTheme } from "contexts";
import { ITask } from "interfaces";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type Props = {
  id: string;
  elms: ITask[];
  title: string;
};

export const Table = (props: Props) => {
  const { theme } = useTheme();
  const { locale, t } = useApp();

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
  }

  return (
    <Stack
      direction="column"
      p={theme.spacing.md}
      spacing={theme.spacing.sm}
      borderRadius={theme.border.radius}
      bgcolor={theme.palette.background.accent}
    >
      <Stack
        direction="row"
        alignItems="center"
        px={theme.spacing.sm}
        justifyContent="space-between"
      >
        <Custom.Typography size={theme.font.sm} weight={theme.font.bold}>
          {props.title}
        </Custom.Typography>
        <Custom.Typography size={theme.font.sm} weight={theme.font.normal}>
          ({props.elms.length} {t.label.task.toLowerCase()})
        </Custom.Typography>
      </Stack>
      <DragDropContext onDragEnd={onDragEnd}>
        {props.elms.length > 0 && (
          <Droppable droppableId={props.id}>
            {(provided, snapshot) => (
              <Grid
                container
                width="1"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.elms.map((item: ITask, i: number) => {
                  return (
                    <Draggable index={i} key={item._id} draggableId={item._id}>
                      {(provided, snapshot) => (
                        <Grid
                          key={item._id}
                          item
                          xs={12}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Kanban.Row elm={item} />
                        </Grid>
                      )}
                    </Draggable>
                  );
                })}
              </Grid>
            )}
          </Droppable>
        )}
      </DragDropContext>
      {props.elms.length === 0 && <Placeholder.NoRecord />}
    </Stack>
  );
};
