import { UserData, IUserData } from "data";
import { IUser } from "interfaces";

export interface IUserService {
  users(): Promise<IUser[]>;
}

export class UserService implements IUserService {
  userData: IUserData;

  constructor() {
    this.userData = new UserData();
  }

  /**
   * fetch all the users
   * @returns {IUser[]} a list of users
   */

  async users() {
    const { payload } = await this.userData.users();
    return payload ?? [];
  }
}