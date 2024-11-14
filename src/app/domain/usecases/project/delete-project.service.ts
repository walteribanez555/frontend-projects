import { Injectable } from '@angular/core';
import { ProjectRepository } from '../../repositories/project.repository';
import { Result } from '../../types/Result.type';

export interface DeleteProjectUseCase {
  execute(id: number): Promise<Result<any, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteProjectService implements DeleteProjectUseCase {

  constructor(private repository :ProjectRepository) { }


  async execute(id: number): Promise<Result<any, string>> {

    const result = await this.repository.deleteProject(id);

    if(!result.isSuccess){
      return result;
    }

    return result;
  }

}
