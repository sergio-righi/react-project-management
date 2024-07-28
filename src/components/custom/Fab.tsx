import React, { forwardRef, useEffect, useState } from "react";
import { Fab as MUIFab, FabProps, Stack, Box } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Validations } from "helpers";

// icons
import { CloseRounded, SvgIconComponent } from "@mui/icons-material";

export type Props = FabProps & {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
  closable?: boolean;
  state?: boolean;
  text?: string;
  size?: "small" | "medium" | "large";
  onStateChange?: (state: boolean) => void;
  children?: React.ReactNode;
};

export const Fab = ({
  closable = false,
  state = false,
  top = false,
  bottom = false,
  right = false,
  left = false,
  onStateChange,
  size = "large",
  text = "",
  ...props
}: Props) => {
  const { theme } = useTheme();

  const [currentState, setCurrentState] = useState<boolean>(state);

  const mr = Validations.hasValue(text) ? theme.spacing.xs : 0;

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setCurrentState((currentState: boolean) => {
      const newState = !currentState;
      onStateChange && onStateChange(newState);
      return newState;
    });
  }

  return (
    <MUIFab
      size={size}
      variant="extended"
      sx={{
        boxShadow: theme.palette.shadow,
        borderRadius: theme.border.radius,
        color: theme.color.accent.text,
        backgroundColor: theme.color.accent.color,
        top: top ? theme.spacing.default : undefined,
        left: left ? theme.spacing.default : undefined,
        right: right ? theme.spacing.default : undefined,
        bottom: bottom ? theme.spacing.default : undefined,
        "&:hover": {
          backgroundColor: theme.color.accent.color,
        },
      }}
      onClick={handleClick}
    >
      <Box sx={{ lineHeight: 1, mr }}>
        {closable && currentState ? <CloseRounded /> : props.children}{" "}
      </Box>
      {text}
    </MUIFab>
  );
};
