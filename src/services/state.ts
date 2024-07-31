import { StateData, IStateData } from "data";
import { IState } from "interfaces";
import { PairValue } from "types";

export interface IStateService {
  states(): Promise<IState[]>;
  asPairValue(): Promise<PairValue[]>;
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

  /**
   * fetch all the states as PairValue array
   * @returns {PairValue[]} a list of states
   */

  async asPairValue() {
    return (await this.states()).map((item: IState) => ({ key: item._id, value: item.name } as PairValue)) as PairValue[];
  }
}