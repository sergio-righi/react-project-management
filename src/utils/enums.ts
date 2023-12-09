
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

export {
  EnumTheme,
  EnumResponse,
  EnumFeedback,
  EnumValidation
}