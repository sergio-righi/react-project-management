import React from "react";

import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

type Props = {
  children: React.ReactNode;
  onDrop: (item: any) => void;
};

export const Droppable = (props: Props) => {
  const [{ isOver }, drop] = useDrop({
    accept: "DRAGGABLE_COMPONENT",
    drop: (item: any) => props.onDrop(item),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box height="1" ref={drop}>
      {props.children}
    </Box>
  );
};
