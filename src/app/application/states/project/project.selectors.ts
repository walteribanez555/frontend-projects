import { createPropertySelectors, createSelector } from "@ngxs/store";
import { ProjectState, ProjectStateModel } from "./project.state";


export class ProjectSelectors{

  static getSlices = createPropertySelectors<ProjectStateModel>(ProjectState);


  static getProjects = createSelector(
    [this.getSlices.projects],
    (projects) => projects
  )

  static getStatus = createSelector(
    [this.getSlices.status],
    (status) => status
  )




}
