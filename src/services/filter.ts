import { FilterData, IFilterData } from "data";
import { IFilter } from "interfaces";

export interface IFilterService {
  filters(): Promise<IFilter[]>;
}

export class FilterService implements IFilterService {
  filterData: IFilterData;

  constructor() {
    this.filterData = new FilterData();
  }

  /**
   * fetch all the filters
   * @returns {IFilter[]} a list of filters
   */

  async filters() {
    const { payload } = await this.filterData.filters();
    return payload ?? [];
  }
}