import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { StatusAction } from '../../enums/StatusAction.enum';
import { CreateProjectService } from '../../../domain/usecases/project/create-project.service';
import { GetProjectsService } from '../../../domain/usecases/project/get-projects.service';
import { UpdateProjectsService } from '../../../domain/usecases/project/update-projects.service';
import { DeleteProjectService } from '../../../domain/usecases/project/delete-project.service';
import { ProjectActions } from './project.actions';
// import { ProjectAction } from './project.actions';

export interface ProjectStateModel {
  projects : ProjectEntity[];
  status :StatusAction;
}

@State<ProjectStateModel>({
  name: 'project',
  defaults: {
    projects : [],
    status : StatusAction.INITIAL
  }
})
@Injectable()
export class ProjectState {

  private createProjectUseCase = inject(CreateProjectService);
  private getProjectsUseCase = inject(GetProjectsService);
  private updateProjectUseCase = inject(UpdateProjectsService);
  private deleteProjectUseCase = inject(DeleteProjectService);



  @Selector()
  static getState(state: ProjectStateModel) {
    return state;
  }

  @Action(ProjectActions.Create)
  async add(
    ctx : StateContext<ProjectStateModel>,
    action : ProjectActions.Create

  ) {

    ctx.patchState({
      status : StatusAction.LOADING
    });

    action.callback?.onLoading ? action.callback.onLoading() : null;

    try{

        const result = await this.createProjectUseCase.execute(action.dto);

        if(!result.isSuccess){
          action.callback?.onError ? action.callback.onError(result.error) : null;
          return;
        }

        ctx.patchState({
          projects : [...ctx.getState().projects, result.value],
          status : StatusAction.INITIAL
        });

        action.callback?.onResult ? action.callback.onResult(result.value) : null;
      }catch(e : any){
        action.callback?.onError ? action.callback.onError(e) : null;
      }

    action.callback?.onComplete ? action.callback.onComplete() : null;


  }


  @Action(ProjectActions.GetAll)
  async getAll(
    ctx : StateContext<ProjectStateModel>,
    action : ProjectActions.GetAll
  ) {

    ctx.patchState({
      status : StatusAction.LOADING
    });

    action.callback?.onLoading ? action.callback.onLoading() : null;

    try{

        const result = await this.getProjectsUseCase.execute();

        if(!result.isSuccess){
          action.callback?.onError ? action.callback.onError(result.error) : null;
          return;
        }

        ctx.patchState({
          projects : result.value,
          status : StatusAction.INITIAL
        });

        action.callback?.onResult ? action.callback.onResult(result.value) : null;

    }catch(e : any){
      action.callback?.onError ? action.callback.onError(e) : null;
    }

    action.callback?.onComplete ? action.callback.onComplete() : null;
  }

  @Action(ProjectActions.Update)
  async update(
    ctx : StateContext<ProjectStateModel>,
    action : ProjectActions.Update
  ) {

    ctx.patchState({
      status : StatusAction.LOADING
    });

    try {

        const result = await this.updateProjectUseCase.execute(action.dto);

        if(!result.isSuccess){
          action.callback?.onError ? action.callback.onError(result.error) : null;
          return;
        }

        const projects = ctx.getState().projects.map(project => {
          if(project.id === result.value.id){
            return result.value;
          }
          return project;
        });

        ctx.patchState({
          projects : projects,
          status : StatusAction.INITIAL
        });

        action.callback?.onResult ? action.callback.onResult(result.value) : null;
    }catch ( e : any) {
      action.callback?.onError ? action.callback.onError(e) : null;
    }

    action.callback?.onComplete ? action.callback.onComplete() : null;


  }


  @Action(ProjectActions.Delete)
  async delete(
    ctx : StateContext<ProjectStateModel>,
    action : ProjectActions.Delete
  ) {

    ctx.patchState({
      status : StatusAction.LOADING
    });

    try {

        const result = await this.deleteProjectUseCase.execute(action.id);

        if(!result.isSuccess){
          action.callback?.onError ? action.callback.onError(result.error) : null;
          return;
        }

        const projects = ctx.getState().projects.filter(project => project.id !== action.id);

        ctx.patchState({
          projects : projects,
          status : StatusAction.INITIAL
        });

        action.callback?.onResult ? action.callback.onResult(result.value) : null;
    }catch(e : any) {
      action.callback?.onError ? action.callback.onError(e) : null;
    }

    action.callback?.onComplete ? action.callback.onComplete() : null;
  }
}
