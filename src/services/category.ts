import { CategoryData, ICategoryData } from "data";
import { ICategory } from "interfaces";

export interface ICategoryService {
  categories(): Promise<ICategory[]>;
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
}