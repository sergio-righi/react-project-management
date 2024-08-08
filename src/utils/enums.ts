
enum EnumTheme {
  Light = 1,
  Dark = 2,
}

enum EnumFeedback {
  Success = "success",
  Error = "error",
  Info = "info"
}

enum EnumValidation {
  Required = "required",
  IsGraterThan = "isGraterThan",
  IsLessThan = "isLessThan",
  IsEquals = "isEquals",
  MinLength = "minLength",
  Function = "function",
  Regex = "regex"
}

enum EnumResponse {
  Success = 200,
  Error = 500,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  None = 0,
}

enum EnumColor {
  LightGray = "#9EADBD",
  Gray = "#3B4856",
  LightBlue = "#68A2D2",
  Blue = "#009CF9",
  DarkBlue = "#2D6E9B",
  Indigo = "#3947ac",
  Raven = "#777395",
  Lavander = "#9D9DFF",
  Purple = "#5f257f",
  Magenta = "#7f255f",
  Fuschia = "#955572",
  LightPink = "#FFBDE7",
  Pink = "#FD85B0",
  DarkPink = "#C14F7B",
  Rose = "#FFC0B6",
  Geraldine = "#FF7C8D",
  Red = "#BD3E37",
  DarkRed = "#640000",
  Cyan = "#95E4C9",
  Turquoise = "#00CDCB",
  Lime = "#9FB456",
  Green = "#01994E",
  DarkGreen = "#2E7730",
  Yellow = "#7f7f25",
  Eggshell = "#F3EED9",
  Tacao = "#DEB887",
  Brown = "#A46F5E",
  DarkBrown = "#57423F",
  Orange = "#FF8256",
  DarkOrange = "#E96C14",
}

enum EnumModalType {
  ProjectForm = "project_form",
  TaskForm = "task_form",
  ComponentList = "component_list",
  ComponentForm = "component_form",
}

export {
  EnumColor,
  EnumTheme,
  EnumResponse,
  EnumFeedback,
  EnumModalType,
  EnumValidation
}