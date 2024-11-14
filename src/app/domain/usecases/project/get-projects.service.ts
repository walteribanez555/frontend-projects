import { Injectable } from '@angular/core';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectRepository } from '../../repositories/project.repository';
import { Result } from '../../types/Result.type';


export interface GetProjectsUseCase {
  execute(): Promise<Result<ProjectEntity[], string>>;
}


@Injectable({
  providedIn: 'root'
})
export class GetProjectsService implements GetProjectsUseCase {

  constructor(
    private repository : ProjectRepository
  ) { }
  async execute(): Promise<Result<ProjectEntity[], string>> {

    const result = await this.repository.getProjects();

    if(!result.isSuccess){
      return result;
    }

    return result;
  }

}
