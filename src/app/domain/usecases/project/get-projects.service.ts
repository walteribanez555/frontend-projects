import { Injectable } from '@angular/core';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectRepository } from '../../repositories/project.repository';


export interface GetProjectsUseCase {
  execute(): Promise<ProjectEntity[]>;
}


@Injectable({
  providedIn: 'root'
})
export class GetProjectsService implements GetProjectsUseCase {

  constructor(
    private repository : ProjectRepository
  ) { }
  async execute(): Promise<ProjectEntity[]> {
    return this.repository.getProjects();
  }

}
