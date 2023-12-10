import { EnvironmentData, IEnvironmentData } from "data";
import { IEnvironment } from "interfaces";

export interface IEnvironmentService {
  environments(): Promise<IEnvironment[]>;
}

export class EnvironmentService implements IEnvironmentService {
  environmentData: IEnvironmentData;

  constructor() {
    this.environmentData = new EnvironmentData();
  }

  /**
   * fetch all the environments
   * @returns {IEnvironment[]} a list of environments
   */

  async environments() {
    const { payload } = await this.environmentData.environments();
    return payload ?? [];
  }
}