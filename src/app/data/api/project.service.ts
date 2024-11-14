import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { CreateProjectDto } from '../../domain/dtos/project/create-project.dto';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { Result } from '../../domain/types/Result.type';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ProjectRepository {


  private http = inject(HttpClient);

  private url = environment.api_url;



  override getProjects(): Promise<Result<ProjectEntity[], string>> {
    throw new Error('Method not implemented.');
  }
  override createProject(projectDto: CreateProjectDto): Promise<Result<ProjectEntity, string>> {
    throw new Error('Method not implemented.');
  }
  override updateProject(project: any): Promise<Result<ProjectEntity, string>> {
    throw new Error('Method not implemented.');
  }
  override deleteProject(id: number): Promise<Result<ProjectEntity, string>> {
    throw new Error('Method not implemented.');
  }





}
