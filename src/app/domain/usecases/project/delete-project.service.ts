import { Injectable } from '@angular/core';
import { ProjectRepository } from '../../repositories/project.repository';

export interface DeleteProjectUseCase {
  execute(id: number): Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteProjectService implements DeleteProjectUseCase {

  constructor(private repository :ProjectRepository) { }


  async execute(id: number): Promise<any> {
    return this.repository.deleteProject(id);
  }

}
