import { ApiResponse } from "types";
import { IState } from "interfaces";
import { Enums } from "utils";
import { Auxiliars } from "helpers";
import { States } from "assets/data";

export interface IStateData {
  states(): Promise<ApiResponse<IState[]>>;
}

export class StateData implements IStateData {

  async states(): Promise<ApiResponse<IState[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: States
    }));
  }
}