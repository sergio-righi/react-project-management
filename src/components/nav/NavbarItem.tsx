import React from "react";

import { Box, Stack, SxProps } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  to?: string;
  sx?: SxProps;
  label?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const NavbarItem = (props: Props) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    props.to && navigate(props.to);
    props.onClick && props.onClick();
  }

  const isActive = props.to && location.pathname.match(props.to);

  return (
    <Box
      width="1"
      py={theme.spacing.md}
      onClick={handleClick}
      sx={{ ...props.sx, cursor: isActive ? undefined : "pointer" }}
      bgcolor={isActive ? theme.palette.background.color : undefined}
    >
      <Stack direction="column" alignItems="center" gap={theme.spacing.sm}>
        {React.Children.map(props.children, (child: React.ReactNode) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              sx: {
                fontSize: theme.component.navbar.icon,
                color: isActive
                  ? theme.color.accent.color
                  : theme.palette.font.color,
              },
            } as any);
          }
          return child;
        })}
        {props.label && (
          <Custom.Typography
            size={theme.font.xxs}
            color={isActive ? theme.color.accent.color : undefined}
          >
            {props.label}
          </Custom.Typography>
        )}
      </Stack>
    </Box>
  );
};
