import { ApiResponse } from "types";
import { IPriority } from "interfaces";
import { Enums } from "utils";
import { Auxiliars } from "helpers";
import { Priorities } from "assets/data";

export interface IPriorityData {
  priorities(): Promise<ApiResponse<IPriority[]>>;
}

export class PriorityData implements IPriorityData {

  async priorities(): Promise<ApiResponse<IPriority[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Priorities
    }));
  }
}