import React, { useEffect, useState } from "react";

import { Box, Grid, Stack } from "@mui/material";
import { Custom, Kanban } from "components";
import { useApp, useService, useTheme } from "contexts";
import { ITask } from "interfaces";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const Board = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { task } = useService();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [board, setBoard] = useState([[], [], [], [], []]);

  // TODO : retrieve from the database
  const states = ["To do", "Analysis", "In Progress", "Validation", "Done"];

  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    const tasks = await task.tasks();
    setTasks(tasks);

    const newState: any = [
      [...tasks],
      [...tasks],
      [...tasks],
      [...tasks],
      [...tasks],
    ];

    setBoard(newState);
  }

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // const sInd = +source.droppableId;
    // const dInd = +destination.droppableId;

    // if (sInd === dInd) {
    //   const items = reorder(board[sInd], source.index, destination.index);
    //   const newState = [...board] as any;
    //   newState[sInd] = items;
    //   setBoard(newState);
    // } else {
    //   const result = move(board[sInd], board[dInd], source, destination);
    //   const newState = [...board];
    //   newState[sInd] = result[sInd];
    //   newState[dInd] = result[dInd];

    //   setBoard(newState.filter((group: any) => group.length));
    // }
  }

  function reorder(list: any, startIndex: any, endIndex: any) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function move(
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any
  ) {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {} as any;
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

  return (
    <Stack direction="column" width="1" flex="1">
      <Box component="header" width="1" p={theme.spacing.md}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="column" gap={theme.spacing.xxs}>
            <Custom.Typography
              size={theme.font.xs}
              color={theme.palette.font.accent}
            >
              Flow Name Placeholder
            </Custom.Typography>
            <Custom.Typography size={theme.font.lg}>
              Project Name Placeholder
            </Custom.Typography>
          </Stack>
          <Stack direction="row" spacing={theme.spacing.lg}>
            <Stack direction="row" spacing={theme.spacing.md}>
              <Custom.Button sx={{ backgroundColor: "#753535" }}>
                All
              </Custom.Button>
              <Custom.Button sx={{ backgroundColor: "#753535" }}>
                Project ABC
              </Custom.Button>
            </Stack>
            <Stack direction="row" spacing={theme.spacing.md}>
              <Custom.Button sx={{ backgroundColor: "#357556" }}>
                All
              </Custom.Button>
              <Custom.Button sx={{ backgroundColor: "#357556" }}>
                My Issues
              </Custom.Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Box
        flex="1"
        width="1"
        component="main"
        p={theme.spacing.md}
        sx={{ overflowY: "auto" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container width="1" height="1" gap={theme.spacing.md}>
            {states.map((item: string, i: number) => {
              return (
                <Grid key={i} item xs>
                  <Kanban.Board label={item}>
                    <Droppable droppableId={item}>
                      {(provided, snapshot) => (
                        <Box
                          height="1"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          sx={{
                            backgroundColor: snapshot.isDraggingOver
                              ? theme.palette.border
                              : undefined,
                          }}
                        >
                          <Draggable
                            index={i}
                            key={i.toString()}
                            draggableId={i.toString()}
                          >
                            {(provided, snapshot) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  userSelect: "none",
                                }}
                              >
                                <Kanban.Task
                                  elm={{ _id: i.toString() } as ITask}
                                />
                              </Box>
                            )}
                          </Draggable>
                        </Box>
                      )}
                    </Droppable>
                  </Kanban.Board>
                </Grid>
              );
            })}
          </Grid>
        </DragDropContext>
      </Box>
    </Stack>
  );
};
