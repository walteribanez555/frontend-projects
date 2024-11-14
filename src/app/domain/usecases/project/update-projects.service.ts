import { Injectable } from '@angular/core';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectRepository } from '../../repositories/project.repository';
import { UpdateProjectDto } from '../../dtos/project/update-project.dto';
import { Result } from '../../types/Result.type';


export interface UpdateProjectsUseCase {
  execute(dto : UpdateProjectDto): Promise<Result<ProjectEntity, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateProjectsService implements UpdateProjectsUseCase {

  constructor(
    private repository : ProjectRepository
  ) { }
  async execute(dto : UpdateProjectDto): Promise<Result<ProjectEntity, string>> {

      const result = await this.repository.updateProject(dto);

      if(!result.isSuccess){
        return result;
      }

      return result

  }

}
