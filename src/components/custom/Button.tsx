import React from "react";
import { Button as MUIButton, ButtonProps, SxProps } from "@mui/material";
import { useTheme } from "contexts";
import { Auxiliars } from "helpers";

export type Props = ButtonProps & {
  sx?: any;
  text?: boolean;
  submit?: boolean;
  tabIndex?: number;
  selected?: boolean;
  secondary?: boolean;
  children: React.ReactNode | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({
  text = false,
  submit = false,
  secondary = false,
  ...props
}: Props) => {
  const { theme } = useTheme();
  const accentColor = props.sx?.backgroundColor ?? theme.color.accent.color;

  const backgroundColor: string = props.selected
    ? theme.color.accent.color
    : !props.selected
    ? theme.palette.theme
    : props.sx && "backgroundColor" in props.sx
    ? String(props.sx.backgroundColor)
    : secondary || text
    ? "transparent"
    : accentColor;

  const stylesheet = {
    backgroundColor: backgroundColor,
    color: secondary || text ? accentColor : Auxiliars.getContrast(accentColor),
  };

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    props.onClick && props.onClick(event);
  }

  return (
    <MUIButton
      {...props}
      disableElevation
      tabIndex={props.tabIndex}
      variant={secondary ? "outlined" : text ? "text" : "contained"}
      sx={{
        ...stylesheet,
        textTransform: "capitalize",
        borderRadius: theme.border.radius,
        borderColor: secondary ? accentColor : null,
        "&:hover": {
          opacity: 0.8,
          color:
            secondary || text
              ? accentColor
              : Auxiliars.getContrast(accentColor),
          backgroundColor: secondary || text ? "transparent" : accentColor,
          borderColor: accentColor,
        },
        ...props.sx,
      }}
      onClick={handleClick}
      type={submit ? "submit" : "button"}
    >
      {props.children}
    </MUIButton>
  );
};
