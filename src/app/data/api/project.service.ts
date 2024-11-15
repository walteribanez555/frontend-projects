import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { CreateProjectDto } from '../../domain/dtos/project/create-project.dto';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { Result } from '../../domain/types/Result.type';
import { firstValueFrom, map } from 'rxjs';
import { UpdateProjectDto } from '../../domain/dtos/project/update-project.dto';



export interface ResponseRequest<T> {
  data : T;
  errorMessage : string;
  status : number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ProjectRepository {


  private http = inject(HttpClient);

  private url = environment.api_url;



  override getProjects(): Promise<Result<ProjectEntity[], string>> {
    return firstValueFrom(
      this.http.get<ResponseRequest<ProjectEntity[]>>(this.url).pipe(
        map(response => {
          if(response.status === 200){
            return {isSuccess : true, value : response.data};
          }
          return {isSuccess : false, error : response.errorMessage}
        })
      )
    )
  }
  override createProject(projectDto: CreateProjectDto): Promise<Result<ProjectEntity, string>> {
    return firstValueFrom(
      this.http.post<ResponseRequest<ProjectEntity>>(this.url, projectDto).pipe(
        map(response => {
          if(response.status === 201){
            return {isSuccess : true, value : response.data};
          }
          return {isSuccess : false, error : response.errorMessage}
        })
      )
    )
  }
  override updateProject(project: UpdateProjectDto): Promise<Result<ProjectEntity, string>> {
    return firstValueFrom(
      this.http.put<ResponseRequest<ProjectEntity>>(`${this.url}?id=${project.id}`, project).pipe(
        map(response => {
          if(response.status === 200){
            return {isSuccess : true, value : response.data};
          }
          return {isSuccess : false, error : response.errorMessage}
        })
      )
    )
  }
  override deleteProject(id: number): Promise<Result<ProjectEntity, string>> {
    return firstValueFrom(
      this.http.delete<ResponseRequest<ProjectEntity>>(`${this.url}?id=${id}`).pipe(
        map(response => {
          if(response.status === 200){
            return {isSuccess : true, value : response.data};
          }
          return {isSuccess : false, error : response.errorMessage}
        })
      )
    )
  }





}
