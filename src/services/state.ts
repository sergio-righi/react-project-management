import { StateData, IStateData } from "data";
import { IState } from "interfaces";

export interface IStateService {
  states(): Promise<IState[]>;
}

export class StateService implements IStateService {
  stateData: IStateData;

  constructor() {
    this.stateData = new StateData();
  }

  /**
   * fetch all the states
   * @returns {IState[]} a list of states
   */

  async states() {
    const { payload } = await this.stateData.states();
    return payload ?? [];
  }
}