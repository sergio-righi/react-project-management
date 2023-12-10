import { ApiResponse } from "types";
import { IFlow } from "interfaces";
import { Enums, ORM } from "utils";
import { Auxiliars } from "helpers";
import { Flows } from "assets/data";

export interface IFlowData {
  flows(): Promise<ApiResponse<IFlow[]>>;
}

export class FlowData implements IFlowData {

  async flows(): Promise<ApiResponse<IFlow[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Flows.map((item: IFlow) => ORM.populateFlow(item))
    }));
  }
}