import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-list-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './project-list-detail.component.html',

})
export class ProjectListDetailComponent { }
