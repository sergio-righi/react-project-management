import {
  Box,
  IconButton as MUIIconButton,
  IconButtonProps,
  Stack,
} from "@mui/material";
import { useTheme } from "contexts";
import { Custom } from "components";

type Props = IconButtonProps & {
  label?: string;
  outlined?: boolean;
  iconColor?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const IconButton = ({
  label,
  outlined = false,
  iconColor,
  ...props
}: Props) => {
  const { theme } = useTheme();

  return <MUIIconButton {...props}>{props.children}</MUIIconButton>;
};
