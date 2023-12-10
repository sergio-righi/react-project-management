import { FlowData, IFlowData } from "data";
import { IFlow } from "interfaces";

export interface IFlowService {
  flows(): Promise<IFlow[]>;
}

export class FlowService implements IFlowService {
  flowData: IFlowData;

  constructor() {
    this.flowData = new FlowData();
  }

  /**
   * fetch all the flows
   * @returns {IFlow[]} a list of flows
   */

  async flows() {
    const { payload } = await this.flowData.flows();
    return payload ?? [];
  }
}