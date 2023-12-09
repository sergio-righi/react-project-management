import {
  CategoryImprovement,
  CategoryIssue,
  CategoryMajor,
  CategoryNewFeature,
  CategoryPoC,
  CategoryStory,
} from "assets/images";

type Props = {
  value: string;
};

export const Category = (props: Props) => {
  return (
    <>
      {props.value === "improvement" && <CategoryImprovement width="20" />}
      {props.value === "issue" && <CategoryIssue width="20" />}
      {props.value === "major" && <CategoryMajor width="20" />}
      {props.value === "new_feature" && <CategoryNewFeature width="20" />}
      {props.value === "poc" && <CategoryPoC width="20" />}
      {props.value === "story" && <CategoryStory width="20" />}
    </>
  );
};
