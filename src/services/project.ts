import { ProjectData, IProjectData } from "data";
import { IProject } from "interfaces";

export interface IProjectService {
  projects(): Promise<IProject[]>;
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
}