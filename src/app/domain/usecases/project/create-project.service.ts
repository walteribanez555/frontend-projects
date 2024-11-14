import { Injectable } from '@angular/core';
import { CreateProjectDto } from '../../dtos/project/create-project.dto';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectRepository } from '../../repositories/project.repository';
import { Result } from '../../types/Result.type';


export interface CreateProjectUseCase {
  execute( dto : CreateProjectDto) : Promise<Result<ProjectEntity, string>>;

}

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService implements CreateProjectUseCase {

  constructor( private repository : ProjectRepository) { }
  async execute(dto: CreateProjectDto): Promise<Result<ProjectEntity, string>> {

    const result = await this.repository.createProject(dto);

    if(!result.isSuccess){
      return result;
    }

    return result;

  }

}
