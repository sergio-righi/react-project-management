import React from "react";

import { Stack, SxProps } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";

type Props = {
  sx?: SxProps;
  label?: string;
  children: React.ReactNode;
};

export const NavbarItem = (props: Props) => {
  const { theme } = useTheme();

  return (
    <Stack
      sx={props.sx}
      direction="column"
      alignItems="center"
      gap={theme.spacing.sm}
    >
      {React.Children.map(props.children, (child: React.ReactNode) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            sx: {
              color: theme.palette.font.color,
              fontSize: theme.component.navbar.icon,
            },
          } as any);
        }
        return child;
      })}
      {props.label && (
        <Custom.Typography size={theme.font.xs}>
          {props.label}
        </Custom.Typography>
      )}
    </Stack>
  );
};
