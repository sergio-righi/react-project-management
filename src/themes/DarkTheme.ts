/* eslint-disable quotes */
import type { ColorFont, ColorSchema, Palette, Theme } from "themes/interfaces";
import { BaseBorder, BaseColor, BaseComponent, BaseFont, BaseSpacing } from "themes/base";
import { Enums } from "utils";

const theme: Theme = {
  id: Enums.EnumTheme.Light,
  font: BaseFont,
  color: BaseColor,
  palette: {
    theme: "#303030",
    border: "#DDDDDD",
    shadow: "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
    input: { color: "#F5F5F5", accent: "#DBDBDB" } as ColorSchema,
    font: { color: "#FFFFFF", accent: "#BDBDBD" } as ColorFont,
    background: { color: "#353535", accent: "#FFFFFF", textAccent: "#FFFFFF" } as ColorSchema,
  } as Palette,
  border: BaseBorder,
  spacing: BaseSpacing,
  component: BaseComponent,
};

export const Dark = theme;
