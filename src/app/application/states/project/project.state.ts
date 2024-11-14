import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ProjectAction } from './project.actions';

export interface ProjectStateModel {
  items: string[];
}

@State<ProjectStateModel>({
  name: 'project',
  defaults: {
    items: []
  }
})
@Injectable()
export class ProjectState {

  @Selector()
  static getState(state: ProjectStateModel) {
    return state;
  }

  @Action(ProjectAction)
  add(ctx: StateContext<ProjectStateModel>, { payload }: ProjectAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
