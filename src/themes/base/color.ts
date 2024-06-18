/* eslint-disable quotes */
import {
  Color,
  ColorSchema,
  ColorStatus,
} from "themes/interfaces";

export default {
  primary: { color: "#9A9A9A", text: "#ffffff" } as ColorSchema,
  accent: { color: "#25765f", text: "#ffffff" } as ColorSchema, // #5ca368
  // accent: { color: "#12BB6E", text: "#ffffff" } as ColorSchema,
  secondary: { color: "#999999", text: "#ffffff" } as ColorSchema,
  status: {
    info: { color: "#3668c9", text: "#ffffff" } as ColorSchema,
    warning: { color: "#f0cd0f", text: "#404040" } as ColorSchema,
    success: { color: "#38c760", text: "#ffffff" } as ColorSchema,
    error: { color: "#e21d42", text: "#ffffff" } as ColorSchema,
  } as ColorStatus,
  // status: {
  //   info: { color: "#6883BA", text: "#ffffff" } as ColorSchema,
  //   warning: { color: "#F6DB79", text: "#404040" } as ColorSchema,
  //   success: { color: "#78A58A", text: "#ffffff" } as ColorSchema,
  //   error: { color: "#88292F", text: "#ffffff" } as ColorSchema,
  // } as ColorStatus,
  disabled: { color: "#b3b3b3", accent: "#959595" } as ColorSchema,
  overlay: "rgba(0, 0, 0, 0.5)",
  black: "#000000",
  white: "#ffffff"
} as Color;
