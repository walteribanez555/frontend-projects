import { Injectable } from '@angular/core';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectRepository } from '../../repositories/project.repository';
import { UpdateProjectDto } from '../../dtos/project/update-project.dto';


export interface UpdateProjectsUseCase {
  execute(dto : UpdateProjectDto): Promise<ProjectEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateProjectsService implements UpdateProjectsUseCase {

  constructor(
    private repository : ProjectRepository
  ) { }
  async execute(dto : UpdateProjectDto): Promise<ProjectEntity> {
    return this.repository.updateProject(dto);
  }

}
