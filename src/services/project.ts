import { ProjectData, IProjectData } from "data";
import { IComponent, IProject } from "interfaces";
import { PairValue } from "types";

export interface IProjectService {
  projects(): Promise<IProject[]>;
  asPairValue(): Promise<PairValue[]>;
  find(id: string): Promise<IProject | null>;
  components(id: string): Promise<IComponent[]>;
  componentsAsPairValue(id: string): Promise<PairValue[]>;
}

export class ProjectService implements IProjectService {
  projectData: IProjectData;

  constructor() {
    this.projectData = new ProjectData();
  }

  /**
   * fetch all the projects
   * @returns {IProject[]} a list of projects
   */

  async projects() {
    const { payload } = await this.projectData.projects();
    return payload ?? [];
  }

  /**
   * fetch all the projects as PairValue array
   * @returns {PairValue[]} a list of projects
   */

  async asPairValue() {
    return (await this.projects()).map((item: IProject) => ({ key: item._id, value: item.name } as PairValue)) as PairValue[];
  }

  /**
   * fetch a project by id
   * @param {string} id the project id
   * @returns {IProject} a project if found
   */

  async find(id: string) {
    const { payload } = await this.projectData.find(id);
    return payload;
  }

  /**
   * fetch the components of a project
   * @param {string} id the project id
   * @returns {IComponent[]} a list of components
   */

  async components(id: string) {
    const project = await this.find(id);
    return (project ? project.components : []) as IComponent[];
  }

  /**
   * fetch all the components as PairValue array
   * @param {string} id the project id
   * @returns {PairValue[]} a list of components
   */

  async componentsAsPairValue(id: string) {
    return (await this.components(id)).map((item: IComponent) => ({ key: item._id, value: item.name } as PairValue)) as PairValue[];
  }
}