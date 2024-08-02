import { ApiResponse } from "types";
import { IUser } from "interfaces";
import { Enums, ORM } from "utils";
import { Auxiliars } from "helpers";
import { Users } from "assets/data";

export interface IUserData {
  users(): Promise<ApiResponse<IUser[]>>;
}

export class UserData implements IUserData {

  async users(): Promise<ApiResponse<IUser[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Users
    }));
  }
}