import {
  PriorityLow,
  PriorityMedium,
  PriorityHigh,
  PriorityCritical,
} from "assets/images";
import { useTheme } from "contexts";

type Props = {
  value: string;
};

export const Priority = (props: Props) => {
  const { theme } = useTheme();

  return (
    <>
      {props.value === "low" && <PriorityLow fill={theme.palette.font.color} />}
      {props.value === "medium" && (
        <PriorityMedium fill={theme.palette.font.color} />
      )}
      {props.value === "high" && (
        <PriorityHigh fill={theme.palette.font.color} />
      )}
      {props.value === "critical" && (
        <PriorityCritical fill={theme.palette.font.color} />
      )}
    </>
  );
};
