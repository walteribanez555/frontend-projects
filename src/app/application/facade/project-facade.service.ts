import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProjectSelectors } from '../states/project/project.selectors';
import { CreateProjectDto } from '../../domain/dtos/project/create-project.dto';
import { StateCallback } from '../interfaces/StateCallback.interface';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectActions } from '../states/project/project.actions';
import { UpdateProjectDto } from '../../domain/dtos/project/update-project.dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectFacadeService {


  private _store = inject(Store);

  readonly projects = this._store.selectSignal(ProjectSelectors.getProjects);

  readonly status = this._store.selectSignal(ProjectSelectors.getStatus);

  constructor() { }


  create( dto : CreateProjectDto, callback? : StateCallback<ProjectEntity, string>) {
    this._store.dispatch(new ProjectActions.Create(dto, callback));
  }

  update(dto : UpdateProjectDto, callback? : StateCallback<ProjectEntity, string>){
    this._store.dispatch(new ProjectActions.Update(dto, callback));
  }

  delete(id : number, callback? : StateCallback<ProjectEntity, string>){
    this._store.dispatch(new ProjectActions.Delete(id, callback));
  }

  getAll(callback? : StateCallback<ProjectEntity[], string>){
    this._store.dispatch(new ProjectActions.GetAll(callback));
  }

}
