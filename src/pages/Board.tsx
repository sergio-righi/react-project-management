import React, { useEffect, useState } from "react";

import { Box, Grid, Stack } from "@mui/material";
import { Common, Controller, Custom, Kanban } from "components";
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
  }, []);

  async function fetchData() {
    const tasks = await task.tasks();
    console.log(tasks);
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
    <Common.Page
      header="All Projects"
      subheader="Flow Name Placeholder"
      control={
        <>
          <Stack direction="row" spacing={theme.spacing.sm} alignItems="center">
            <Custom.Typography
              size={theme.font.xs}
              weight={theme.font.medium}
              color={theme.palette.font.accent}
            >
              Projects
            </Custom.Typography>
            <Controller.Button
              size="small"
              selected={["2"]}
              items={[
                {
                  id: "1",
                  children: "All",
                },
                {
                  id: "2",
                  children: "ABC",
                },
                {
                  id: "3",
                  children: "XYZ",
                },
              ]}
            />
          </Stack>
          <Stack direction="row" spacing={theme.spacing.md} alignItems="center">
            <Custom.Typography
              size={theme.font.xs}
              weight={theme.font.medium}
              color={theme.palette.font.accent}
            >
              Tasks
            </Custom.Typography>
            <Controller.Button
              size="small"
              selected={["1"]}
              items={[
                {
                  id: "1",
                  children: "All",
                },
                {
                  id: "2",
                  children: "Mine",
                },
              ]}
            />
          </Stack>
        </>
      }
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
    </Common.Page>
  );
};
