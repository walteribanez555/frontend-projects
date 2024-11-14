export abstract class ProjectRepository {

    abstract getProject(): any;
    abstract createProject(project: any): any;
    abstract updateProject(project: any): any;
    abstract deleteProject(id: string): any;
}
