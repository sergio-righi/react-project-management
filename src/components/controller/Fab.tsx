import { useEffect, useRef, useState } from "react";
import { Box, FabProps, Stack } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Custom } from "components";

type Props = {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
  state?: boolean;
  children: React.ReactNode;
  items?: React.ReactNode[];
};

export const Fab = ({
  top = false,
  bottom = true,
  right = true,
  left = false,
  state = false,
  ...props
}: Props) => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        textAlign: left ? "left" : "right",
        top: top ? theme.spacing.default : undefined,
        left: left ? theme.spacing.default : undefined,
        right: right ? theme.spacing.default : undefined,
        bottom: bottom ? theme.spacing.default : undefined,
      }}
    >
      {props.items && state && (
        <Stack direction="column" spacing={theme.spacing.sm}>
          {props.items}
        </Stack>
      )}
      <Box
        sx={{
          marginBottom: top ? theme.spacing.sm : undefined,
          marginTop: bottom ? theme.spacing.sm : undefined,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
