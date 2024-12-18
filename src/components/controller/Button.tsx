import React, { useState } from "react";
import { Stack, SxProps } from "@mui/material";
import { Custom } from "components";
import { useTheme } from "contexts";

type Props = {
  sx?: SxProps;
  sxItem?: SxProps;
  multiple?: boolean;
  disabled?: boolean;
  items: Custom.ButtonProps[];
  selected?: (string | number)[] | string;
  onSelect?: (value: any) => void;
  size?: "small" | "medium" | "large";
};

export const Button = ({
  multiple = false,
  disabled = false,
  ...props
}: Props) => {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<(string | number)[] | string>(
    multiple ? props.selected ?? [] : props.selected ?? ""
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    let newSelected;
    const id = String(event.currentTarget.id);
    if (multiple) {
      newSelected = [...selected];
      const index = newSelected.indexOf(id);
      if (index === -1) newSelected.push(id);
      else newSelected.splice(index, 1);
    } else {
      newSelected = selected === id ? props.items[0].id ?? "" : id;
    }
    setSelected(newSelected);
    props.onSelect && props.onSelect(newSelected);
  }

  return (
    <Stack
      direction="row"
      sx={props.sx}
      spacing={theme.component.controller.button.gap}
    >
      {props.items.map((item: Custom.ButtonProps, i: number) => (
        <Custom.Button
          {...item}
          key={i}
          sx={
            {
              ...props.sxItem,
              borderRadius: theme.border.radius,
              borderTopLeftRadius: i === 0 ? theme.border.radius : 0,
              borderTopRightRadius:
                i === props.items.length - 1 ? theme.border.radius : 0,
              borderBottomLeftRadius: i === 0 ? theme.border.radius : 0,
              borderBottomRightRadius:
                i === props.items.length - 1 ? theme.border.radius : 0,
            } as SxProps
          }
          size={props.size}
          disabled={disabled}
          onClick={handleClick}
          selected={
            multiple
              ? selected.indexOf(String(item.id)) !== -1
              : selected === item.id
          }
        />
      ))}
    </Stack>
  );
};
