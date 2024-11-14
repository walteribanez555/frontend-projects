import { CreateProjectDto } from "../dtos/project/create-project.dto";
import { ProjectEntity } from "../entities/project.entity";
import { Result } from "../types/Result.type";

export abstract class ProjectRepository {

    abstract getProjects(): Promise<Result<ProjectEntity[], string>>;
    abstract createProject(projectDto : CreateProjectDto): Promise<Result<ProjectEntity, string>>;
    abstract updateProject(project: any): Promise<Result<ProjectEntity, string>>;
    abstract deleteProject(id: number): Promise<Result<ProjectEntity, string>>;
}
