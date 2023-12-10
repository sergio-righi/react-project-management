import { ApiResponse } from "types";
import { ICategory } from "interfaces";
import { Enums } from "utils";
import { Auxiliars } from "helpers";
import { Categories } from "assets/data";

export interface ICategoryData {
  categories(): Promise<ApiResponse<ICategory[]>>;
}

export class CategoryData implements ICategoryData {

  async categories(): Promise<ApiResponse<ICategory[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Categories
    }));
  }
}