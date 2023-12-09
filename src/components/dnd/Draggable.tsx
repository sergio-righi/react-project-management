import React from "react";

import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

type Props = {
  children: React.ReactNode;
};

export const Draggable = (props: Props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "DRAGGABLE_COMPONENT",
    item: props.children,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      style={{
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {props.children}
    </Box>
  );
};
