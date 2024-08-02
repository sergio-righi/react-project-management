import React, { useEffect, useState } from "react";

import { Box, Grid, Stack } from "@mui/material";
import { Common, Controller, Custom, Kanban } from "components";
import { useApp, useData, useTheme } from "contexts";
import { IFilter, IFlow, IProject, ITask } from "interfaces";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BoardType } from "types";

export const Board = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const { filters, flows, getBoard, project, projects, setProject } = useData();

  const [board, setBoard] = useState<BoardType[]>([]);

  useEffect(() => setBoard(getBoard()), [getBoard]);

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    const sourceColumnIndex = board.findIndex(
      (item: BoardType) => item.flow._id === sourceId
    );

    if (sourceColumnIndex !== -1) {
      if (sourceId === destinationId) {
        const items = reorder(
          board[sourceColumnIndex].tasks,
          source.index,
          destination.index
        );
        const updatedBoard = [...board] as BoardType[];
        updatedBoard[sourceColumnIndex].tasks = items as ITask[];
        setBoard(updatedBoard);
      } else {
        const destinationColumnIndex = board.findIndex(
          (item: BoardType) => item.flow._id === destinationId
        );
        if (destinationColumnIndex !== -1) {
          const result = move(
            board[sourceColumnIndex].tasks,
            board[destinationColumnIndex].tasks,
            source,
            destination
          );

          const updatedBoard = [...board] as BoardType[];
          updatedBoard[sourceColumnIndex].tasks = result[sourceId];
          updatedBoard[destinationColumnIndex].tasks = result[destinationId];

          setBoard(updatedBoard);
        }
      }
    }
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

    const newItem = destClone[droppableDestination.index] as ITask;
    newItem.flow = flows.find(
      (item: IFlow) => item._id === droppableDestination.droppableId
    ) as IFlow;

    const result = {} as any;
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

  return (
    <Common.Page
      header={t.title.board}
      subheader={"Lorem ipsum dolor sit amet"}
      control={
        <>
          <Stack direction="row" spacing={theme.spacing.sm} alignItems="center">
            <Custom.Typography
              size={theme.font.xs}
              weight={theme.font.medium}
              color={theme.palette.font.accent}
            >
              {t.title.project}
            </Custom.Typography>
            <Controller.Button
              size="small"
              selected={project}
              items={[
                {
                  id: "",
                  children: t.filter.all,
                },
                ...projects.map((item: IProject) => ({
                  id: item._id,
                  children: item.name,
                })),
              ]}
              onSelect={(value: string) => setProject(value)}
            />
          </Stack>
          <Stack direction="row" spacing={theme.spacing.md} alignItems="center">
            <Custom.Typography
              size={theme.font.xs}
              weight={theme.font.medium}
              color={theme.palette.font.accent}
            >
              Filters
            </Custom.Typography>
            <Controller.Button
              size="small"
              selected={""}
              items={[
                {
                  id: "",
                  children: t.filter.all,
                },
                ...filters.map((item: IFilter) => ({
                  id: item._id,
                  children: item.name,
                })),
              ]}
            />
          </Stack>
        </>
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container width="1" height="1" gap={theme.spacing.xs}>
          {board.map((item: BoardType) => {
            return (
              <Grid key={item.flow._id} item xs>
                <Kanban.Board label={item.flow.name}>
                  <Droppable droppableId={item.flow._id}>
                    {(provided: any, snapshot: any) => (
                      <Stack
                        height="1"
                        ref={provided.innerRef}
                        spacing={theme.spacing.md}
                        {...provided.droppableProps}
                        sx={{
                          backgroundColor: snapshot.isDraggingOver
                            ? theme.palette.border
                            : undefined,
                        }}
                      >
                        {item.tasks.map((subitem: ITask, i: number) => {
                          return (
                            <Draggable
                              index={i}
                              key={subitem._id}
                              draggableId={subitem._id}
                            >
                              {(provided: any, snapshot: any) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    userSelect: "none",
                                  }}
                                >
                                  <Kanban.Task elm={subitem} />
                                </Box>
                              )}
                            </Draggable>
                          );
                        })}
                      </Stack>
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
