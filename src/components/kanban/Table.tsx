import { Grid, Stack } from "@mui/material";
import { Custom, Kanban, Placeholder } from "components";
import { useApp, useTheme } from "contexts";
import { ITask } from "interfaces";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

type Props = {
  id: string;
  items: ITask[];
  title: string;
};

export const Table = (props: Props) => {
  const { theme } = useTheme();
  const { locale, t } = useApp();

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => setTasks(props.items), [props.items]);

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const items = reorder(tasks, source.index, destination.index) as ITask[];

    setTasks(items);
  }

  function reorder(list: any, startIndex: any, endIndex: any) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
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
          ({tasks.length} {t.label.task.toLowerCase()})
        </Custom.Typography>
      </Stack>
      <DragDropContext onDragEnd={onDragEnd}>
        {tasks.length > 0 && (
          <Droppable droppableId={props.id}>
            {(provided: any, snapshot: any) => (
              <Grid
                container
                width="1"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((item: ITask, i: number) => {
                  return (
                    <Draggable index={i} key={item._id} draggableId={item._id}>
                      {(provided: any, snapshot: any) => (
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
      {tasks.length === 0 && <Placeholder.NoRecord />}
    </Stack>
  );
};
