import { PriorityData, IPriorityData } from "data";
import { IPriority } from "interfaces";

export interface IPriorityService {
  priorities(): Promise<IPriority[]>;
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
}