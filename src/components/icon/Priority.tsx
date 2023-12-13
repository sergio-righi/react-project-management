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
      {props.value === "low" && (
        <PriorityLow fill={theme.color.status.info.color} />
      )}
      {props.value === "medium" && (
        <PriorityMedium fill={theme.color.status.success.color} />
      )}
      {props.value === "high" && (
        <PriorityHigh fill={theme.color.status.warning.color} />
      )}
      {props.value === "critical" && (
        <PriorityCritical fill={theme.color.status.error.color} />
      )}
    </>
  );
};
