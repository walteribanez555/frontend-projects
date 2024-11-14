import { Injectable } from '@angular/core';
import { CreateProjectDto } from '../../dtos/project/create-project.dto';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectRepository } from '../../repositories/project.repository';


export interface CreateProjectUseCase {
  execute( dto : CreateProjectDto) : Promise<ProjectEntity>;

}

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService implements CreateProjectUseCase {

  constructor( private repository : ProjectRepository) { }
  async execute(dto: CreateProjectDto): Promise<ProjectEntity> {
    return this.repository.createProject(dto);
  }

}
