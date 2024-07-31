import { CategoryData, ICategoryData } from "data";
import { ICategory } from "interfaces";
import { PairValue } from "types";

export interface ICategoryService {
  categories(): Promise<ICategory[]>;
  asPairValue(): Promise<PairValue[]>;
}

export class CategoryService implements ICategoryService {
  categoryData: ICategoryData;

  constructor() {
    this.categoryData = new CategoryData();
  }

  /**
   * fetch all the categories
   * @returns {ICategory[]} a list of categories
   */

  async categories() {
    const { payload } = await this.categoryData.categories();
    return payload ?? [];
  }

  /**
   * fetch all the categories as PairValue array
   * @returns {PairValue[]} a list of categories
   */

  async asPairValue() {
    return (await this.categories()).map((item: ICategory) => ({ key: item._id, value: item.name } as PairValue)) as PairValue[];
  }
}