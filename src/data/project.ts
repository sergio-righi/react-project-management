import { ApiResponse } from "types";
import { IProject } from "interfaces";
import { Enums, ORM } from "utils";
import { Auxiliars } from "helpers";
import { Projects } from "assets/data";

export interface IProjectData {
  projects(): Promise<ApiResponse<IProject[]>>;
}

export class ProjectData implements IProjectData {

  async projects(): Promise<ApiResponse<IProject[]>> {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Projects.map((item: IProject) => ORM.populateProject(item))
    }));
  }
}