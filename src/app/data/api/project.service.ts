import { Injectable } from '@angular/core';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { CreateProjectDto } from '../../domain/dtos/project/create-project.dto';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { Result } from '../../domain/types/Result.type';
import { UpdateProjectDto } from '../../domain/dtos/project/update-project.dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ProjectRepository {

  // Mock data store
  private mockProjects: ProjectEntity[] = [
    new ProjectEntity(1, 'Project Alpha', '2025-01-01T10:00:00Z', 1),
    new ProjectEntity(2, 'Project Beta', '2025-01-15T14:30:00Z', 2),
    new ProjectEntity(3, 'Project Gamma', '2025-02-01T09:15:00Z', 1),
    new ProjectEntity(4, 'Project Delta', '2025-02-10T16:45:00Z', 3),
  ];

  private nextId = 5; // For generating new IDs

  override async getProjects(): Promise<Result<ProjectEntity[], string>> {
    try {
      // Simulate async operation
      await this.delay(300);
      return { isSuccess: true, value: [...this.mockProjects] };
    } catch (error) {
      return { isSuccess: false, error: 'Failed to fetch projects' };
    }
  }

  override async createProject(projectDto: CreateProjectDto): Promise<Result<ProjectEntity, string>> {
    try {
      // Simulate async operation
      await this.delay(500);

      const newProject = new ProjectEntity(
        this.nextId++,
        projectDto.name,
        new Date().toISOString(),
        1 // Default status
      );

      this.mockProjects.push(newProject);
      return { isSuccess: true, value: newProject };
    } catch (error) {
      return { isSuccess: false, error: 'Failed to create project' };
    }
  }

  override async updateProject(project: UpdateProjectDto): Promise<Result<ProjectEntity, string>> {
    try {
      // Simulate async operation
      await this.delay(400);

      const index = this.mockProjects.findIndex(p => p.id === project.id);
      if (index === -1) {
        return { isSuccess: false, error: 'Project not found' };
      }

      const updatedProject = new ProjectEntity(
        project.id,
        project.name,
        project.created_at,
        project.status
      );

      this.mockProjects[index] = updatedProject;
      return { isSuccess: true, value: updatedProject };
    } catch (error) {
      return { isSuccess: false, error: 'Failed to update project' };
    }
  }

  override async deleteProject(id: number): Promise<Result<ProjectEntity, string>> {
    try {
      // Simulate async operation
      await this.delay(300);

      const index = this.mockProjects.findIndex(p => p.id === id);
      if (index === -1) {
        return { isSuccess: false, error: 'Project not found' };
      }

      const deletedProject = this.mockProjects[index];
      this.mockProjects.splice(index, 1);
      return { isSuccess: true, value: deletedProject };
    } catch (error) {
      return { isSuccess: false, error: 'Failed to delete project' };
    }
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
