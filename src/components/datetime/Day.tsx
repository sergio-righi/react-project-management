import { useTheme } from "contexts";
import { Auxiliars } from "helpers";
import type { Item } from "components/datetime/Calendar";
import { Box } from "@mui/material";

type Props = {
  item: Item;
  onClick?: (item: Item) => void;
};

export const Day = (props: Props) => {
  const { theme } = useTheme();
  const { item } = props;
  const handleClick = () => props.onClick && props.onClick(props.item);

  return (
    <Box
      className={Auxiliars.classNames(
        "item",
        item.today && "today",
        item.selected && "selected",
        item.disabled && "disabled"
      )}
      sx={{
        color: item.today ? theme.color.accent.color : theme.palette.font.color,
        borderColor: item.selected
          ? !item.today
            ? theme.palette.font.color
            : theme.color.accent.color
          : "transparent",
      }}
      onClick={handleClick}
    >
      {item.day}
    </Box>
  );
};
