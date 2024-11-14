import { CreateProjectDto } from "../dtos/project/create-project.dto";
import { ProjectEntity } from "../entities/project.entity";

export abstract class ProjectRepository {

    abstract getProjects(): Promise<ProjectEntity[]>;
    abstract createProject(projectDto : CreateProjectDto): Promise<ProjectEntity>;
    abstract updateProject(project: any): Promise<ProjectEntity>;
    abstract deleteProject(id: number): Promise<any>;
}
