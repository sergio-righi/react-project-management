import { ProjectData, IProjectData } from "data";
import { IProject } from "interfaces";

export interface IProjectService {
  projects(): Promise<IProject[]>;
  find(id: string): Promise<IProject | null>;
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
   * fetch a project by id
   * @param {string} id the project id
   * @returns {ITask} a project if found
   */

  async find(id: string) {
    const { payload } = await this.projectData.find(id);
    return payload;
  }
}