import type { Item } from "components/datetime/Calendar";
import { Day } from "components/datetime/Day";
import { Box } from "@mui/material";

type Props = {
  weeks: Item[];
  onClick: (item: Item) => void;
};

export const Week = (props: Props) => {
  const handleClick = (item: Item) => props.onClick && props.onClick(item);

  return (
    <Box className="week">
      {props.weeks.map((item: Item, i: number) => {
        return <Day key={i} item={item} onClick={() => handleClick(item)} />;
      })}
    </Box>
  );
};
