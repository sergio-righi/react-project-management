import { ApiResponse } from "types";
import { IEnvironment } from "interfaces";
import { Enums } from "utils";
import { Auxiliars } from "helpers";
import { Environments } from "assets/data";

export interface IEnvironmentData {
  environments(): Promise<ApiResponse<IEnvironment[]>>;
}

export class EnvironmentData implements IEnvironmentData {

  async environments(): Promise<ApiResponse<IEnvironment[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Environments
    }));
  }
}