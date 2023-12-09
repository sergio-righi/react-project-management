import {
  PriorityLow,
  PriorityMedium,
  PriorityHigh,
  PriorityCritical,
} from "assets/images";

type Props = {
  value: string;
};

export const Priority = (props: Props) => {
  return (
    <>
      {props.value === "low" && <PriorityLow />}
      {props.value === "medium" && <PriorityMedium />}
      {props.value === "high" && <PriorityHigh />}
      {props.value === "critical" && <PriorityCritical />}
    </>
  );
};
