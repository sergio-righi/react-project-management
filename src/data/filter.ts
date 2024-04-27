import { ApiResponse } from "types";
import { IFilter } from "interfaces";
import { Enums } from "utils";
import { Auxiliars } from "helpers";
import { Filters } from "assets/data";

export interface IFilterData {
  filters(): Promise<ApiResponse<IFilter[]>>;
}

export class FilterData implements IFilterData {

  async filters(): Promise<ApiResponse<IFilter[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Filters
    }));
  }
}