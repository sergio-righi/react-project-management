import { PriorityData, IPriorityData } from "data";
import { IPriority } from "interfaces";
import { PairValue } from "types";

export interface IPriorityService {
  priorities(): Promise<IPriority[]>;
  asPairValue(): Promise<PairValue[]>;
}

export class PriorityService implements IPriorityService {
  priorityData: IPriorityData;

  constructor() {
    this.priorityData = new PriorityData();
  }

  /**
   * fetch all the priorities
   * @returns {IPriority[]} a list of priorities
   */

  async priorities() {
    const { payload } = await this.priorityData.priorities();
    return payload ?? [];
  }

  /**
   * fetch all the priorities as PairValue array
   * @returns {PairValue[]} a list of priorities
   */

  async asPairValue() {
    return (await this.priorities()).map((item: IPriority) => ({ key: item._id, value: item.name } as PairValue)) as PairValue[];
  }
}