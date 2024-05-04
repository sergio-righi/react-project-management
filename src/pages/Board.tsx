import React, { useEffect, useState } from "react";

import { Box, Grid, Stack } from "@mui/material";
import { Common, Controller, Custom, Kanban } from "components";
import { useApp, useData, useTheme } from "contexts";
import { IFilter, IProject, ITask } from "interfaces";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BoardType } from "types";

export const Board = () => {
  const { t } = useApp();
  const { theme } = useTheme();
  const {
    filters,
    flow,
    flows,
    getBoard,
    getFlow,
    project,
    projects,
    setProject,
  } = useData();

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
      header={t.title.board}
      subheader={getFlow()?.name}
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
          {getBoard().map((item: BoardType) => {
            return (
              <Grid key={item.state._id} item xs>
                <Kanban.Board label={item.state.name}>
                  <Droppable droppableId={item.state._id}>
                    {(provided, snapshot) => (
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
                              {(provided, snapshot) => (
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
