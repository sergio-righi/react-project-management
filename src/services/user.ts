import { UserData, IUserData } from "data";
import { IUser } from "interfaces";
import { PairValue } from "types";

export interface IUserService {
  users(): Promise<IUser[]>;
  asPairValue(): Promise<PairValue[]>;
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

  /**
   * fetch all the users as PairValue array
   * @returns {PairValue[]} a list of users
   */

  async asPairValue() {
    return (await this.users()).map((item: IUser) => ({ key: item._id, value: item.name } as PairValue)) as PairValue[];
  }
}